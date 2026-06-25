import { Search } from "lucide-react"

export default function SearchBar({ className, onChange, value }) {
    return (
        <div className={`flex py-2 border-2 rounded-lg border-gray-300 px-2 gap-2 focus-within:border-blue-500 ${className}`}>
            <Search />
            <input type="text " onChange={onChange} value={value} className="focus:outline-none w-full" placeholder="Search" />
        </div>
    )
}
