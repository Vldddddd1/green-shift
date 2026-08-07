import { RegionMap } from '../../components/Dashboard/Map';

const regionData = [
    { id: "EU-West-1", name: "EU West-1", lat: 20, lng: 0 },
    { id: "EU-West-2", name: "EU West-2", lat: 30, lng: 10 },
    { id: "US-East-1", name: "US East-1", lat: 40, lng: 20 }
];

function DashboardPage() {
    return(
        <RegionMap regions={regionData} />
    )
}

export default DashboardPage;