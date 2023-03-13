import React from 'react'
import './styles/app.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import Toolbar from './components/Toolbar'
import SettingsBar from './components/SettingsBar'
import Canvas from './components/Canvas'

const App = () => {
	return (
		<div className='app'>
			<Routes>
				<Route path={'/:id'} element={
					<>
						<Toolbar />
						<SettingsBar />
						<Canvas />
					</>
				}
				/>
				<Route path='/' element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
			</Routes>
		</div>
	)
}

export default App