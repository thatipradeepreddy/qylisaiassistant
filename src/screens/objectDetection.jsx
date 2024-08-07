import React, { useState, useRef, useCallback } from "react"
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
import Webcam from "react-webcam"
import axios from "axios"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

const API_URL = "http://localhost:5000"

export function ObjectDetection() {
    const [tab, setTab] = useState(0)
    const [processing, setProcessing] = useState(false)
    const [result, setResult] = useState(null)
    const webcamRef = useRef(null)

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
        setResult(null)
    }

    const captureFrame = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot()
        setProcessing(true)
        try {
            const response = await axios.post(`${API_URL}/detect_realtime`, {
                frame: imageSrc.split(",")[1],
            })
            setResult(response.data)
        } catch (error) {
            console.error("Error processing frame:", error)
        }
        setProcessing(false)
    }, [webcamRef])

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append(tab === 1 ? "image" : "video", file)

        setProcessing(true)
        try {
            const response = await axios.post(`${API_URL}/${tab === 1 ? "detect_image" : "detect_video"}`, formData, {
                responseType: tab === 1 ? "json" : "blob",
            })
            setResult(tab === 1 ? response.data : URL.createObjectURL(response.data))
        } catch (error) {
            console.error("Error processing file:", error)
        }
        setProcessing(false)
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
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {tab === 0 && (
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "user" }}
                                style={{ width: "100%", maxWidth: "640px" }}
                            />
                            <Button variant="contained" onClick={captureFrame} disabled={processing} sx={{ mt: 2 }}>
                                {processing ? <CircularProgress size={24} /> : "Capture and Process"}
                            </Button>
                        </>
                    )}
                    {(tab === 1 || tab === 2) && (
                        <Button variant="contained" component="label" disabled={processing}>
                            {processing ? <CircularProgress size={24} /> : `Upload ${tab === 1 ? "Image" : "Video"}`}
                            <input type="file" hidden accept={tab === 1 ? "image/*" : "video/*"} onChange={handleFileUpload} />
                        </Button>
                    )}
                    {result && (
                        <Box sx={{ mt: 4, width: "100%", maxWidth: "640px" }}>
                            {tab === 0 || tab === 1 ? (
                                <img
                                    src={`data:image/jpeg;base64,${result.processed_frame}`}
                                    alt="Processed"
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <video src={result} controls style={{ width: "100%" }} />
                            )}
                            {(tab === 0 || tab === 1) && result.counts && (
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Detections: {JSON.stringify(result.counts, null, 2)}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    )
}
