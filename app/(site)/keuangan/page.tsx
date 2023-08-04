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
	
	return (
		<div>
			<h1>Keuangan</h1>
		</div>
	)
}

export default Keuangan
