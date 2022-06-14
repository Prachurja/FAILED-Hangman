function Field({ name }) {
    return (
        <input type="text" placeholder={name} name={name} id={name} autoComplete="off" className="h-8 w-full pl-3 rounded-md bg-stone-300 placeholder-stone-700 border-dotted border-stone-400 border-[1px]" />
    )
}

export default Field