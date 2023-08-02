'use client'
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '~/libs/firebase'

const Register = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setPassword('')
			setConfirmPassword('')
			return setError('Passwords do not match')
		}
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			console.log(user)
		} catch (err: any) {
			console.log(err)
			setError(err.message)
		}
	}

	useEffect(() => {
		setError('')
	}, [email, password, confirmPassword])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<form className="w-1/3" onSubmit={handleSubmit}>
				<input
					type="email"
					className="border-2 border-gray-300 p-2 rounded-lg"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="border-2 border-gray-300 p-2 rounded-lg"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<input
					type="password"
					className="border-2 border-gray-300 p-2 rounded-lg"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<button type="submit" disabled={!email || !password}>
					Register
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	)
}

export default Register
