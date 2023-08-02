'use client'
import React from 'react'
import Side from '../../components/Side'
import AuthProvider from '~/components/AuthProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthProvider>
				<Side>{children}</Side>
			</AuthProvider>
		</>
	)
}

export default Layout
