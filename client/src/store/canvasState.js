import { makeAutoObservable } from 'mobx'

class CanvasState {
	canvas = null
	undoList = []
	redoList = []
	constructor() {
		makeAutoObservable(this)
	}
	setCanvas(canvas) {
		this.canvas = canvas
	}
	pushToUndo(data) {
		this.undoList.push(data)
	}
	pushToRedo(data) {
		this.redoList.push(data)
	}
	undo() {
		let context = this.canvas.getContext('2d')
		this.pushToRedo(context)
		if (this.undoList.length > 0) {
			console.log(this.undoList.length)
			let data = this.undoList.pop()
			this.redoList.push(data)
			let image = new Image()
			image.src = data
			image.onload = () => {
				context.clearRect(0, 0, this.canvas.width, this.canvas.height)
				context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
			}
		} else {
			context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		}
	}
	redo() {
		let context = this.canvas.getContext('2d')
		if (this.redoList.length > 0) {
			console.log(this.redoList.length)
			let data = this.redoList.pop()
			this.undoList.push(this.canvas.getContext('2d'))
			let image = new Image()
			image.src = data
			image.onload = () => {
				context.clearRect(0, 0, this.canvas.width, this.canvas.height)
				context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
			}
		} else {
			context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		}
	}
}

export default new CanvasState()
