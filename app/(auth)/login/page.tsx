'use client'
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import {
	Box,
	Button,
	Container,
	Grid,
	Typography,
	TextField,
	Paper,
	Alert,
} from '@mui/material'
import { auth } from '~/libs/firebase'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [Loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	const log = async (e: any) => {
		e.preventDefault()
		console.log(email, password)
		await signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setLoading(true)
				router.push('/dashboard')
			})
			.catch(err => {
				setLoading(false)
				setError(err.message)
			})
	}

	return (
		<>
			<Container maxWidth="sm">
				<Paper elevation={3} sx={{ p: 5, mt: 5 }}>
					{Loading ? 'Loading...' : null}

					{error ? (
						<Alert severity="error" sx={{ mb: 2 }}>
							<Typography variant="h6" color="error">
								{error}
							</Typography>
						</Alert>
					) : null}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box component="form" onSubmit={log} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Login
							</Button>
						</Box>
						<Grid container>
							<Grid item xs>
								<Typography component="div" gutterBottom>
									Belum punya akun?
									<Button
										onClick={() => router.push('/register')}
										variant="text"
										size="small"
									>
										{' '}
										Daftar
									</Button>
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Container>
		</>
	)
}

export default Login
