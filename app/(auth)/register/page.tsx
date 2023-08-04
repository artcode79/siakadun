'use client'
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Box, Button, TextField, Paper, Typography, Alert } from '@mui/material'
import { auth } from '~/libs/firebase'

const Register = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')
	const router = useRouter()

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
			setMessage('Akun berhasil dibuat, silahkan login')
			router.push('/login')
		} catch (err: any) {
			console.log(err)
			setError('Akun dengan email tersebut sudah terdaftar')
		}
	}

	useEffect(() => {
		setError('')
	}, [email, password, confirmPassword])

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
				<Paper sx={{ p: 5 }}>
					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							<Typography
								variant="body2"
								color="error"
								align="center"
								gutterBottom
							>
								{error}
							</Typography>
						</Alert>
					)}
					{message && (
						<Alert severity="success" sx={{ mb: 2 }}>
							<Typography
								variant="body2"
								color="success"
								align="center"
								gutterBottom
							>
								{message}
							</Typography>
						</Alert>
					)}
					<Typography variant="h4" component="h1" align="center" gutterBottom>
						Register
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{ width: '100%', my: 4 }}
					>
						<TextField
							type="email"
							label="Email"
							value={email}
							sx={{ mb: 2 }}
							onChange={e => setEmail(e.target.value)}
							fullWidth
							size="small"
							required
						/>
						<TextField
							type="password"
							label="Password"
							value={password}
							sx={{ mb: 2 }}
							onChange={e => setPassword(e.target.value)}
							fullWidth
							size="small"
							required
						/>
						<TextField
							type="password"
							label="Confirm Password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							fullWidth
							sx={{ mb: 2 }}
							size="small"
							required
						/>
						<Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
							Register
						</Button>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography variant="body2" color="text.secondary" gutterBottom>
							Already have an account?
							<Button
								variant="text"
								onClick={() => router.push('/login')}
								sx={{
									mr: 1,
									'&:hover': {
										backgroundColor: 'transparent',
										color: '#f44336',
									},
								}}
							>
								Login
							</Button>
						</Typography>
					</Box>
				</Paper>
			</Box>
		</>
	)
}

export default Register
