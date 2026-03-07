export const SHIPPING_RATES = [
    { km: 10, cost: 40000 },
    { km: 20, cost: 50000 },
    { km: 30, cost: 60000 },
    { km: 60, cost: 70000 },
    { km: 90, cost: 80000 },
    { km: 110, cost: 90000 },
    { km: 130, cost: 100000 },
    { km: 150, cost: 110000 },
    { km: 170, cost: 120000 },
    { km: 200, cost: 140000 },
    { km: 250, cost: 170000 },
    { km: 300, cost: 180000 },
    { km: 350, cost: 220000 },
    { km: 400, cost: 250000 },
];

export const calculateShippingCost = (items: { name: string, quantity: number }[], address: string) => {
    if (!address) return 0;

    // Origin: Suwon (JinYang PVC)
    let distance = 20; // Default local
    if (address.includes('서울') || address.includes('인천')) distance = 40;
    else if (address.includes('평택') || address.includes('화성')) distance = 30;
    else if (address.includes('천안') || address.includes('대전')) distance = 100;
    else if (address.includes('대구') || address.includes('부산') || address.includes('광주')) distance = 250;
    else if (address.includes('강원') || address.includes('춘천') || address.includes('원주')) distance = 150;
    else if (address.includes('제주')) distance = 400; // Estimated for logistics

    let totalTruckUnitsNeeded = 0;

    items.forEach(item => {
        const name = item.name;

        // Robust tonnage extraction (handles "10", "10톤", "0.2톤", etc.)
        const tonnageMatch = name.match(/(\d+(\.\d+)?)/);
        const tonnageValue = tonnageMatch ? parseFloat(tonnageMatch[1]) : 0;
        const isSquare = name.includes('사각') || name.includes('Square');

        let unitsPerItem = 1;

        if (tonnageValue >= 8) {
            // 8톤, 10톤 -> 5톤 축차 이상 (3.5x multiplier)
            unitsPerItem = 3.5;
        } else if (tonnageValue >= 5) {
            // 5톤, 6톤 -> 3.5톤~5톤 차량 (2.5x multiplier)
            unitsPerItem = 2.5;
        } else if (tonnageValue >= 2) {
            // 2톤, 3톤 -> 1톤 전전차 또는 1.4톤 (1.2x)
            unitsPerItem = 1.2;
        } else if (tonnageValue >= 1) {
            // 1톤
            unitsPerItem = isSquare ? 0.125 : 0.25;
        } else if (tonnageValue > 0) {
            // 0.2톤 ~ 0.8톤 (Treat as small items)
            unitsPerItem = 0.125;
        } else {
            // Smaller tanks/fittings
            unitsPerItem = 0.1;
        }

        totalTruckUnitsNeeded += (unitsPerItem * item.quantity);
    });

    if (totalTruckUnitsNeeded === 0) return 0;

    const baseRate = SHIPPING_RATES.find(r => distance <= r.km) || SHIPPING_RATES[SHIPPING_RATES.length - 1];

    // Calculate total cost
    let finalCost = baseRate.cost * Math.ceil(totalTruckUnitsNeeded);

    // Apply Minimum Shipping Fee (e.g., 80,000 KRW for non-local)
    const isLocalSuwon = address.includes('수원');
    const minFee = isLocalSuwon ? 50000 : 90000;

    return Math.max(minFee, finalCost);
};
