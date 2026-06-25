import { PencilIcon, Trash } from "lucide-react"
import { deleteCamp, updateCamp } from "../services/api"
import { useState } from "react";
import { toast } from "sonner"
import { Spinner } from "./ui/spinner";


export default function CampTable({ camps, fetchCampaigns, loading }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [leads, setLeads] = useState("");
    async function handleDelete(id) {
        await deleteCamp(id);
        await fetchCampaigns();
        toast("Campaign Deleted successfully", { position: "top-center" });

    }
    async function handleUpdate(camp) {
        const updatedCamp = {
            name: name,
            status: status,
            leads: leads
        };
        if (!name) {
            toast.error("Campaign name is required");
            return;
        }
        if (!leads || Number(leads) <= 0 || isNaN(Number(leads))) {
            toast.error("Leads must be number greater than 0", { position: "top-center" });
            return;
        }
        await updateCamp(camp.id, updatedCamp);
        await fetchCampaigns();
        setOpen(false);
        toast("Campaign Updated successfully", { position: "top-center" });

    }
    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2">
                <Spinner />
                <span>Loading campaigns...</span>
            </div>
        );
    }
    if (!loading && camps.length === 0) {
        return (
            <div className="flex items-center justify-center py-10 gap-2">
                <span>No campaigns found</span>
            </div>
        );
    }
    return (
        <>
            <div className="border border-gray-200 rounded-lg overflow-auto">
                <table className="w-full text-left border-1 rounded-lg">

                    <thead className="bg-gray-100 border-gray-200 border-1 rounded-lg ">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold ">
                                Campaign
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold ">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold ">
                                Leads
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold ">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        {camps && camps.map((camp) => (
                            <tr key={camp.id}>
                                <td className="px-6 py-3 text-left text-sm font-medium text-black-500 ">
                                    {open === camp.id ?
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Campaign Name"
                                            className="md:w-full w-40 border p-2 rounded-lg"
                                        /> :
                                        camp.name
                                    }
                                </td>
                                <td className={`px-2 py-1  my-3 inline-flex text-left text-sm font-medium text-gray-500 
                                ${camp.status === "Active" ? ' bg-teal-50 text-teal-500 rounded-lg'
                                        : camp.status === "Completed" ? ' bg-sky-50 text-sky-500 rounded-lg'
                                            : ' bg-orange-50 text-orange-400 rounded-lg'
                                    }`}>
                                    {open === camp.id ?
                                        <select className="flex py-2 rounded-lg border-1 md:text-sm text-xs  md:w-full w-25 justify-center items-center   px-2 gap-2 focus:outline-none focus:border-blue-500 bg-white"
                                            onChange={(e) => setStatus(e.target.value)}
                                            value={status}>
                                            <option value="none">select status</option>
                                            <option value="Active">Active</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Completed">Completed</option>
                                        </select> : <div>
                                            •{camp.status}
                                        </div>
                                    }

                                </td>
                                <td className="px-6 py-3 text-left font-medium text-gray-500 ">
                                    {open === camp.id ?
                                        <input
                                            type="text"
                                            value={leads || ""}
                                            onChange={(e) => setLeads(e.target.value)}
                                            placeholder="Leads"
                                            className="md:w-full w-20 border p-2 rounded-lg"
                                        /> :
                                        camp.leads
                                    }
                                </td>
                                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">
                                    <div className="flex lg:gap-8 gap-3">
                                        {
                                            open === camp.id ?
                                                <button className=" bg-amber-600 text-white px-4 py-2 rounded-lg"
                                                    onClick={() => {

                                                        handleUpdate(camp)
                                                    }}>
                                                    Save
                                                </button> :
                                                <button
                                                    onClick={() => {
                                                        setOpen(camp.id);
                                                        setName(camp.name);
                                                        setStatus(camp.status);
                                                        setLeads(camp.leads);
                                                    }}
                                                    className="hover:scale-105">
                                                    <PencilIcon className="text-amber-600" size={16} />
                                                </button>
                                        }
                                        <button onClick={() => handleDelete(camp.id)}
                                            className="hover:scale-105">
                                            <Trash className="text-rose-500" size={16} />
                                        </button>
                                    </div>


                                </td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}
