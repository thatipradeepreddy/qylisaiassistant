// src/components/VideoUpload.tsx
import React, { useRef, useCallback, useState } from 'react'
import { Hands, Results } from '@mediapipe/hands'
import useHandDetection from './useHanddetection'

const VideoUpload: React.FC<{ onFrame: (imageData: ImageData) => void }> = ({
	onFrame,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [boundingBox, setBoundingBox] = useState<{
		x: number
		y: number
		width: number
		height: number
	} | null>(null)

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const url = URL.createObjectURL(file)
			const video = videoRef.current
			if (video) {
				video.src = url
			}
		}
	}

	const handleResults = useCallback((results: Results) => {
		if (
			results.multiHandLandmarks &&
			results.multiHandLandmarks.length > 0
		) {
			const handLandmarks = results.multiHandLandmarks[0]

			const x =
				Math.min(...handLandmarks.map((p) => p.x)) *
				videoRef.current!.videoWidth
			const y =
				Math.min(...handLandmarks.map((p) => p.y)) *
				videoRef.current!.videoHeight
			const width =
				(Math.max(...handLandmarks.map((p) => p.x)) -
					Math.min(...handLandmarks.map((p) => p.x))) *
				videoRef.current!.videoWidth
			const height =
				(Math.max(...handLandmarks.map((p) => p.y)) -
					Math.min(...handLandmarks.map((p) => p.y))) *
				videoRef.current!.videoHeight

			setBoundingBox({ x, y, width, height })
		} else {
			setBoundingBox(null)
		}
	}, [])

	useHandDetection(handleResults)

	const captureFrame = useCallback(() => {
		const video = videoRef.current
		if (video && video.videoWidth > 0 && video.videoHeight > 0) {
			const canvas = document.createElement('canvas')
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			const ctx = canvas.getContext('2d')
			if (ctx) {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				)
				onFrame(imageData)
			}
		}
		requestAnimationFrame(captureFrame)
	}, [onFrame])

	const handleLoadedData = () => {
		const video = videoRef.current
		if (video) {
			video.play()
			captureFrame()
		}
	}

	return (
		<div style={{ position: 'relative' }}>
			<input type='file' accept='video/*' onChange={handleFileUpload} />
			<video
				ref={videoRef}
				style={{ width: '100%' }}
				onLoadedData={handleLoadedData}
				controls
			/>
			{boundingBox && (
				<div
					style={{
						position: 'absolute',
						border: '2px solid red',
						left: boundingBox.x,
						top: boundingBox.y,
						width: boundingBox.width,
						height: boundingBox.height,
					}}
				/>
			)}
		</div>
	)
}

export default VideoUpload
