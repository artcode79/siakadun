'use client'
//menggunakan typescript untuk menghindari error dan menggunakan MUI
import React, { useState, useEffect } from 'react'
import { db } from '~/libs/firebase'
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	query,
	orderBy,
} from 'firebase/firestore'
//import Material UI
import {
	Typography,
	Box,
	Button,
	Container,
	CircularProgressProps,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Alert,
} from '@mui/material'
import { type } from 'os'
import { Delete } from '@mui/icons-material'

const Mahasiswa = () => {
	const [mahasiswa, setMahasiswa] = useState<any[]>([])
	const [jurusan, setJurusan] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	//menggunakan useEffect untuk mengambil data dari firebase
	useEffect(() => {
		//mengambil data dari firebase
		const getData = async () => {
			const q = query(collection(db, 'mahasiswa'), orderBy('nama', 'asc'))
			setLoading(true)
			setError(false)

			const querySnapshot = await getDocs(q)
			const data = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}))

			setLoading(false)
			setMahasiswa(data)
		}
		const getJurusan = async () => {
			const q = query(collection(db, 'jurusan'), orderBy('nama', 'asc'))
			const querySnapshot = await getDocs(q)
			const data = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}))

			setJurusan(data)
		}

		getData()
		getJurusan()
	}, [])

	//menghapus data dari firebase
	const deleteData = async (id: string) => {
		const docRef = doc(db, 'mahasiswa', id)
		await deleteDoc(docRef)
		setMahasiswa(mahasiswa.filter(item => item.id !== id))
		alert('Data berhasil dihapus')
	}

	if (error) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Alert severity="error">terjadi kesalahan saat mengambil data</Alert>
			</Box>
		)
	}
	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress size={100} />
			</Box>
		)
	}

	return (
		<>
			<Container maxWidth="xl">
				<Box sx={{ my: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Halaman Mahasiswa
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button variant="contained" color="success" href="/mahasiswa/add">
							Tambah Data
						</Button>
					</Box>
					<Paper elevation={3} sx={{ p: 2, my: 2 }}>
						<TableContainer>
							<Table sx={{ color: '#fff' }}>
								<TableHead sx={{ fontSize: '0.8rem' }}>
									<TableRow>
										<TableCell>Nama</TableCell>
										<TableCell>NIM</TableCell>
										<TableCell>Jurusan</TableCell>
										<TableCell>*/-</TableCell>
									</TableRow>
								</TableHead>
								<TableBody sx={{ fontSize: '0.8rem' }}>
									{/*menggunakan map untuk mengambil data dari firebase*/}
									{mahasiswa.map(mahasiswa => (
										<TableRow key={mahasiswa.id}>
											<TableCell>{mahasiswa.nama}</TableCell>
											<TableCell>{mahasiswa.nim}</TableCell>
											<TableCell>{mahasiswa.jurusan_id}</TableCell>
											<TableCell>
												<Button
													variant="contained"
													color="error"
													onClick={() => deleteData(mahasiswa.id)}
												>
													<Delete />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Box>
			</Container>
		</>
	)
}

export default Mahasiswa
