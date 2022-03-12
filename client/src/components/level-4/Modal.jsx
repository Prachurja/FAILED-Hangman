import { AnimatePresence } from "framer-motion"

function Modal({children, modalOpen, setModalOpen}) {
    return (
        <AnimatePresence initial={false} exitBeforeEnter={true}>{
            modalOpen &&
            <motion.div
                initial={{backdropFilter: "blur(0px)"}}
                animate={{backdropFilter: "blur(5px)"}}
                exit={{backdropFilter: "blur(0px)"}}
                onClick={() => setModalOpen(false)}
                className="absolute top-0 left-0 h-screen w-screen grid place-items-center"
            >
                <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: 0}}
                    onClick={e => e.stopPropagation()}
                    className="p-3 bg-stone-200 dark:bg-black dark:text-white rounded-xl"
                >
                    {children}
                </motion.div>
            </motion.div>
        }</AnimatePresence>
    )
}

export default Modal