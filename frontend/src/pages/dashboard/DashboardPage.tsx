import { useState } from 'react';
import { RegionMap } from '../../components/Dashboard/Map';

import Navbar from '../../components/Navbar';
import regionData from '../../assets/leaflet/regions';
import { OverviewDetails } from '../../components/Dashboard/OverviewDetails';
import { useLiveMetrics } from '../../hooks/liveMetrics';


function DashboardPage() {
    const { metrics } = useLiveMetrics();
    const [showOverviewMobile, setShowOverviewMobile] = useState(false);

    return (
        <>
            <Navbar onToggleOverview={() => setShowOverviewMobile(v => !v)}/>
            <OverviewDetails visible = {showOverviewMobile}/>
            <RegionMap regions={regionData} servers={metrics.servers} />
        </>

    )
}

export default DashboardPage;