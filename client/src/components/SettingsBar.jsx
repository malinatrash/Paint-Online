import toolState from '../store/toolState'
import '../styles/settingbar.scss'

const SettingsBar = () => {
	return (
		<div className='setting-bar'>
			<label
				htmlFor='line-width'
				style={{ marginLeft: '5px', marginRight: '5px' }}
			>
				Толщина линии
			</label>
			<input
				id='line-width'
				type='number'
				defaultValue={1}
				min={1}
				max={50}
				onChange={e => toolState.setLineWidth(e.target.value)}
				style={{ marginLeft: '5px', marginRight: '5px', width: '70px' }}
			/>
			<label htmlFor='stroke-color'>Цвет обводки</label>
			<input
				id='line-color'
				type='color'
				defaultValue={1}
				min={1}
				max={50}
				onChange={e => toolState.setStrokeColor(e.target.value)}
				style={{ marginLeft: '5px', marginRight: '5px', width: '70px' }}
			/>
		</div>
	)
}

export default SettingsBar
