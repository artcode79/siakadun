/* eslint-disable @next/next/no-img-element */
'use client'
import {
	Box,
	Button,
	Typography,
	Paper,
	Card,
	CardContent,
	CardActions,
	Modal,
	TextField,
	Grid,
} from '@mui/material'
import {
	onAuthStateChanged,
	updatePhoneNumber,
	updateProfile,
} from 'firebase/auth'
import { updateDoc, collection, doc, setDoc } from 'firebase/firestore'
import {
	ref,
	getDownloadURL,
	StorageReference,
	uploadBytes,
} from 'firebase/storage'
import React, { useState, useEffect, Fragment } from 'react'
import { auth, db, storage } from '~/libs/firebase'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
}

const Users = () => {
	const [user, setUser] = useState<any>(null)
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const [name, setName] = useState<string>('')
	const [photoURL, setPhotoURL] = useState<string>('')
	const [file, setFile] = useState<any>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// jika tidak ada user dalam database maka buatkan documen jika ada update doc tersebut
		if (user) {
			
			const docRef = doc(db, 'users', user.uid)
			await setDoc(docRef, {
				name: name,
				photoURL: photoURL,
			})
			alert('data berhasil di simpan')
			window.location.reload()
		}
	}

	const handlePhotoURL = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		if (file) {
			setFile(file[0])
			const storageRef: StorageReference = ref(storage, file[0].name)
			await uploadBytes(storageRef, file[0])
			const url = await getDownloadURL(storageRef)
			setPhotoURL(url)
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user)
		})
	}, [])

	console.log()

	return (
		<>
			<Typography variant="h5" align="center" component="div" gutterBottom>
				Users
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Paper
					sx={{
						width: '50%',
						height: '50%',
						display: 'flex',
					}}
				>
					<Card sx={{ width: '100%', height: '100%' }}>
						<CardContent>
							<img
								src={user?.photoURL}
								alt={user?.displayName}
								style={{ width: '100%', height: '100%' }}
							/>
							<ul>
								<li>Name: {user?.displayName}</li>
								<li>Email: {user?.email}</li>
								<li>UID: {user?.uid}</li>

								<li>ProviderID: {user?.providerId}</li>
								<li>Phone Number: {user?.phoneNumber}</li>
							</ul>
						</CardContent>
						<CardActions>
							<Button size="small" onClick={handleOpen}>
								Edit
							</Button>
							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="parent-modal-title"
								aria-describedby="parent-modal-description"
							>
								<Box
									sx={{
										...style,
										width: 650,
										height: 400,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Typography
										id="parent-modal-title"
										variant="h6"
										component="h2"
									>
										Edit User
									</Typography>
									<form
										onSubmit={handleSubmit}
										method="post"
										encType="multipart/form-data"
									>
										<Grid
											container
											spacing={2}
											sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}
										>
											<Grid item xs={12} sm={6} md={7} lg={8}>
												<TextField
													id="name"
													label="Name"
													variant="outlined"
													type="text"
													autoComplete="off"
													autoFocus
													required
													fullWidth
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
													size="small"
													value={name}
													onChange={e => setName(e.target.value)}
												/>
											</Grid>
											<Grid item xs={12} sm={6} md={7} lg={8}>
												<TextField
													id="file"
													label="PhotoURl"
													type="file"
													name="file"
													autoComplete="off"
													autoFocus
													required
													fullWidth
													margin="normal"
													inputProps={{
														onChange: handlePhotoURL,
													}}
													size="small"
													InputLabelProps={{
														shrink: true,
													}}
													variant="outlined"
												/>
											</Grid>
											<Grid item xs={12} sm={6} md={7} lg={8}>
												<Button
													variant="contained"
													color="primary"
													size="small"
													fullWidth
													type="submit"
												>
													Submit{' '}
												</Button>
											</Grid>{' '}
										</Grid>
									</form>
								</Box>
							</Modal>
						</CardActions>
					</Card>
				</Paper>
			</Box>
		</>
	)
}

export default Users
