import { RegionMap } from '../../components/Dashboard/Map';

import Navbar from '../../components/NavBar/Navbar';
import regionData from '../../assets/leaflet/regions';
import { OverviewDetails } from '../../components/Dashboard/OverviewDetails';
import { useLiveMetrics } from '../../hooks/liveMetrics';


function DashboardPage() {
    const { metrics } = useLiveMetrics();

    return (
        <>
            <Navbar/>
            <OverviewDetails/>
            <RegionMap regions={regionData} servers={metrics.servers} />
        </>

    )
}

export default DashboardPage;