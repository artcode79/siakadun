'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '~/libs/firebase'
import { Box } from '@mui/material'

const Edit = ({ params }: any) => {
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
	const [keuangan, setKeuangan] = useState('')
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
	const [file_ijazah, setFile_ijazah] = useState<any>(null)
	const [file_skhun, setFile_skhun] = useState<any>(null)
	const [file_kk, setFile_kk] = useState<any>(null)

	return (
		<>
			<Box></Box>
		</>
	)
}

export default Edit
