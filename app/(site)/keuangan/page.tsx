'use client'
import React, { useEffect, useState } from 'react'
import {
	getDocs,
	collection,
	query,
	where,
	orderBy,
	limit,
} from 'firebase/firestore'
import { db } from '../../../libs/firebase'

interface KeuanganProps {}

const Keuangan: React.FC<KeuanganProps> = ({}) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [data, setData] = useState(null)

	
	console.log(data)
	console.log(error)
	console.log(loading)

	//
	if (loading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h1>Keuangan</h1>
		</div>
	)
}

export default Keuangan
