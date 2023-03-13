import React, { useEffect, useRef, useState } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Rect from '../tools/Rect'
import axios from 'axios'

const Canvas = observer(() => {
	const canvasRef = useRef()
	const usernameRef = useRef()
	const [modal, setModal] = useState(true)
	const params = useParams()

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
		let context = canvasRef.current.getContext('2d')
		axios.get(`http://localhost:1511/image?id=${params.id}`)
			.then(response => {
				const img = new Image()
				img.src = response.data
				img.onload = () => {
					context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
					context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
				}
			})
	}, [])

	useEffect(() => {
		if (canvasState.username) {
			const socket = new WebSocket(`ws://localhost:1511/`)
			canvasState.setSocket(socket)
			canvasState.setSession(params.id)
			toolState.setTool(new Brush(canvasRef.current, socket, params.id))
			socket.onopen = () => {
				console.log('Подключение установлено')
				socket.send(JSON.stringify({
					id: params.id,
					username: canvasState.username,
					method: 'connection'
				}))
			}
			socket.onmessage = (event) => {
				let msg = JSON.parse(event.data)
				switch (msg.method) {
					case 'connection':
						console.log(`пользователь ${msg.username} присоединился`)
						break
					case 'draw':
						drawHandler(msg)
						break
				}
			}
		}
	}, [canvasState.username])

	const drawHandler = (msg) => {
		const figure = msg.figure
		const context = canvasRef.current.getContext('2d')
		switch (figure.type) {
			case 'brush':
				Brush.draw(context, figure.x, figure.y)
				break
			case 'rect':
				Rect.staticDraw(context, figure.x, figure.y, figure.width, figure.height, figure.color)
				break
			case 'finish':
				context.beginPath()
				break
		}
	}


	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
		axios.post(`http://localhost:1511/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
			.then(response => console.log(response.data))
	}

	const connectHandler = () => {
		canvasState.setUserName(usernameRef.current.value)
		setModal(false)
	}

	return (
		<div className='canvas'>
			<Modal show={modal} onHide={() => {
			}}>
				<Modal.Header>
					<Modal.Title>Введите ваше имя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input type='text' ref={usernameRef} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => connectHandler()}>
						Войти
					</Button>
				</Modal.Footer>
			</Modal>
			<canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400} />
		</div>
	)
})

export default Canvas
