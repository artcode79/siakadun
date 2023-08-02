import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../libs/firebase'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<any>(null)
	const router = useRouter()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
				router.push('/login')
			}
		})
	}, [router])

	return (
		<>
			{!user && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<CircularProgress size={100} thickness={5} />
				</Box>
			)}
			{children}
		</>
	)
}

export default AuthProvider
