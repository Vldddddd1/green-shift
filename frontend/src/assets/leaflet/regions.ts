//AWS data https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html
//coordiantes picked randomly within the country of the region
const regionData = [
    { id: "euc1-az1", name: "eu-central-1", geography: "Germany", lat: 48.425021189312666, lng: 12.12524597171188 },
    { id: "euc1-az2", name: "eu-central-1", geography: "Germany", lat: 51.185883459342605, lng: 8.749894626667752 },
    { id: "euc1-az3", name: "eu-central-1", geography: "Germany", lat: 53.11285204970809, lng: 13.535366958449208 },
    { id: "euc2-az1", name: "eu-central-2", geography: "Switzerland", lat: 47.19926048808229, lng: 9.108529193193565 },
    { id: "euc2-az2", name: "eu-central-2", geography: "Switzerland", lat: 46.780398731995085, lng: 7.1095812767517135 },
    { id: "euc2-az3", name: "eu-central-2", geography: "Switzerland", lat: 46.295098932088116, lng: 8.8080337547742 },
    { id: "eun1-az1", name: "eu-north-1", geography: "Sweden", lat: 58.72119717321712, lng: 15.476132264085901 },
    { id: "eun1-az2", name: "eu-north-1", geography: "Sweden", lat: 62.57136967534173, lng: 14.979661539740862 },
    { id: "eun1-az3", name: "eu-north-1", geography: "Sweden", lat: 56.8163398598078, lng: 15.70873086333921 },
    { id: "eus1-az1", name: "eu-south-1", geography: "Italy", lat: 44.97103317260579, lng: 10.795127136838337 },
    { id: "eus1-az2", name: "eu-south-1", geography: "Italy", lat: 42.61631465928036, lng: 12.100236281408344 },
    { id: "eus1-az3", name: "eu-south-1", geography: "Italy", lat: 40.12156589409224, lng: 16.03110082012758 },
    { id: "eus2-az1", name: "eu-south-2", geography: "Spain", lat: 42.171878588685225, lng: -0.18471003069347952 }, 
    { id: "eus2-az2", name: "eu-south-2", geography: "Spain", lat: 37.87927358696817, lng: -5.8867940874228175 }, 
    { id: "eus2-az3", name: "eu-south-2", geography: "Spain", lat: 43.16574271567276, lng: -5.311924596669878 }, 
    { id: "euw1-az1", name: "eu-west-1", geography: "Ireland", lat: 53.45733122482943, lng: -9.469877142136859 }, 
    { id: "euw1-az2", name: "eu-west-1", geography: "Ireland", lat: 53.86243617608214, lng: -6.7353215239760305 }, 
    { id: "euw1-az3", name: "eu-west-1", geography: "Ireland", lat: 52.37109319227783, lng: -6.66141461537709 },
    { id: "euw2-az1", name: "eu-west-2", geography: "United Kingdom", lat: 50.89664257263105, lng: -0.02979650623206081 },
    { id: "euw2-az2", name: "eu-west-2", geography: "United Kingdom", lat: 53.3903899777078, lng: 0.058094115321656724 },
    { id: "euw2-az3", name: "eu-west-2", geography: "United Kingdom", lat: 55.808099912353136, lng: -3.1222831651261784 },
    { id: "euw3-az1", name: "eu-west-3", geography: "France", lat: 48.92573449737775, lng: 6.659828960819835 },
    { id: "euw3-az2", name: "eu-west-3", geography: "France", lat: 46.625870214752105, lng: -0.8917520568493744 },
    { id: "euw3-az3", name: "eu-west-3", geography: "France", lat: 44.48090605135034, lng: 5.044147748478464 }
];

export default regionData;