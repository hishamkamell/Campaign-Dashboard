import { useState } from "react"
import SearchBar from "../ui/SearchBar"
import CampaignTable from "./CampTable"



export default function CampaginCard({ camps, fetchCampaigns, loading }) {
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")
    const filterCamps = camps.filter((camp) => camp.name.toLowerCase().includes(search.toLowerCase()))
        .filter((camp) => filter === "all" ? true : camp.status === filter);


    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-2xl my-4 p-6 gap-4 ">
            <div className="flex  gap-4 ">
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-100" />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="flex py-2 border-2 rounded-lg border-gray-300 px-2 gap-2 focus:outline-none focus:border-blue-500">
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="w-full">
                <CampaignTable loading={loading} camps={filterCamps} fetchCampaigns={fetchCampaigns} />
            </div>
        </div>
    )
}
