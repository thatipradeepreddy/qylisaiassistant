import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './screens/Home'
import InitializationScreen from './screens/InitializationScreen'
import Layout from './screens/Layout'
import { Login } from './screens/Login/Login'
import { ForgotPassword } from './screens/ForgotPassword/ForgotPassword'
import { CreateUser } from './screens/CreateUser/CreateUser'
import ObjectDetection from './screens/ObjectDetection/ObjectDetection'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route
						path='/initial-screen'
						element={<InitializationScreen />}
					/>
					<Route path='/chat' element={<Layout />} />
					<Route path='/home' element={<Home />} />
					<Route
						path='/forgot-password'
						element={<ForgotPassword />}
					/>
					<Route path='/create-account' element={<CreateUser />} />
					<Route path='/objectDetection' element={<ObjectDetection />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
