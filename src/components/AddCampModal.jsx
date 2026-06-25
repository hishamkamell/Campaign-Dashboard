import { useState } from "react"
import { toast } from "sonner"
import Button from "../ui/Button"
import { addCamp } from "../services/api";
export default function AddCampModal({ open, setOpen, setCamps }) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Active");
    const [leads, setLeads] = useState("");
    async function handleSubmit(e) {
        e.preventDefault()
        const newCamp = {
            name: name,
            status: status,
            leads: Number(leads)
        };
        if (!name) {
            toast.error("Campaign name is required");
            return;
        }
        if (!leads || Number(leads) <= 0 || isNaN(Number(leads))) {
            toast.error("Leads must be number greater than 0");
            return;
        }
        const createdCamp = await addCamp(newCamp);
        setCamps((prevCamps) => [...prevCamps, createdCamp]);
        setOpen(false);
        toast("Campaign added successfully", { position: "top-center" });
    }
    return (
        <>
            {open &&
                < div >
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">
                                Add Campaign
                            </h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Campaign Name"
                                    className="w-full border p-2 rounded-lg"
                                />
                                <select className="flex py-2 rounded-lg border-1 px-2 gap-2 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}>
                                    <option value="none">select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Paused">Paused</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <input
                                    required
                                    type="text"
                                    value={leads}
                                    onChange={(e) => setLeads(e.target.value)}
                                    placeholder="Leads"
                                    className="w-full border p-2 rounded-lg"
                                />

                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => setOpen(false)}
                                        className="bg-gray-500"
                                    >
                                        Close
                                    </Button>
                                    <Button type="submit" >Save</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
