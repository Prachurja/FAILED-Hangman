function Button({children, className, onClick}) {
    return (
        <button onClick={onClick} className={"w-32 text-xs justify-center flex items-center bg-[#8a8a8a] text-white py-2 rounded-lg " + className}>{children}</button>
    )
}

export default Button