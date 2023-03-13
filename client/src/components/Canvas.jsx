import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import '../styles/canvas.scss'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'


const Canvas = observer(() => {
	const canvasRef = useRef()
	const usernameRef = useRef()
	const params = useParams()
	const [isShown, setIsShown] = useState(true)

	const connectionHandler = () => {
		setIsShown(false)
		canvasState.setUserName(usernameRef.current.value)
	}

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
		toolState.setTool(new Brush(canvasRef.current))
	}, [])

	useEffect(() => {
		if (canvasState.username) {
			const socket = new WebSocket('ws://localhost:1511')
			socket.onopen = () => {
				console.log('Подключение успешно')
				socket.send(JSON.stringify({
					id: params.id,
					username: canvasState.username,
					method: 'connection'
				}))
			}
			socket.onmessage = (event) => {
				console.log(event.data)
			}
		}
	}, [canvasState.username])


	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
	}
	return (
		<div className='canvas'>
			<Modal show={isShown} onHide={() => {
			}}>
				<Modal.Header closeButton>
					<Modal.Title>Введите ваше имя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						ref={usernameRef}
						type='text'
						style={{ width: '100%', height: '100%', borderColor: 'transparent' }}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={() => connectionHandler()}>
						Войти
					</Button>
				</Modal.Footer>
			</Modal>
			<canvas
				onMouseDown={mouseDownHandler}
				ref={canvasRef}
				width={600}
				height={400}
			/>
		</div>
	)
})

export default Canvas
