//AWS data https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html
//coordiantes picked randomly within the country of the region
const regionData = [
    //EUROPE
    { id: "eu-central-1", name: "eu-central", geography: "Germany", lat: 48.425021189312666, lng: 12.12524597171188 },
    { id: "eu-central-2", name: "eu-central", geography: "Germany", lat: 51.185883459342605, lng: 8.749894626667752 },
    { id: "eu-central-3", name: "eu-central", geography: "Germany", lat: 53.11285204970809, lng: 13.535366958449208 },
    { id: "eu-central-4", name: "eu-central", geography: "Switzerland", lat: 47.19926048808229, lng: 9.108529193193565 },
    // { id: "euc2-az2", name: "eu-central-2", geography: "Switzerland", lat: 46.780398731995085, lng: 7.1095812767517135 },
    // { id: "eun1-az2", name: "eu-north-1", geography: "Sweden", lat: 62.57136967534173, lng: 14.979661539740862 },
    // { id: "eun1-az3", name: "eu-north-1", geography: "Sweden", lat: 56.8163398598078, lng: 15.70873086333921 },
    // { id: "eus1-az1", name: "eu-south-1", geography: "Italy", lat: 44.97103317260579, lng: 10.795127136838337 },
    // { id: "eus1-az2", name: "eu-south-1", geography: "Italy", lat: 42.61631465928036, lng: 12.100236281408344 },
    // { id: "eus1-az3", name: "eu-south-1", geography: "Italy", lat: 40.12156589409224, lng: 16.03110082012758 },
    // { id: "eus2-az1", name: "eu-south-2", geography: "Spain", lat: 42.171878588685225, lng: -0.18471003069347952 }, 
    // { id: "eus2-az2", name: "eu-south-2", geography: "Spain", lat: 37.87927358696817, lng: -5.8867940874228175 }, 
    // { id: "eus2-az3", name: "eu-south-2", geography: "Spain", lat: 43.16574271567276, lng: -5.311924596669878 }, 
    { id: "eu-west-1", name: "eu-west", geography: "Ireland", lat: 53.45733122482943, lng: -9.469877142136859 }, 
    { id: "eu-west-2", name: "eu-west", geography: "Ireland", lat: 52.37109319227783, lng: -6.66141461537709 },
    // { id: "euw2-az1", name: "eu-west-2", geography: "United Kingdom", lat: 50.89664257263105, lng: -0.02979650623206081 },
    { id: "eu-west-3", name: "eu-west", geography: "United Kingdom", lat: 53.3903899777078, lng: 0.058094115321656724 },
    // { id: "euw2-az3", name: "eu-west-2", geography: "United Kingdom", lat: 55.808099912353136, lng: -3.1222831651261784 },
    { id: "eu-west-4", name: "eu-west", geography: "France", lat: 48.92573449737775, lng: 6.659828960819835 },
    // { id: "euw3-az3", name: "eu-west-3", geography: "France", lat: 44.48090605135034, lng: 5.044147748478464 },

    //AFRICA
    { id: "af-south-1", name: "af-south", geography: "South Africa", lat: -32.70077638248971, lng: 19.712896651547755 },
    { id: "af-south-2", name: "af-south", geography: "South Africa", lat: -28.000602935630173, lng: 23.843755864572444 },
    { id: "af-south-3", name: "af-south", geography: "South Africa", lat: -23.731441583440642, lng: 30.171880616440056 },

    //US-EAST
    { id: "us-east-1", name: "us-east", geography: "New York USA", lat: 41.87172621075909, lng: -74.908040585001 },
    { id: "us-east-2", name: "us-east", geography: "Florida USA", lat: 28.88965459191704, lng: -82.2767112804786 },
    { id: "us-east-3", name: "us-east", geography: "Kentucky USA", lat: 36.8657164533312, lng: -83.37417288166236 },
    { id: "us-east-4", name: "us-east", geography: "Michigan USA", lat: 43.143002119335655, lng: -84.52389455909298 },

    //US-WEST
    { id: "us-west-1", name: "us-west", geography: "Arizona USA", lat: 35.13238058470228, lng: -112.16947494900204 },
    { id: "us-west-2", name: "us-west", geography: "Idaho USA", lat: 42.529855000625915, lng: -113.8417973889011 },
    { id: "us-west-3", name: "us-west", geography: "California USA", lat: 35.72853078575619, lng: -118.54520425111721 },
    { id: "us-west-4", name: "us-west", geography: "Washington USA", lat: 46.658023305966886, lng: -118.17938371738931 },

    //ASIA + PACIFIC
    { id: "ap-northeast-1", name: "ap-northeast", geography: "Japan", lat: 34.85638214046611, lng: 132.91468495461686 },
    { id: "ap-northeast-2", name: "ap-northeast", geography: "Japan", lat: 38.787177527384856, lng: 140.64917623915002 },
    { id: "ap-northeast-3", name: "ap-northeast", geography: "Japan", lat: 44.14712680757399, lng: 142.58279906028332 },
    { id: "ap-south-1", name: "ap-south", geography: "India", lat: 22.335036845202456, lng: 73.37645543431293 },
    { id: "ap-south-2", name: "ap-south", geography: "India", lat: 27.68276104724875, lng: 80.46133364769298 },
    { id: "ap-south-3", name: "ap-south", geography: "India", lat: 12.506112007912082, lng: 78.96978033961297 },
    { id: "ap-southeast-1", name: "ap-southeast", geography: "Australia", lat: -27.66683515162605, lng: 115.42602006379327 },
    { id: "ap-southeast-2", name: "ap-southeast", geography: "Australia", lat: -30.06138872530054, lng: 150.34703437679306 },
];

export default regionData;
