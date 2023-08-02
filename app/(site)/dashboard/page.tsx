'use client'
import React from 'react'
import { Typography, Box, Button, Paper, Grid, Container } from '@mui/material'

const Dashboard = () => {
	return (
		<>
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" gutterBottom>
					Dashboard
				</Typography>

				<Box sx={{ mt: 4 }}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
						<Typography variant="h6" component="h2">
							Welcome to the dashboard!
						</Typography>
						<Typography variant="body1" component="p">
							This is where you can view and manage your projects.
						</Typography>
						<Button variant="contained" color="primary" href="/mahasiswa">
							Mahasiswa
						</Button>
					</Paper>
				</Box>
			</Container>
		</>
	)
}

export default Dashboard
