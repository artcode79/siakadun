'use client'
import React, { useState, useEffect } from 'react'
import {
	Box,
	Typography,
	Button,
	Paper,
	Grid,
	LinearProgress,
	CircularProgress,
} from '@mui/material'
import { db, storage } from '../../../../libs/firebase'
import {
	collection,
	getDocs,
	where,
	query,
	documentId,
} from 'firebase/firestore'
import { ref, getDownloadURL, listAll } from 'firebase/storage'

interface Props {
	params: {
		id: string
	}
}
const Edit = ({ params }: Props) => {
	const [data, setData] = useState<any>([])
	const [image, setImage] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(false)

	// fungsi untuk menampilkan gambar
	const showImage = async (img: any) => {
		const imageRef = ref(storage, 'image')
		const listRef = await listAll(imageRef)
		const result = listRef.items.map((item: any) => {
			return getDownloadURL(item)
		})
		setImage(result)
		setLoading(true)
	}

	useEffect(() => {
		// data mahasiswa
		const fetchData = async () => {
			const q = query(
				collection(db, 'mahasiswa'),
				where(documentId(), '==', params.id)
			)
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach(doc => {
				setData(doc.data())
			})
		}
		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	console.log(data)

	return (
		<>
			{/* paper dengan gradasi wwarna */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				<Paper
					sx={{
						width: '80%',
						padding: '20px',
						borderRadius: '10px',
						backgroundColor: '#F5F5F5',
						boxShadow: '0px 0px 10px #000000',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '20px',
						marginTop: '20px',
						marginBottom: '20px',
						overflow: 'hidden',
						position: 'relative',
						zIndex: '1',
						'&:before': {
							content: '""',
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							background:
								'linear-gradient(to right, #F5F5F5, #C77474,#0FA03A, #95C774, #D4E6A4, #DFC5C5,)',
							opacity: '0.5',
							zIndex: '-1',
						},
						'&:after': {
							content: '""',
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							background: '#F5F5F5',
							opacity: '0.5',
							zIndex: '-1',
						},
					}}
					elevation={3}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4" gutterBottom>
								User Details
							</Typography>
						</Grid>

						{loading ? <CircularProgress color="primary" /> : <></>}
						<Grid item xs={12}>
							<Typography variant="h5">{data.nama}</Typography>{' '}
							<Typography variant="h5">{data.nim}</Typography>
							<Typography variant="h5">{data.email}</Typography>
							<Typography variant="h5">{params.id}</Typography>
						</Grid>
						<Grid item xs={12}>
							{data.foto ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={image[0] ? image[0] : data.foto}
									alt="foto"
									style={{ width: '100px', height: '100px' }}
								/>
							) : (
								<img src="https://via.placeholder.com/100" alt="foto" />
							)}
							{data.foto}
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								color="secondary"
								sx={{
									mr: 2,
									borderRadius: '10px',
									boxShadow: '0px 0px 5px #000000',
								}}
								href={`/mahasiswa/edit/${params.id}`}
							>
								Edit
							</Button>
							<Button variant="contained" color="primary" href="/mahasiswa">
								Back
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	)
}

export default Edit
