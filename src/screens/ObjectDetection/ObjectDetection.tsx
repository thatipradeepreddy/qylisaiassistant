import React, { useState } from 'react'
import CameraFeed from './CameraFeed'
import VideoUpload from './VideoUpload'

const ObjectDetection: React.FC = () => {
	const [mode, setMode] = useState<'camera' | 'video' | null>(null)

	return (
		<div>
			<h1>Object Detection</h1>
			<div>
				<button onClick={() => setMode('camera')}>Open Camera</button>
				<button onClick={() => setMode('video')}>Upload Video</button>
			</div>
			<div style={{ marginTop: '20px' }}>
				{mode === 'camera' && <CameraFeed />}
				{mode === 'video' && (
					<VideoUpload
						onFrame={function (imageData: ImageData): void {
							throw new Error('Function not implemented.')
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default ObjectDetection
