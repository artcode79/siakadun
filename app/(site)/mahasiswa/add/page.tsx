// ini adalah halaman add mahasiswa
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage } from '~/libs/firebase'
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
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
	Grid,
	Divider,
	LinearProgress,
} from '@mui/material'

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = {
			nim: Math.floor(Math.random() * 34 + 1000000).toString(16),
			nama,
			alamat,
			desa,
			kecamatan,
			kabupaten,
			provinsi,
			sma,
			no_ijazah,
			no_skhun,
			ktp,
			fakultas_id,
			jurusan_id,
			email,
			no_hp,
			foto,
			foto_ktp,
			foto_akta_kelahiran,
		}

		const docRef = await addDoc(collection(db, 'mahasiswa'), data)

		setSuccess(true)
		setMessage('Data berhasil ditambahkan')

		if (success) {
			setTimeout(() => {
				router.push('/mahasiswa')
			}, 2000)
		} else {
			setError(true)
			setMessage('Data gagal ditambahkan')
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
		setLoading(true)
	}, [])
	// upload foto dan simpan direktori local
	const uploadFoto = async (e: any) => {
		const file = e.target.files[0]
		const storageRef = ref(storage, `mahasiswa/${file.name}`)
		await uploadBytes(storageRef, file)
			.then(() => {
				setFoto(file.name)

				setMessage('Foto berhasil diupload')
			})
			.catch((err: any) => {
				setMessage('Foto gagal diupload')
				setError(true)
			})
	}

	return (
		<>
			<Box>
				<Container maxWidth="xl">
					<Paper sx={{ p: 3 }}>
						<Typography variant="h6" component="h2" gutterBottom>
							Tambah Data Mahasiswa
						</Typography>
						<Divider />
						{success && (
							<Box
								sx={{
									p: 2,
									mt: 2,
									mb: 2,
									backgroundColor: 'green',
									color: 'white',
									fontWeight: 'bold',
									borderRadius: '5px',
								}}
								component="div"
								role="alert"
								aria-live="assertive"
								aria-atomic="true"
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<Typography variant="h6" component="h2" gutterBottom>
									{message}
								</Typography>
							</Box>
						)}
						{error && (
							<Box
								sx={{
									p: 2,
									mt: 2,
									mb: 2,
									backgroundColor: 'red',
									color: 'white',
									fontWeight: 'bold',
									borderRadius: '5px',
									background: '#ff000033',
								}}
								component="div"
								role="alert"
								aria-live="assertive"
								aria-atomic="true"
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<Typography variant="h6" component="h2" gutterBottom>
									{message}
								</Typography>
							</Box>
						)}
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							autoComplete="off"
						>
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
													<LinearProgress
														color="secondary"
														size={100}
														sx={{ mb: 2 }}
													/>
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
								<Divider sx={{ borderColor: '#080808' }} />
								<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
									<FormLabel component="legend">Upload Foto</FormLabel>
									<TextField
										id="foto"
										type="file"
										variant="outlined"
										value={foto}
										onChange={e => [setFoto(e.target.value), uploadFoto]}
										fullWidth
										required
										sx={{ mt: 2 }}
									/>
								</Grid>
								<Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ mt: 2 }}>
									<FormLabel component="legend">
										Upload Foto Akta Kelahiran
									</FormLabel>
									<TextField
										id="foto_akta_kelahiran"
										type="file"
										variant="outlined"
										value={foto_akta_kelahiran}
										onChange={e => setFoto_akta_kelahiran(e.target.value)}
										fullWidth
										required
									/>
								</Grid>
								<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
									<FormLabel component="legend">Upload Foto KTP</FormLabel>
									<TextField
										id="foto_ktp"
										type="file"
										variant="outlined"
										value={foto_ktp}
										onChange={e => setFoto_ktp(e.target.value)}
										fullWidth
										required
										sx={{ mt: 2 }}
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
