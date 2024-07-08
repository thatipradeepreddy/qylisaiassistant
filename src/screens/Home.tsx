import React, { useState, useRef, useEffect } from 'react'
import { SlArrowRightCircle, SlPencil } from 'react-icons/sl'
import styles from './home.module.css'

interface Response {
	trigger: string
	response: string
}

interface BotData {
	name: string
	responses: Response[]
}

interface Data {
	bot: BotData
}

type MessageType = 'user' | 'bot'

interface Message {
	type: MessageType
	text: string
	id: number
}

export function Home() {
	const [inputData, setInputData] = useState<string>('')
	const [messages, setMessages] = useState<Message[]>([])
	const [editingMessageId, setEditingMessageId] = useState<number | null>(
		null
	)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px'
		}
	}, [inputData])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputData(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSend()
		}
	}

	const handleSend = async () => {
		if (inputData.trim() === '') return

		const newMessage: Message = {
			type: 'user',
			text: inputData,
			id: Date.now(),
		}

		setMessages((prevMessages) => [...prevMessages, newMessage])

		if (editingMessageId !== null) {
			const updatedMessages = messages.map((msg) =>
				msg.id === editingMessageId ? { ...msg, text: inputData } : msg
			)
			setMessages(updatedMessages)
			setEditingMessageId(null)
		} else {
			try {
				const response = await fetch(
					'http://192.168.68.68:5000/mistral',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							system_message: 'You are a helpful assistant',
							user_message: inputData,
							max_tokens: 1000,
						}),
					}
				)

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}

				const data = await response.json()
				console.log('Response data:', data)

				const rawBotResponse =
					data.choices && data.choices.length > 0
						? data.choices[0].text
						: "Sorry, I don't understand that."

				const cleanedBotResponse = rawBotResponse
					.replace(/\[INST\][^]*?\[\/INST\]/g, '') // Remove [INST] tags and their content
					.replace(/^\s*[\[\]>].*$/gm, '') // Remove any remaining system message and user message lines
					.replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
					.trim()

				const botMessage: Message = {
					type: 'bot',
					text: cleanedBotResponse,
					id: Date.now() + 1,
				}

				setMessages((prevMessages) => [...prevMessages, botMessage])
			} catch (error) {
				console.error('Error fetching bot response:', error)
				const botMessage: Message = {
					type: 'bot',
					text: "Sorry, I don't understand that.",
					id: Date.now() + 1,
				}
				setMessages((prevMessages) => [...prevMessages, botMessage])
			}
		}

		setInputData('')
	}

	const handleEdit = (id: number) => {
		const messageToEdit = messages.find((msg) => msg.id === id)
		if (messageToEdit) {
			setInputData(messageToEdit.text)
			setEditingMessageId(id)
		}
	}

	const handleCancelEdit = () => {
		setInputData('')
		setEditingMessageId(null)
	}

	const renderMessages = () => {
		return messages.map((msg) => (
			<div
				key={msg.id}
				className={
					msg.type === 'user' ? styles.userMessage : styles.botMessage
				}
			>
				{msg.text}
				{msg.type === 'user' && (
					<span
						className={styles.editIcon}
						onClick={() => handleEdit(msg.id)}
						style={{
							display:
								editingMessageId !== msg.id ? 'inline' : 'none',
						}}
					>
						<SlPencil
							style={{
								fontSize: 17,
								color: '#007bff',
								marginBottom: -3.5,
							}}
						/>
					</span>
				)}
			</div>
		))
	}

	const renderInput = () => {
		return (
			<div className={styles.inputContainer}>
				<textarea
					ref={textareaRef}
					value={inputData}
					onKeyDown={handleKeyDown}
					onChange={handleInputChange}
					className={styles.input}
					rows={1}
				/>
				{editingMessageId !== null ? (
					<div className={styles.editActions}>
						<button
							className={styles.cancelButton}
							onClick={handleCancelEdit}
						>
							Cancel
						</button>
						<button
							className={styles.sendButton}
							onClick={handleSend}
						>
							Save
						</button>
					</div>
				) : (
					<span className={styles.iconButton} onClick={handleSend}>
						<SlArrowRightCircle style={{ fontSize: 26 }} />
					</span>
				)}
			</div>
		)
	}

	return (
		<div className={styles.main}>
			<h1>Qylis AI Assistant</h1>
			<div className={styles.messagesWrapper}>
				<div className={styles.messagesContainer}>
					{renderMessages()}
					<div ref={messagesEndRef} />
				</div>
			</div>
			{renderInput()}
		</div>
	)
}
