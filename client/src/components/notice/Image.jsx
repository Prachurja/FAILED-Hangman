export default function Image({iconClass, iconStyle="fa-solid", colorClass, title}) {
    return (
        <div className="grid justify-center gap-4">
            <i className={`${iconClass?.includes("circle") ? "bg-white rounded-full" : ""} w-min text-8xl text-center ${iconStyle} ${iconClass} ${colorClass}`}></i>
            <p className={`font-medium text-center text-lg ${colorClass}`}>{title}</p>
        </div>
    )
}