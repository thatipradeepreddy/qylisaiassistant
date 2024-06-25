import React, { useState } from 'react'
import styles from './forgotPassword.module.css'
import { FaEnvelope } from 'react-icons/fa'

export function ForgotPassword() {
	const [email, setEmail] = useState<string>('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Email for password reset:', email)
		// Add your password reset logic here (e.g., sending reset email)
		// You can handle success/error states or show a message to the user
	}

	return (
		<div className={styles.container}>
			<div className={styles.forgotPasswordBox}>
				<h2 className={styles.heading}>Forgot Your Password?</h2>
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='email'>Enter your email address:</label>
						<div className={styles.emailInputGroup}>
							<input
								type='email'
								placeholder='Email'
								value={email}
								className={styles.input}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<span className={styles.email}>
								{<FaEnvelope />}
							</span>
							<button type='submit' className={styles.button}>
								<FaEnvelope /> Send Reset Email
							</button>
						</div>
					</div>
				</form>
				<div className={styles.backToLogin}>
					<a href='/'>Back to Login</a>
				</div>
			</div>
		</div>
	)
}
