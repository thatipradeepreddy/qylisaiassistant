// src/components/CameraFeed.tsx
import React, { useRef, useCallback, useState } from 'react'
import useHandDetection from './useHanddetection'
import { Results } from '@mediapipe/hands'

const CameraFeed: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [boundingBox, setBoundingBox] = useState<{
		x: number
		y: number
		width: number
		height: number
	} | null>(null)

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

	return (
		<div style={{ position: 'relative' }}>
			<video
				ref={videoRef}
				style={{ width: '50%', height: '50%' }}
				playsInline
				autoPlay
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

export default CameraFeed
