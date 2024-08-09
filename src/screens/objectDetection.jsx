import React, { useState, useRef, useCallback, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import Webcam from "react-webcam"
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

const API_URL = "http://192.168.68.69:9000"

export function ObjectDetection() {
    const [tab, setTab] = useState(0)
    const [processing, setProcessing] = useState(false)
    const [result, setResult] = useState(null)
    const [isCapturing, setIsCapturing] = useState(false)
    const [error, setError] = useState(null)
    const [enabledModels, setEnabledModels] = useState({
        asl: true,
        thumb: true,
        objects: true,
    })
    const [currentCounts, setCurrentCounts] = useState({})
    const webcamRef = useRef(null)
    const videoRef = useRef(null)
    const captureIntervalRef = useRef(null)

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
        setResult(null)
        setIsCapturing(false)
        setError(null)
        setCurrentCounts({})
    }

    const captureFrame = useCallback(async () => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot()
        if (!imageSrc) return

        try {
            const response = await axios.post(`${API_URL}/detect_realtime`, {
                frame: imageSrc.split(",")[1],
                enabled_models: enabledModels,
            })
            setResult(response.data)
            setCurrentCounts(response.data.counts)
            setError(null)
        } catch (error) {
            console.error("Error processing frame:", error)
            setError("Error processing frame. Please try again.")
        }
    }, [webcamRef, enabledModels])

    const toggleCapture = () => {
        if (isCapturing) {
            clearInterval(captureIntervalRef.current)
            captureIntervalRef.current = null
            setCurrentCounts({})
        } else {
            captureIntervalRef.current = setInterval(captureFrame, 1000)
        }
        setIsCapturing(!isCapturing)
    }

    const resetGraph = () => {
        setCurrentCounts({})
    }

    const handleModelToggle = (model) => {
        setEnabledModels((prev) => ({
            ...prev,
            [model]: !prev[model],
        }))
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("enabled_models", JSON.stringify(enabledModels))

        setProcessing(true)
        try {
            if (tab === 1) {
                const response = await axios.post(`${API_URL}/detect_image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                setResult(response.data)
                setCurrentCounts(response.data.counts)
            } else {
                const response = await fetch(`${API_URL}/detect_video`, {
                    method: "POST",
                    body: formData,
                })
                const reader = response.body.getReader()
                const stream = new ReadableStream({
                    async start(controller) {
                        while (true) {
                            const { done, value } = await reader.read()
                            if (done) break
                            controller.enqueue(value)
                        }
                        controller.close()
                    },
                })
                const videoBlob = await new Response(stream).blob()
                const videoUrl = URL.createObjectURL(videoBlob)
                setResult(videoUrl)
            }
            setError(null)
        } catch (error) {
            console.error("Error processing file:", error)
            setError(`Error processing file: ${error.response?.data?.detail || error.message}`)
        }
        setProcessing(false)
    }

    useEffect(() => {
        return () => {
            if (captureIntervalRef.current) {
                clearInterval(captureIntervalRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (isCapturing) {
            clearInterval(captureIntervalRef.current)
            captureIntervalRef.current = setInterval(captureFrame, 1000)
        }
    }, [enabledModels, isCapturing, captureFrame])

    const renderBarChart = (counts) => {
        if (!counts) return null

        const data = Object.entries(counts).flatMap(([category, objects]) =>
            Object.entries(objects).map(([name, count]) => ({ name, count, category }))
        )

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Qylis Eye</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box sx={{ width: "100%", mt: 4 }}>
                    <Tabs value={tab} onChange={handleTabChange} centered>
                        <Tab label="Real-time" />
                        <Tab label="Image Upload" />
                        <Tab label="Video Upload" />
                    </Tabs>
                </Box>
                {tab === 0 && (
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "user", width: 1280, height: 720 }}
                                style={{ width: "100%", maxWidth: "1280px" }}
                            />
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" onClick={toggleCapture} sx={{ mr: 2 }}>
                                    {isCapturing ? "Stop Capture" : "Start Capture"}
                                </Button>
                                {!isCapturing && (
                                    <Button variant="contained" onClick={captureFrame}>
                                        Capture and Process
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch checked={enabledModels.asl} onChange={() => handleModelToggle("asl")} />}
                                    label="American Sign Language"
                                    sx={{ color: "white" }}
                                />
                                <FormControlLabel
                                    control={<Switch checked={enabledModels.thumb} onChange={() => handleModelToggle("thumb")} />}
                                    label="Thumb Gestures"
                                    sx={{ color: "white" }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch checked={enabledModels.objects} onChange={() => handleModelToggle("objects")} />
                                    }
                                    label="Everyday Objects"
                                    sx={{ color: "white" }}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                )}
                {(tab === 1 || tab === 2) && (
                    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" component="label" disabled={processing}>
                            {processing ? <CircularProgress size={24} /> : `Upload ${tab === 1 ? "Image" : "Video"}`}
                            <input type="file" hidden accept={tab === 1 ? "image/*" : "video/*"} onChange={handleFileUpload} />
                        </Button>
                    </Box>
                )}
                {result && (
                    <Box sx={{ mt: 4, width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
                        {tab === 0 || tab === 1 ? (
                            <img
                                src={`data:image/jpeg;base64,${result.processed_frame}`}
                                alt="Processed"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            <video ref={videoRef} src={result} controls style={{ width: "100%" }} />
                        )}
                    </Box>
                )}
                {(tab === 0 || tab === 1 || tab === 2) && Object.keys(currentCounts).length > 0 && (
                    <Box sx={{ mt: 4, width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Current Detections:
                        </Typography>
                        {renderBarChart(currentCounts)}
                        {tab === 0 && (
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" onClick={resetGraph}>
                                    Reset Graph
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </Container>
            {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                    {error}
                </Typography>
            )}
        </ThemeProvider>
    )
}
