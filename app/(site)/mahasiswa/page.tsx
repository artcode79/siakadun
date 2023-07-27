'use client'
//menggunakan typescript untuk menghindari error dan menggunakan MUI
import React, { useState, useEffect } from 'react'
import { db } from '~/libs/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
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
} from '@mui/material'
import { type } from 'os'

const Mahasiswa = () => {
	const [mahasiswa, setMahasiswa] = useState<any[]>([])
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
		getData()
	}, [])

	if (error) {
		return <div>Error</div>
	}
	if (loading) {
		return <CircularProgress size={100} />
	}

	return (
		<>
			<Container maxWidth="xl">
				<Box sx={{ my: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Halaman Mahasiswa
					</Typography>
					<Paper elevation={3} sx={{ p: 2, my: 2 }}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nama</TableCell>
										<TableCell>NIM</TableCell>
										<TableCell>Jurusan</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{mahasiswa.map((item, index) => {
										return (
											<TableRow key={index}>
												<TableCell>{item.nama}</TableCell>
												<TableCell>{item.nim}</TableCell>
												<TableCell>{item.jurusan}</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Box>

				<Button variant="contained" color="primary" href="/mahasiswa/add">
					Halaman Mahasiswa
				</Button>
			</Container>
		</>
	)
}

export default Mahasiswa
