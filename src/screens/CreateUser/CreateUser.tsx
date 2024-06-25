import React, { useState } from 'react'
import styles from './createUser.module.css'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope , FaUser} from 'react-icons/fa'

export interface UserProps {
	username: string
	email: string
	password: string
}

export const initialDefaults: UserProps = {
	username: '',
	email: '',
	password: '',
}

export function CreateUser() {
	const [userData, setUserData] = useState<UserProps>(initialDefaults)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const handleTogglePassword = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Email:', userData.email)
		console.log('Password:', userData.password)
	}

	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<h2 className={styles.heading}>Create An Account</h2>
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							placeholder='Username'
							value={userData.username}
							className={styles.input}
							onChange={(e) =>
								setUserData({
									...userData,
									username: e.target.value,
								})
							}
							required
						/>
						<span className={styles.email}>{<FaUser />}</span>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							placeholder='Email'
							value={userData.email}
							className={styles.input}
							onChange={(e) =>
								setUserData({
									...userData,
									email: e.target.value,
								})
							}
							required
						/>
						<span className={styles.email}>{<FaEnvelope />}</span>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='password'>Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={userData.password}
							className={styles.input}
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
							required
						/>
						<span
							className={styles.eyeIcon}
							onClick={handleTogglePassword}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>
					<button className={styles.button} type='submit'>
						Submit
					</button>
				</form>
				<div className={styles.links}>
					<a href='/'>Back to login</a>
				</div>
			</div>
		</div>
	)
}
