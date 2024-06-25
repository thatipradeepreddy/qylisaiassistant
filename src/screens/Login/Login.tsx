import React, { useState } from 'react'
import styles from './login.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export function Login() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const navigation = useNavigate()

	const handleTogglePassword = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Email:', email)
		console.log('Password:', password)
	}

	const handleLogin = () => {
		navigation('/initial-screen')
	}

	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<h2 className={styles.heading}>Login to Qylis Services</h2>
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							placeholder='Email'
							value={email}
							className={styles.input}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='password'>Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={password}
							className={styles.input}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<span
							className={styles.eyeIcon}
							onClick={handleTogglePassword}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>
					<button
						className={styles.button}
						type='submit'
						onClick={handleLogin}
					>
						Login
					</button>
				</form>
				<div className={styles.links}>
					<a href='/forgot-password'>Forgot password?</a>
					<a href='/create-account'>Create an account</a>
				</div>
			</div>
		</div>
	)
}
