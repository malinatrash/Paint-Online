import { makeAutoObservable } from 'mobx'

class ToolState {
	tool = null
	constructor() {
		makeAutoObservable(this)
	}
	

	setTool(tool) {
		this.tool = tool
	}
	setFillColor(color) {
		this.tool.setFillColor(color)
	}
	setStrokeColor(color) {
		this.tool.setStrokeColor(color)
	}
	setLineWidth(width) {
		this.tool.setLineWidth(width)
	}
}

export default new ToolState()
