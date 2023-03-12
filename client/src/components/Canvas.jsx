import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import '../styles/canvas.scss'

const Canvas = observer(() => {
	const canvasRef = useRef()

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
		toolState.setTool(new Brush(canvasRef.current))
	}, [])

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
	}
	return (
		<div className='canvas'>
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
