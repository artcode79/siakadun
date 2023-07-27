import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../libs/firebase'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'

export interface IFakultas {
	id: string
	nama: string
}

const Fakultas = () => {
	const [fakultas, setFakultas] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getDocs(collection(db, 'fakultas'))
				setFakultas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
			} catch (error: any) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		console.log(fakultas)
		return () => {
			setFakultas([])
		}
	}, [])
	console.log(fakultas)

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					mt: '10px',
				}}
			>
				<Typography variant="h5" component="h2" sx={{ mb: '10px' }}>
					{' '}
					Daftar Fakultas
				</Typography>
				{loading && <p>Loading...</p>}
				{error && <p>{error}</p>}
				{fakultas.map(fakultas => (
					<Card sx={{ width: '400px', mb: '10px' }} key={fakultas.id}>
						<CardContent>
							<Typography variant="h5" component="h2">
								{fakultas.nama}
							</Typography>
							<Typography variant="body2" component="p">
								{fakultas.id}
							</Typography>{' '}
						</CardContent>
					</Card>
				))}{' '}
			</Box>
		</>
	)
}

export default Fakultas
