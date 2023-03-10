import Tool from './Tool'

export default class Brush extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseUpHandler(e) {
		this.mouseDown = false
	}
	mouseDownHandler(e) {
		this.mouseDown = true
		this.context.beginPath()
		this.context.moveTo(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		)
	}
	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
		}
	}

	draw(x, y) {
		this.context.lineTo(x, y)
		this.context.stroke()
	}
}
