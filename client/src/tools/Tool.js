export default class Tool {
	constructor(canvas) {
		this.canvas = canvas
		this.context = canvas.getContext('2d')
		this.destroyEvents()
	}

	setFillColor(color) {
		this.context.fillStyle = color
	}
	setStrokeColor(color) {
		this.context.strokeStyle = color
	}
	setLineWidth(width) {
		this.context.lineWidth = width
	}

	destroyEvents() {
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup = null
	}
}
