import React from 'react'
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'
import { Fragment } from 'react'

const Upload = ({
	fakultas_id,
	setFakultas_id,
	jurusan_id,
	setJurusan_id,
	fakultas,
	jurusan,
}: {
	fakultas_id: string
	setFakultas_id: any
	jurusan_id: string
	setJurusan_id: string | any
	fakultas: string[]
	jurusan: string[]
}) => {
	return (
		<div>
			<Fragment>
				<FormControl fullWidth sx={{ mb: 2 }}>
					<InputLabel id="demo-simple-select-label">Fakultas</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						sx={{ height: '50px', textTransform: 'uppercase' }}
						value={fakultas_id}
						label="Fakultas"
						onChange={e => setFakultas_id(e.target.value)}
					>
						<MenuItem value={0} style={{ textTransform: 'uppercase' }}>
							Pilih Fakultas
						</MenuItem>
						{fakultas?.map((fakultas: any, index: any) => (
							<MenuItem
								key={index}
								value={fakultas.nama}
								style={{
									marginBottom: 2,
									textTransform: 'uppercase',
								}}
							>
								{fakultas.nama}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth sx={{ mb: 2 }}>
					<InputLabel id="demo-simple-select-label">Jurusan</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={jurusan_id}
						label="Jurusan"
						onChange={e => setJurusan_id(e.target.value)}
						sx={{ height: '50px', textTransform: 'uppercase' }}
					>
						{jurusan?.map((jurusan: any, index: any) => (
							<MenuItem
								key={index}
								value={jurusan.nama}
								style={{
									marginBottom: 2,
									textTransform: 'uppercase',
								}}
							>
								{jurusan.nama}
								<FormHelperText sx={{ ml: 3, textTransform: 'uppercase' }}>
									{jurusan.fakultas.nama}
								</FormHelperText>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Fragment>
		</div>
	)
}

export default Upload
