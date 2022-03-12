import HoveringDiv from "../level-4/HoveringDiv"

function Menu({hovering, setHovering, variants, options}) {
    return (
        <HoveringDiv
            hovering={hovering}
            onClick={() => setHovering(false)}
            setHovering={setHovering}
            variants={variants}
            className="flex flex-col w-32 mt-1 absolute"
            closeOnClick={true}
        >{
            options.map((option, index) => (<div key={index} className={`relative text-[0.65rem] px-3 py-2 bg-[rgb(98,98,98)] duration-75 hover:bg-neutral-600 text-white first-of-type:rounded-t-lg last-of-type:rounded-b-lg`}>{option}</div>))
        }</HoveringDiv>
    )
}

export default Menu