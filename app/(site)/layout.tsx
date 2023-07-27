'use client'
import React from 'react'
import Side from '../../components/Side'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Side>{children}</Side>
		</>
	)
}

export default Layout
