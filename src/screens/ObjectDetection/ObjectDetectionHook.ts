// src/hooks/useObjectDetection.ts
import { useEffect, useState } from 'react'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs' // Ensure this line is present

const useObjectDetection = () => {
	const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)

	useEffect(() => {
		const loadModel = async () => {
			const loadedModel = await cocoSsd.load()
			setModel(loadedModel)
		}
		loadModel()
	}, [])

	const detectObjects = async (imageData: ImageData) => {
		if (model) {
			const predictions = await model.detect(imageData)
			return predictions
		}
		return []
	}

	return detectObjects
}

export default useObjectDetection
