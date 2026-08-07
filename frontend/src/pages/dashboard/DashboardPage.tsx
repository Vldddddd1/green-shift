import { RegionMap } from '../../components/Dashboard/Map';

import regionData from '../../assets/leaflet/regions';

import BackButton from '../../components/NavBar/BackButton';

function DashboardPage() {
    return (
        <>
            <BackButton />
            <RegionMap regions={regionData} />
        </>

    )
}

export default DashboardPage;