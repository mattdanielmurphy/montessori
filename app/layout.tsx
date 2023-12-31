import './globals.css'

import { Inter } from 'next/font/google'
import { Metadata } from 'next/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Montessori Beginnings',
	description: 'Brought to you by Brandon and Matthew Murphy.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
