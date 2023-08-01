import React, { useState } from 'react'
import {
	Button,
	Grid,
	Typography,
	Paper,
	Box,
	Divider,
	TextField,
	InputAdornment,
	IconButton,
} from '@mui/material'

const Upload = ({ props }: any) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Grid container spacing={2} direction="column">
				<Grid item>
					<Typography
						sx={{ mb: 2, mt: 2, textAlign: 'center' }}
						variant="h4"
						component="div"
					>
						Upload your file here
					</Typography>
				</Grid>
				<Divider />
				<Grid item sx={{ mt: 2 }}>
					<Paper
						sx={{
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<TextField
							id="outlined-basic"
							label={props.label}
							value={props.value}
							onChange={props.onChange}
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<IconButton>
											<img src={props.icon} alt="icon" />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Upload
