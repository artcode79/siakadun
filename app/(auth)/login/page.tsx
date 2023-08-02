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
} from '@mui/material'
import { auth } from '~/libs/firebase'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [Loading, setLoading] = useState(false)
	const router = useRouter()

	const log = async (e: any) => {
		e.preventDefault()
		console.log(email, password)
		await signInWithEmailAndPassword(auth, email, password).then(() => {
			setLoading(false)

			router.push('/dashboard')
		})
	}

	return (
		<>
			<Container maxWidth="sm">
				<Paper elevation={3} sx={{ p: 5, mt: 5 }}>
					{Loading ? 'Loading...' : null}
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
					</Box>
				</Paper>
			</Container>
		</>
	)
}

export default Login
