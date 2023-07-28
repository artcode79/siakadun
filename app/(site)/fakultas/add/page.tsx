'use client'
{
	/* ini adALAH inputan data Fakultas dengan MUI*/
}
import React, { useState } from 'react'
import { db } from '../../../../libs/firebase'
import { collection, addDoc } from 'firebase/firestore'
import {
	TextField,
	Button,
	Box,
	Paper,
	Container,
	Typography,
	Alert,
} from '@mui/material'
import * as yup from 'yup'

const schema = yup.object({
	nama: yup.string().required('Nama Fakultas Tidak Boleh Kosong'),
	keterangan: yup.string().optional(),
})

const Add = () => {
	const [nama, setNama] = useState('')
	const [keterangan, setKeterangan] = useState('')
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const data = {
			nama,
			keterangan,
		}
		try {
			const aba = await schema.validate(data)
			const docRef = await addDoc(collection(db, 'fakultas'), aba)
			setNama('')
			setKeterangan('')
			setError(false)
			setMessage('Data Berhasil Ditambahkan' + ' ' + docRef.id)
		} catch (error: any) {
			setError(true)
			setMessage(error.message)
		}
	}

	return (
		<Container>
			<Paper
				sx={{
					padding: '20px',
					width: '50%',
					margin: '0 auto',
					mt: 5,
					boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
					bgcolor: 'background.paper',
					borderRadius: '5px',
					p: 4,
				}}
			>
				<Typography variant="h5" component="div" align="center" gutterBottom>
					Tambah Data Fakultas
				</Typography>
				{message && (
					<Alert severity="success" sx={{ mt: 2 }}>
						{message}
					</Alert>
				)}
				<Box
					component="form"
					sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}
					onSubmit={handleSubmit}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="Nama Fakultas"
						sx={{ mb: 2 }}
						variant="filled"
						size="small"
						value={nama}
						onChange={e => setNama(e.target.value)}
					/>
					<TextField
						size="small"
						id="outlined-basic"
						label="Keterangan"
						variant="filled"
						value={keterangan}
						onChange={e => setKeterangan(e.target.value)}
					/>

					{error && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{message}
						</Alert>
					)}
					<Button
						variant="contained"
						type="submit"
						sx={{ mt: 3, mb: 2 }}
						size="small"
					>
						Submit
					</Button>
					<Button
						color="error"
						variant="contained"
						size="small"
						href="/fakultas"
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}

export default Add
