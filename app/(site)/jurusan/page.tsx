'use client'
{
	/*menggunakan firestore dan mui*/
}
import React from 'react'
import { db } from '~/libs/firebase'
import {
	collection,
	addDoc,
	getDocs,
	query,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore'
import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Paper,
	Button,
	TextField,
	InputAdornment,
	IconButton,
	Divider,
	Card,
	CircularProgress,
} from '@mui/material'
import {
	CheckCircleOutline,
	CloseRounded,
	DeleteOutline,
	Edit,
	ErrorOutline,
	CloseSharp,
} from '@mui/icons-material'

const Jurusan = () => {
	const [jurusan, setJurusan] = React.useState('')
	const [jurusanList, setJurusanList] = React.useState([])
	const [jurusanId, setJurusanId] = React.useState('')
	const [jurusanName, setJurusanName] = React.useState('')
	const [jurusanEdit, setJurusanEdit] = React.useState(false)
	const [jurusanDelete, setJurusanDelete] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [fakultasId, setFakultasId] = React.useState('')
	const [fakultasList, setFakultasList] = React.useState([])

	/*menampilkan data*/
	React.useEffect(() => {
		const getData = async () => {
			const fakultasCollection = collection(db, 'fakultas')
			const data = await getDocs(fakultasCollection)
			const dataArray = data.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
				nama: doc.data().nama,
			}))
			setFakultasId(dataArray[0].nama)
			setFakultasList(dataArray as any)
		}

		const fetchData = async () => {
			const jurusanCollection = collection(db, 'jurusan')
			const data = await getDocs(jurusanCollection)
			const dataArray = data.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}))
			setJurusanList(dataArray as any)
			setLoading(false)
			console.log(dataArray)
		}
		fetchData()
		getData()
		setLoading(true)
	}, [])

	/*menambahkan data jurusan*/
	const addJurusan = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccess(false)
		setMessage('')
		if (jurusan === '') {
			setError(true)
			setMessage('Jurusan tidak boleh kosong')
			setLoading(false)
			return
		}
		const jurusanCollection = collection(db, 'jurusan')
		await addDoc(jurusanCollection, {
			nama: jurusan,
			fakultasId: [doc(db, 'fakultas', fakultasId)],
			fakultas: {
				nama: fakultasId,
			},
		})
		setJurusan('')
		setSuccess(true)
		setMessage('Data berhasil ditambahkan')
		setLoading(false)
		window.location.reload()
	}
	/*mengubah data jurusan*/
	const editJurusan = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccess(false)
		setMessage('')
		if (jurusanName === '') {
			setError(true)
			setMessage('Jurusan tidak boleh kosong')
			setLoading(false)
			return
		}
		const jurusanCollection = collection(db, 'jurusan')
		const jurusanRef = doc(jurusanCollection, jurusanId)
		await updateDoc(jurusanRef, {
			nama: jurusanName,
			fakultasId: [doc(db, 'fakultas', fakultasId)],
			fakultas: { nama: fakultasId },
		})
		setJurusanName('')
		setJurusanEdit(false)
		setSuccess(true)
		setMessage('Data berhasil diubah')
		setLoading(false)
		window.location.reload()
	}

	/*menghapus data jurusan*/
	const deleteJurusan = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccess(false)
		setMessage('')
		const jurusanCollection = collection(db, 'jurusan')
		const jurusanRef = doc(jurusanCollection, jurusanId)
		await deleteDoc(jurusanRef)
		setJurusanDelete(false)
		setSuccess(true)
		setMessage('Data berhasil dihapus')
		setLoading(false)
		window.location.reload()
	}

	return (
		<Box>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Jurusan
			</Typography>
			<Paper
				sx={{
					p: 3,
					mb: 3,
					borderRadius: 2,
					backgroundColor: '#fff',
					boxShadow: '0px 0px 10px #ccc',
				}}
			>
				<form onSubmit={jurusanEdit ? editJurusan : addJurusan}>
					<TextField
						label="Jurusan"
						value={jurusan}
						onChange={e => setJurusan(e.target.value)}
						fullWidth
						required
						error={error}
						helperText={error && message}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton type="submit" disabled={loading}>
										<Edit />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<FormControl fullWidth sx={{ mt: 3 }}>
						<InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>
							Fakultas
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={fakultasId}
							label="Fakultas"
							onChange={e => setFakultasId(e.target.value)}
						>
							{fakultasId &&
								fakultasList.map((item: any) => (
									<MenuItem
										key={item.id}
										sx={{
											textEmphasisStyle: 'none',
											textDecoration: 'none',
											textTransform: 'capitalize',
											color: '#000',
										}}
										value={item.nama}
									>
										{item.nama}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<Button
						variant="contained"
						color="success"
						sx={{ mt: 3 }}
						type="submit"
					>
						{jurusanEdit ? 'Ubah' : 'Tambah'}
					</Button>
				</form>
				<Divider sx={{ my: 3 }} />

				<Typography variant="h5">Daftar Jurusan</Typography>
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress
							sx={{
								mt: 3,
							}}
							size={100}
						/>
					</Box>
				) : (
					<></>
				)}
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={0}>
						{fakultasId &&
							jurusanList.map((item: any) => (
								<Box key={item.id} sx={{ mb: 3 }}>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<Card sx={{ p: 3, ml: 3 }}>
											<Typography
												variant="h5"
												sx={{ mb: 2, textTransform: 'capitalize' }}
												color="text.secondary"
											>
												{item.nama}
											</Typography>

											<Typography variant="body2" sx={{ mb: 2 }}>
												{item.fakultas.nama}
											</Typography>
											<Divider sx={{ my: 3 }} />
											<Button
												variant="contained"
												color="success"
												size="small"
												sx={{ mt: 3, mb: 3 }}
												onClick={() => {
													setJurusanId(item.id)
													setJurusanName(item.nama)
													setJurusanEdit(true)
												}}
												disabled={loading}
											>
												<Edit />
											</Button>
											<Button
												variant="contained"
												color="error"
												size="small"
												sx={{ mt: 3, ml: 2, mb: 3 }}
												onClick={() => {
													setJurusanId(item.id)
													setJurusanDelete(true)
												}}
												disabled={loading}
											>
												<DeleteOutline />
											</Button>

											{jurusanDelete && (
												<form onSubmit={deleteJurusan}>
													<Button
														variant="contained"
														color="error"
														size="small"
														sx={{ mt: 3 }}
														type="submit"
														disabled={loading}
													>
														Hapus <DeleteOutline />
													</Button>
												</form>
											)}
											{jurusanEdit && (
												<form onSubmit={editJurusan}>
													<TextField
														label="Jurusan"
														value={jurusanName}
														onChange={e => setJurusanName(e.target.value)}
														fullWidth
														required
														error={error}
														helperText={error && message}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton type="submit" disabled={loading}>
																		<CheckCircleOutline />
																	</IconButton>
																	<IconButton type="submit" disabled={loading}>
																		<CloseSharp />
																	</IconButton>
																</InputAdornment>
															),
														}}
													/>
													<FormControl fullWidth sx={{ mt: 3 }}>
														<InputLabel
															id="demo-simple-select-label"
															sx={{ mb: 1 }}
														>
															Fakultas
														</InputLabel>
														<Select
															labelId="demo-simple-select-label"
															id="demo-simple-select"
															value={fakultasId}
															label="Fakultas"
															onChange={e => setFakultasId(e.target.value)}
														>
															{fakultasId &&
																fakultasList.map((item: any) => (
																	<MenuItem
																		key={item.id}
																		sx={{
																			textEmphasisStyle: 'none',
																			textDecoration: 'none',
																			textTransform: 'capitalize',
																			color: '#000',
																		}}
																		value={item.nama}
																	>
																		{item.nama}
																	</MenuItem>
																))}
														</Select>{' '}
													</FormControl>

													<Button
														variant="contained"
														color="success"
														size="small"
														sx={{ mt: 3 }}
														type="submit"
														disabled={loading}
													>
														Ubah
													</Button>
												</form>
											)}
										</Card>{' '}
									</Grid>
								</Box>
							))}
					</Grid>
				</Box>
			</Paper>
		</Box>
	)
}

export default Jurusan
