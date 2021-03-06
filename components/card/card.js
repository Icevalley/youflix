import Image from 'next/image'
import styles from './card.module.css'
import { useState } from 'react'
import { motion } from "framer-motion"
import cls from 'classnames'

const Card = (props) => {

    const { imgUrl = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1456&q=80', 
    size = 'medium',
    id } = props;

    const [imgSrc, setImgSrc] = useState(imgUrl)

    const classMap = {
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem
    }

    const handleOnError = () => {
        console.log("Hi error")
        setImgSrc('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1456&q=80')
    }

    const scale = id === 0 ? { scaleY:1.1 } : {scale: 1.1}; 
    return (
        <div className={styles.container}>
            <motion.div
                className={cls(styles.imgMotionWrapper,
                    classMap[size])}
                whileHover={ scale } >
                <Image
                    src={imgSrc}
                    alt='image'
                    layout='fill'
                    onError={handleOnError}
                    className={styles.cardImg} />
            </motion.div>
        </div>
    )
}

export default Card