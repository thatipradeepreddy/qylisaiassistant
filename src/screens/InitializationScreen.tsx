import React from "react"
import { useNavigate } from "react-router-dom"
import Box from "./../components/Box"
import "./InitializationScreen.css"

const InitializationScreen: React.FC = () => {
    const navigate = useNavigate()

    const handleBoxClick = (path: string) => {
        navigate(path)
    }

    return (
        <div className="initialization-screen">
            <div className="header-container">
                <img src="qylislogo.png" alt="Logo" className="logo" />
                <h1 className="welcome-text">Welcome to Qylis Labs</h1>
            </div>

            <div className="box-container">
                <Box
                    backgroundImage="https://media.istockphoto.com/id/1488335095/vector/3d-vector-robot-chatbot-ai-in-science-and-business-technology-and-engineering-concept.jpg?s=612x612&w=0&k=20&c=MSxiR6V1gROmrUBe1GpylDXs0D5CHT-mn0Up8D50mr8="
                    title="Qylis Chat"
                    onClick={() => handleBoxClick("/chat")}
                />
                <Box
                    backgroundImage="https://framerusercontent.com/images/xJ1G5MuY2Z6DJFmwjYgUb75dZto.jpg"
                    title="Object Detection"
                    onClick={() => handleBoxClick("/objectDetection")}
                />
                <Box title="Coming Soon" onClick={() => handleBoxClick("")} />
                {/* <Box title="Box 4" onClick={() => handleBoxClick("")} /> */}
            </div>
        </div>
    )
}

export default InitializationScreen
