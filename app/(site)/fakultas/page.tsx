'use client'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../libs/firebase'
import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Grid,
	LinearProgress,
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
				setFakultas(
					data.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
						nama: doc.data().nama.toUpperCase(),
						keterangan: doc.data().keterangan.toUpperCase(),
					}))
				)
			} catch (error: any) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		fetchData()

		return () => {
			setFakultas([])
		}
	}, [])
	console.log(fakultas)
	const deleteFakultas = async (id: string) => {
		try {
			await deleteDoc(doc(db, 'fakultas', id))
			setLoading(true)
			setError(null)
			window.location.reload()
		} catch (error: any) {
			setError(error.message)
		}
	}

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
					Daftar Fakultas
				</Typography>
				<Button
					variant="contained"
					color="success"
					size="small"
					href="/fakultas/add"
				>
					ADD
				</Button>

				{!loading && fakultas.length === 0 && (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress color="success" sx={{ mt: 6 }} size={100} />
					</Box>
				)}
				{error && (
					<Alert severity="error" sx={{ mt: 6 }}>
						{error}
					</Alert>
				)}
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					sx={{ mt: 4 }}
				>
					{fakultas.map(fakultas => (
						<Grid item xs={6} md={4} lg={4} xl={3}>
							<Card sx={{ width: '400px', mb: '10px' }} key={fakultas.id}>
								<CardContent sx={{ height: '100px' }}>
									<Typography variant="h5" component="h2">
										{fakultas.nama}
									</Typography>
									<Typography variant="body2" component="p">
										{fakultas.keterangan}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										variant="contained"
										color="error"
										sx={{ mr: '10px' }}
										onClick={() => deleteFakultas(fakultas.id)}
									>
										Hapus data
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}

export default Fakultas
