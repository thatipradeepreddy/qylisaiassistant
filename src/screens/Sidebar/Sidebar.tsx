import React from 'react'
// import './Sidebar.css'; // Assuming you have a CSS file for styling

interface SidebarProps {
	isOpen: boolean
	onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	return (
		<div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
			<div className='sidebar-header'>
				<button className='close-button' onClick={onClose}>
					{isOpen ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='red'
							className='bi bi-x'
							viewBox='0 0 16 16'
						>
							<path d='M7.854 8l3.823-3.823a.5.5 0 1 0-.708-.708L7.146 7.293 3.323 3.47a.5.5 0 0 0-.708.708L6.793 8l-3.18 3.177a.5.5 0 0 0 .708.708L7.854 8l3.823 3.823a.5.5 0 0 0 .708-.708L8.707 8l3.177-3.177a.5.5 0 0 0-.708-.708L7.854 7.293 4.031 3.47a.5.5 0 0 0-.708.708L7.293 8l-3.18 3.177a.5.5 0 1 0 .708.708L8 8.707l3.177 3.177a.5.5 0 1 0 .708-.708L8.707 8z' />
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='30'
							height='16'
							fill='black'
							className='bi bi-list'
							viewBox='0 0 16 16'
						>
							<path d='M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' />
						</svg>
					)}
				</button>
			</div>
			{isOpen && (
				<div className='sidebar-content'>
					<ul>
						<li style={{ color: 'black' }}>Link 1</li>
						<li style={{ color: 'black' }}>Link 2</li>
						<li style={{ color: 'black' }}>Link 3</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default Sidebar
