// ini adalah halaman add mahasiswa
'use client'
import React, { useState, useEffect } from 'react'
import { db } from '~/libs/firebase'
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore'
import {
	Button,
	Box,
	TextField,
	Typography,
	Container,
	Paper,
	InputAdornment,
	IconButton,
	FormHelperText,
	FormLabel,
	FormControl,
	InputLabel,
	OutlinedInput,
	Select,
	MenuItem,
} from '@mui/material'

const Add = () => {
	const [nim, setNim] = useState('')
	const [nama, setNama] = useState('')
	const [alamat, setAlamat] = useState('')
	const [desa, setDesa] = useState('')
	const [kecamaset, setKecamatan] = useState('')
	const [kabupaten, setKabupaten] = useState('')
	const [provinsi, setProvinsi] = useState('')
	const [sma, setSma] = useState('')
	const [no_ijazah, setNo_ijazah] = useState('')
	const [no_skhun, setNo_skhun] = useState('')
	const [no_sertifikat, setNo_sertifikat] = useState('')
	const [akta_kelahiran, setAkta_kelahiran] = useState('')
	const [ktp, setKtp] = useState('')
	const [fakultas_id, setFakultas_id] = useState('')

	const [fakultas, setFakultas] = useState<any[]>([])

	const [jurusan_id, setJurusan_id] = useState('')
	const [email, setEmail] = useState('')
	const [no_hp, setNo_hp] = useState('')
	const [foto, setFoto] = useState('')
	const [foto_ktp, setFoto_ktp] = useState('')
	const [foto_akta_kelahiran, setFoto_akta_kelahiran] = useState('')
	const [mahasiswa_id, setMahasiswa_id] = useState('')
	const [error, setError] = useState(false)
	const [jurusans, setJurusans] = useState<any[]>([])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const docRef = await addDoc(collection(db, 'mahasiswa'), {
			nim: '21' + Math.random() + 10000,
			nama: nama,
			alamat: alamat,
			jurusan: jurusans,

			email: email,
			no_hp: no_hp,
		})

		await setDoc(doc(db, 'mahasiswa', docRef.id), {
			nama: nama,
			alamat: alamat,
			jurusan: jurusans,
			email: email,
			no_hp: no_hp,
		})
		window.location.replace('/mahasiswa')
	}

	useEffect(() => {}, [])

	return (
		<>
			<Box>
				<Container maxWidth="sm">
					<Paper sx={{ p: 3 }}>
						<Typography variant="h5" component="h2" gutterBottom>
							Tambah Data Mahasiswa
						</Typography>
						<form onSubmit={handleSubmit} autoComplete="off">
							<TextField
								id="nama"
								label="Nama"
								value={nama}
								onChange={e => setNama(e.target.value)}
								variant="outlined"
								fullWidth
								required
								sx={{ mb: 2 }}
							/>

							<TextField
								id="alamat"
								label="Alamat"
								variant="outlined"
								value={alamat}
								onChange={e => setAlamat(e.target.value)}
								fullWidth
								required
								sx={{ mb: 2 }}
							/>

							<TextField
								id="email"
								label="Email"
								variant="outlined"
								value={email}
								onChange={e => setEmail(e.target.value)}
								fullWidth
								required
								sx={{ mb: 2 }}
								type="email"
							/>

							<TextField
								id="no_hp"
								label="No HP"
								variant="outlined"
								value={no_hp}
								onChange={e => setNo_hp(e.target.value)}
								fullWidth
								required
								sx={{ mb: 2 }}
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+62 </InputAdornment>
									),
								}}
							/>
							<FormControl fullWidth sx={{ mb: 2 }}>
								<InputLabel id="demo-simple-select-label">Fakultas</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={fakultas_id}
									label="Fakultas"
									onChange={e => setFakultas_id(e.target.value)}
								>
									{fakultas.map((fakultas, index) => (
										<MenuItem key={index} value={fakultas.id}>
											{fakultas.nama}
											{/* <FormHelperText>Some important helper text</FormHelperText> */}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Button type="submit" variant="contained" fullWidth>
								Submit
							</Button>
						</form>
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default Add
