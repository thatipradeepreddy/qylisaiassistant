import React from "react"
import "./Box.css"

interface BoxProps {
    title: string
    onClick: () => void
}

const Box: React.FC<BoxProps> = ({ title, onClick }) => {
    return (
        <div className="box" onClick={onClick}>
            <h2>{title}</h2>
        </div>
    )
}

export default Box
