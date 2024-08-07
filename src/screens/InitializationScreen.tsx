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
            <h1
                style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: "2.4rem",
                    fontWeight: "bold",
                    color: "#3498db",
                    textAlign: "center",
                    margin: "0",
                    padding: "20px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    background: "linear-gradient(45deg, #3498db, #8e44ad)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                Welcome to Qylis Services
            </h1>

            <div className="box-container">
                <Box title="Chat Bot" onClick={() => handleBoxClick("/chat")} />
                <Box title="Object Detection" onClick={() => handleBoxClick("/objectDetection")} />
                <Box title="Box 3" onClick={() => handleBoxClick("")} />
                <Box title="Box 4" onClick={() => handleBoxClick("")} />
            </div>
        </div>
    )
}

export default InitializationScreen
