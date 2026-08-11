import { RegionMap } from '../../components/Dashboard/Map';

import Navbar from '../../components/NavBar/Navbar';
import regionData from '../../assets/leaflet/regions';
import OverviewDetails from '../../components/Dashboard/OverviewDetails';


function DashboardPage() {
    return (
        <>
            <Navbar/>
            <OverviewDetails/>
            <RegionMap regions={regionData} />
        </>

    )
}

export default DashboardPage;