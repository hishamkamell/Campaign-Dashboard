
export default function Button({
    className,
    ...props
}) {
    return (
        <button className={`${className} flex items-center py-2 px-4 bg-blue-500 rounded-xl text-white text-lg transition-all duration-100 active:scale-95`} {...props}>
            {props.children}
        </button>
    )
}
