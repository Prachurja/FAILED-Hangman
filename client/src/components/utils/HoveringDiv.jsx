import { useEffect, createRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function HoveringDiv({hovering, setHovering, variants, children, className, closeOnClick, transitionDuration=0.15}) {
    const mounted = createRef(false)
    
    useEffect(() => {
        const outsideClick = () => hovering && setHovering(false)
        
        if(!mounted.current) {
            document.addEventListener("click", outsideClick)
            mounted.current = true
        }

        return () => document.removeEventListener("click", outsideClick)
    }, [hovering, setHovering, mounted])

    return (
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>{
                hovering &&
                <motion.div
                    className={className + " z-10"}
                    variants={variants}
                    initial="hidden"
                    exit="hidden"
                    animate="visible"
                    transition={{duration: transitionDuration, type: "spring"}}
                    {...(closeOnClick ? {} : { onClick: (event => event.stopPropagation())})}
                >{
                    children
                }</motion.div>
            }</AnimatePresence>
        </>
    )
}