import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Menu from './Menu/Menu'
import { Chat } from './Chat'
import './Layout.css'

const Layout: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<div
			className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
		>
			<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
			<div className={`content ${isSidebarOpen ? 'content-open' : ''}`}>
				<Menu onToggleSidebar={toggleSidebar} />
				<Chat />
			</div>
		</div>
	)
}

export default Layout
