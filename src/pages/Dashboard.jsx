import CampaginCard from "../components/CampaginCard";
import { toast } from "sonner"
import Button from "../ui/Button"
import { Plus } from 'lucide-react';
import { useEffect, useState } from "react"
import { getCampaigns } from "../services/api"
import AddCampModal from "../components/AddCampModal";

export default function Dashboard() {
    const [camps, setCamps] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const data = await getCampaigns();
            setCamps(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className=' px-4 max-w-lg lg:max-w-7xl mx-auto py-8'>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <h1 className='text-3xl font-semibold'>Campaign Dashboard
                </h1>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Campaign
                </Button>
            </div>
            <AddCampModal open={open} setOpen={setOpen} setCamps={setCamps} />
            <div>
                <CampaginCard loading={loading} camps={camps} fetchCampaigns={fetchCampaigns} />
            </div>
        </div>
    )
}
