
// Mock Database of Coordinates (South Korea Major Cities/Districts)
// Origin: Suwon (approx. 37.2636, 127.0286)
const ORIGIN = { lat: 37.2636, lng: 127.0286 };

const LOCATIONS: Record<string, { lat: number; lng: number }> = {
    '서울': { lat: 37.5665, lng: 126.9780 },
    '강남': { lat: 37.5172, lng: 127.0473 },
    '인천': { lat: 37.4563, lng: 126.7052 },
    '수원': { lat: 37.2636, lng: 127.0286 },
    '성남': { lat: 37.4209, lng: 127.1265 },
    '용인': { lat: 37.2411, lng: 127.1776 },
    '화성': { lat: 37.1995, lng: 126.8315 },
    '평택': { lat: 36.9921, lng: 127.1129 },
    '안산': { lat: 37.3219, lng: 126.8309 },
    '안양': { lat: 37.3943, lng: 126.9568 },
    '천안': { lat: 36.8151, lng: 127.1139 },
    '대전': { lat: 36.3504, lng: 127.3845 },
    '청주': { lat: 36.6424, lng: 127.4890 },
    '세종': { lat: 36.4800, lng: 127.2890 },
    '대구': { lat: 35.8714, lng: 128.6014 },
    '부산': { lat: 35.1796, lng: 129.0756 },
    '울산': { lat: 35.5384, lng: 129.3114 },
    '광주': { lat: 35.1595, lng: 126.8526 },
    '전주': { lat: 35.8242, lng: 127.1480 },
    '강릉': { lat: 37.7519, lng: 128.8760 },
    '원주': { lat: 37.3422, lng: 127.9202 },
    '춘천': { lat: 37.8813, lng: 127.7298 },
    '제주': { lat: 33.4996, lng: 126.5312 },
};

// Haversine Formula for straight line distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export function calculateLogistics(volumeStr: string, shape: string, quantity: number, address: string) {
    // 1. Parse Address to find best match
    // Simple substring match for now. Real world would use Geocoding API.
    let bestMatchKey = '서울'; // Default fallback

    // Check for exact matches first
    for (const key of Object.keys(LOCATIONS)) {
        if (address.includes(key)) {
            bestMatchKey = key;
            break;
        }
    }

    const dest = LOCATIONS[bestMatchKey];
    // Tortuosity Factor 1.3 for Road Distance estimate
    const roadDistance = Math.ceil(getDistanceFromLatLonInKm(ORIGIN.lat, ORIGIN.lng, dest.lat, dest.lng) * 1.3);

    // 2. Determine Truck Type & Count
    // Logic:
    // 1 ton Truck: Deck 2.8m x 1.6m. Max Payload 1000kg.
    // 5 ton Truck: Deck 6.2m x 2.3m. Max Payload 5000kg.

    const volume = parseFloat(volumeStr); // e.g., 0.6, 1, 2, 3, 5, 10
    let truckType: '1ton' | '5ton' = '1ton';
    let truckCount = 1;

    // Dimensions Estimation (Diameter in Meters)
    // 200L ~ 0.6m
    // 1T ~ 1.1m
    // 2T ~ 1.4m
    // 3T ~ 1.6m (Max for 1 ton truck width)
    // 5T ~ 2.0m

    if (volume > 3.0) {
        truckType = '5ton'; // Anything > 3T needs wider deck
    } else if (volume === 3.0) {
        // 3 Ton fits tightly in 1 ton truck (1.6m width). 
        // Can take 1 per 1 ton truck.
        truckType = '1ton';
    } else {
        truckType = '1ton';
    }

    // Capacity Calculation
    // How many units fit in one truck?
    let unitsPerTruck = 1;
    if (truckType === '1ton') {
        if (volume <= 0.6) unitsPerTruck = 6;
        else if (volume <= 1.0) unitsPerTruck = 3; // Approx
        else if (volume <= 2.0) unitsPerTruck = 2; // Maybe 1 depending on height? Let's say 2 for <2T square
        else unitsPerTruck = 1; // 2T, 3T -> 1 unit per truck
    } else {
        // 5 Ton Truck (6.2m length)
        if (volume <= 5.0) unitsPerTruck = 3;
        else unitsPerTruck = 2; // 6T, 8T, 10T large tanks
    }

    truckCount = Math.ceil(quantity / unitsPerTruck);

    // 3. Pricing
    // 1 Ton Rates: Base 40k + 1000krw/km approx? Or use table.
    // 5 Ton Rates: Base 120k + ...
    // Using simplified linear regression from typical freight rates.

    let costPerTruck = 0;

    if (truckType === '1ton') {
        if (roadDistance < 10) costPerTruck = 40000;
        else if (roadDistance < 30) costPerTruck = 50000;
        else costPerTruck = 50000 + (roadDistance - 30) * 800; // 800 won per km after 30km
    } else {
        // 5 Ton is roughly 2.5x price
        if (roadDistance < 10) costPerTruck = 120000;
        else if (roadDistance < 30) costPerTruck = 150000;
        else costPerTruck = 150000 + (roadDistance - 30) * 1500;
    }

    // Round to nearest 5000
    costPerTruck = Math.ceil(costPerTruck / 5000) * 5000;

    const totalShipping = costPerTruck * truckCount;

    return {
        distance: roadDistance,
        truckType,
        truckCount,
        costPerTruck,
        totalShipping,
        unitsPerTruck
    };
}
