// ini adalah halaman add mahasiswa
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage } from '~/libs/firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
	Button,
	Box,
	TextField,
	Typography,
	Container,
	Paper,
	InputAdornment,
	FormHelperText,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Divider,
	LinearProgress,
	Alert,
} from '@mui/material'
import * as yup from 'yup'

const Add = () => {
	const [nim, setNim] = useState('')
	const [nama, setNama] = useState('')
	const [alamat, setAlamat] = useState('')
	const [desa, setDesa] = useState('')
	const [kecamatan, setKecamatan] = useState('')
	const [kabupaten, setKabupaten] = useState('')
	const [provinsi, setProvinsi] = useState('')
	const [sma, setSma] = useState('')
	const [no_ijazah, setNo_ijazah] = useState('')
	const [no_skhun, setNo_skhun] = useState('')
	const [kk, setKk] = useState('')
	const [ktp, setKtp] = useState('')
	const [fakultas_id, setFakultas_id] = useState('')
	const [fakultas, setFakultas] = useState<any[]>([])
	const [jurusan_id, setJurusan_id] = useState('')
	const [email, setEmail] = useState('')
	const [no_hp, setNo_hp] = useState('')
	const [foto, setFoto] = useState('')
	const [foto_ktp, setFoto_ktp] = useState('')
	const [foto_akta_kelahiran, setFoto_akta_kelahiran] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [success, setSuccess] = useState(false)
	const [jurusan, setJurusan] = useState<any[]>([])
	const router = useRouter()
	const [file, setFile] = useState<any>(null)
	const [file_ktp, setFile_ktp] = useState<any>(null)
	const [file_akta_kelahiran, setFile_akta_kelahiran] = useState<any>(null)

	const schema = yup.object({
		nim: yup.string().required('NIM harus diisi'),
		nama: yup.string().required('Nama harus diisi'),
		alamat: yup.string().required('Alamat harus diisi'),
		desa: yup.string().required('Desa harus diisi'),
		kecamatan: yup.string().required('Kecamatan harus diisi'),
		kabupaten: yup.string().required('Kabupaten harus diisi'),
		provinsi: yup.string().required('Provinsi harus diisi'),
		sma: yup.string().required('SMA harus diisi'),
		no_ijazah: yup.string().required('No Ijazah harus diisi'),
		no_skhun: yup.string().required('No SKHUN harus diisi'),
		kk: yup.string().required('Kartu Keluarga harus diisi'),
		ktp: yup.string(),
		email: yup
			.string()
			.email('Email tidak valid')
			.required('Email harus diisi'),
		no_hp: yup.string().required('No HP harus diisi'),
		//  ini adalah kondisi jika foto tidak diisi, jpg jpeg png
		foto: yup
			.string()
			.matches(
				/^.+\.(jpg|jpeg|png)$/i,
				'File harus berupa gambar (jpg, jpeg, png,	tidak boleh lebih dari 5MB)'
			)
			.max(
				5000000,
				'File harus berupa gambar (jpg, jpeg, png,	tidak boleh lebih dari 5MB)'
			),
		foto_ktp: yup
			.string()
			.matches(
				/^.+\.(jpg|jpeg|png|pdf|)$/i,
				'File harus berupa gambar (jpg, jpeg, png,	tidak boleh lebih dari 5MB)'
			)
			.max(5000000),

		foto_akta_kelahiran: yup.string().matches(/^.+\.(jpg|jpeg|png|pdf|)$/i),
	}) // ini adalah validasi inputan

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		try {
		
			setError(false)
			setLoading(true)
			const storageRef = ref(storage, `foto/${foto}`)
			const storageRef_ktp = ref(storage, `foto//${foto_ktp}`)
			const storageRef_akta_kelahiran = ref(
				storage,
				`foto/akte/${foto_akta_kelahiran}`
			)
			await uploadBytes(storageRef, file)
			await uploadBytes(storageRef_akta_kelahiran, file_akta_kelahiran)
			await uploadBytes(storageRef_ktp, file_ktp)
		 
			const data ={
				 
			}

			     
			
		

		}
	}

	useEffect(() => {
		const fetchFakultas = async () => {
			const data = await getDocs(collection(db, 'fakultas'))
			const dataFakultas: any[] = []
			data.forEach((doc: any) => {
				dataFakultas.push({
					id: doc.id,
					...doc.data(),
					nama: doc.data().nama,
				})
			})
			setFakultas(dataFakultas)
			setFakultas_id(dataFakultas[0].nama as any)
		}
		fetchFakultas()

		const fetchJurusan = async () => {
			const q = query(collection(db, 'jurusan'))
			const data = await getDocs(q)
			const dataJurusan: any[] = []
			data.forEach((doc: any) => {
				dataJurusan.push({
					id: doc.id,
					...doc.data(),
					nama: doc.data().nama,
				})
			})
			setJurusan(dataJurusan)

			setJurusan_id(dataJurusan[0].nama as any)
		}

		fetchJurusan()
		setLoading(false)
	}, [])

	return (
		<>
			<Box>
				<Container maxWidth="xl">
					<Paper sx={{ p: 3 }}>
						<Typography variant="h6" component="h2" gutterBottom>
							Tambah Data Mahasiswa
						</Typography>
						<Divider />
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							autoComplete="off"
						>
							{loading ? (
								<LinearProgress color="secondary" />
							) : (
								<>
									{error ? (
										<Alert
											sx={{
												mb: 2,
												bgcolor: '#FF3737',
												color: '#FFFFFF',
												borderRadius: '5px',
												boxShadow: '0px 0px 10px #ff0000',
												transition: 'all 0.5s ease-in-out',
											}}
											severity="error"
										>
											{message}
										</Alert>
									) : (
										<>
											{success ? (
												<Alert severity="success" sx={{ mb: 2 }}>
													{message}
												</Alert>
											) : (
												<></>
											)}
										</>
									)}
								</>
							)}
							<Grid container spacing={4}>
								<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
										id="desa"
										label="Desa"
										variant="outlined"
										value={desa}
										onChange={e => setDesa(e.target.value)}
										fullWidth
										required
										sx={{ mb: 2 }}
									/>
									<TextField
										id="kecamatan"
										label="Kecamatan"
										variant="outlined"
										value={kecamatan}
										onChange={e => setKecamatan(e.target.value)}
										fullWidth
										required
										sx={{ mb: 2 }}
									/>
									<TextField
										id="kabupaten"
										label="Kabupaten"
										variant="outlined"
										value={kabupaten}
										onChange={e => setKabupaten(e.target.value)}
										fullWidth
										required
										sx={{ mb: 2 }}
									/>
									<TextField
										id="provinsi"
										label="Provinsi"
										variant="outlined"
										value={provinsi}
										onChange={e => setProvinsi(e.target.value)}
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
								</Grid>
								<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
									<FormControl fullWidth sx={{ mb: 2 }}>
										<InputLabel id="demo-simple-select-label">
											Fakultas
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={fakultas_id}
											label="Fakultas"
											onChange={e => setFakultas_id(e.target.value)}
										>
											{loading ? (
												<>
													<LinearProgress color="secondary" sx={{ mb: 2 }} />
												</>
											) : (
												<></>
											)}
											{fakultas.map((fakultas, index) => (
												<MenuItem
													key={index}
													value={fakultas.nama}
													sx={{ mb: 2, textTransform: 'uppercase' }}
												>
													{fakultas.nama}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<FormControl fullWidth sx={{ mb: 2 }}>
										<InputLabel id="demo-simple-select-label">
											Jurusan
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={jurusan_id}
											label="Jurusan"
											onChange={e => setJurusan_id(e.target.value)}
										>
											{jurusan.map((jurusan, index) => (
												<MenuItem
													key={index}
													value={jurusan.nama}
													sx={{ mb: 2, textTransform: 'uppercase' }}
												>
													{jurusan.nama}
													<FormHelperText sx={{ ml: 1 }}>
														{jurusan.fakultas.nama}
													</FormHelperText>
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<TextField
										id="sma"
										label="SMA"
										variant="outlined"
										size="small"
										value={sma}
										onChange={e => setSma(e.target.value)}
										fullWidth
										required
									/>

									<TextField
										id="no_ijazah"
										label="No Ijazah"
										variant="outlined"
										value={no_ijazah}
										onChange={e => setNo_ijazah(e.target.value)}
										fullWidth
										required
										sx={{ mt: 2, mb: 2 }}
										size="small"
									/>
									<TextField
										label="No SKHUN"
										variant="outlined"
										value={no_skhun}
										onChange={e => setNo_skhun(e.target.value)}
										id="no_skhun"
										name="no_skhun"
										size="small"
										sx={{ mb: 2 }}
										fullWidth
									/>
									<TextField
										label="No KTP"
										variant="outlined"
										value={ktp}
										onChange={e => setKtp(e.target.value)}
										id="no_ktp"
										name="no_ktp"
										size="small"
										sx={{ mb: 2 }}
										fullWidth
										required
									/>
									<TextField
										label="No KK"
										variant="outlined"
										value={kk}
										onChange={e => setKk(e.target.value)}
										id="no_kk"
										name="no_kk"
										size="small"
										sx={{ mb: 2 }}
										fullWidth
										required
									/>
								</Grid>

								<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
									<TextField
										value={file}
										onChange={(e: any) => setFile(e.target.value)}
										variant="outlined"
										fullWidth
										id="foto"
										label="Upload Foto"
										name="foto"
										type="file"
										required
										sx={{ mb: 2 }}
									/>

									<TextField
										value={file_akta_kelahiran}
										onChange={(e: any) =>
											setFile_akta_kelahiran(e.target.value)
										}
										variant="outlined"
										fullWidth
										id="foto"
										label="Upload Akta Kelahiran"
										name="foto"
										type="file"
										required
										sx={{ mb: 2 }}
									/>
								</Grid>
								<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
									<TextField
										value={file_ktp}
										onChange={(e: any) => setFile_ktp(e.target.value)}
										variant="outlined"
										name="foto"
										type="file"
										fullWidth
										id="foto"
										label="Upload Foto KTP"
									/>
								</Grid>
							</Grid>

							<Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
								<Button type="submit" variant="contained">
									Submit
								</Button>
								<Button
									variant="contained"
									color="error"
									onClick={() => router.push('/mahasiswa')}
									size="small"
									sx={{ ml: 2 }}
								>
									Cancle
								</Button>
							</Box>
						</Box>
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default Add
