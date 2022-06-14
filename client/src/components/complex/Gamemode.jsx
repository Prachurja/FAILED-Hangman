function Gamemode({title, description, play, demo, arrangeReverse}) {
    return (
        <>
            <div className="p-6 [border:dashed_1px_gray] bg-neutral-100 dark:bg-black rounded-[24px] flex-1 relative" style={{gridColumnStart: arrangeReverse ? "auto" : 1}}>
                {demo}
            </div>
            <section className="flex-1 flex flex-col justify-center gap-6" style={{alignItems: arrangeReverse ? "flex-end" : "flex-start", gridColumnStart: arrangeReverse ? 1 : "auto"}}>
                <h1 className="font-semibold text-xl">{title}</h1>
                <p className="text-sm" style={{textAlign: arrangeReverse ? "right" : "left"}}>{description}</p>
                {play}
            </section>
        </>
    )
}

export default Gamemode