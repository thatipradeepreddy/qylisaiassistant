import React from "react"
import styles from "./box.module.css"

interface BoxProps {
    title: string
    onClick: () => void
    backgroundImage?: string
}

const Box: React.FC<BoxProps> = ({ title, onClick, backgroundImage }) => {
    const backgroundImageStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}

    return (
        <div style={{ ...backgroundImageStyle }} className={styles.box} onClick={onClick}>
            <h2 className={styles.headerSecond}>{title}</h2>
        </div>
    )
}

export default Box
