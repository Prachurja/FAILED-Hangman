import { AnimatePresence, motion } from "framer-motion"

export default function Modal({children, modalOpen, setModalOpen, className}) {
    return (
        <AnimatePresence initial={false} exitBeforeEnter={true}>{
            modalOpen &&
            <motion.div
                initial={{backdropFilter: "blur(0px)"}}
                animate={{backdropFilter: "blur(5px)"}}
                exit={{backdropFilter: "blur(0px)"}}
                onClick={() => setModalOpen(false)}
                className="fixed top-0 left-0 h-screen w-screen grid place-items-center"
            >
                <motion.div
                    initial={{translateX: "100vw"}}
                    animate={{translateX: "0vw"}}
                    exit={{translateX: "-100vw"}}
                    transition={{duration: "0.50", type: "spring"}}
                    onClick={e => e.stopPropagation()}
                    className={"bg-stone-200 dark:bg-black dark:text-white rounded-xl w-[80vw] " + className}
                >
                    {children}
                </motion.div>
            </motion.div>
        }</AnimatePresence>
    )
}