import Brush from './Brush'

export default class Eraser extends Brush {
	constructor(canvas) {
		super(canvas)
	}


	draw(x, y) {
		this.context.strokeStyle = 'white'
		this.context.lineTo(x, y)
		this.context.stroke()
	}
}