// src/hooks/useHandDetection.ts
import { useEffect, useRef } from 'react'
import { Hands, Results } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

const useHandDetection = (onResults: (results: Results) => void) => {
	const handsRef = useRef<Hands | null>(null)
	const cameraRef = useRef<Camera | null>(null)

	useEffect(() => {
		if (handsRef.current) return

		handsRef.current = new Hands({
			locateFile: (file) =>
				`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
		})

		handsRef.current.setOptions({
			maxNumHands: 1,
			modelComplexity: 1,
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5,
		})

		handsRef.current.onResults(onResults)

		if (cameraRef.current) {
			cameraRef.current.stop()
		}

		const videoElement = document.querySelector('video')

		if (videoElement) {
			cameraRef.current = new Camera(videoElement, {
				onFrame: async () => {
					if (handsRef.current) {
						await handsRef.current.send({ image: videoElement })
					}
				},
				width: 640,
				height: 480,
			})

			cameraRef.current.start()
		}

		return () => {
			handsRef.current?.close()
			cameraRef.current?.stop()
		}
	}, [onResults])
}

export default useHandDetection
