import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './home.module.css'
import { SlArrowRightCircle } from "react-icons/sl";


export function Home(props: any) {
	const data = useSelector((state: any) => state.USER)
	const [inputData, setInputData] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px'
		}
	}, [inputData])

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputData(e.target.value)
	}

	const renderInput = () => {
		return (
			<div className={styles.inputContainer}>
				<textarea
					ref={textareaRef}
					value={inputData}
					onChange={handleInputChange}
					className={styles.input}
					rows={1}
				/>
				<span className={styles.iconButton}>
					<SlArrowRightCircle style={{fontSize: 26}}/>
				</span>
			</div>
		)
	}

	return (
		<div className={styles.main}>
			<h1>Home</h1>
			<p>Data from parent:</p>
			<div>
				{data.users.map((user: any) => (
					<div key={user.id}>
						Name: {user.name}, Email: {user.email}
					</div>
				))}
			</div>
			{renderInput()}
		</div>
	)
}
