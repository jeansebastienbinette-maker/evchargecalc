export interface ChargingCosts {
  costPerMile: number;
  costPerFullCharge: number;
  monthlyHomeCost: number;
  annualHomeCost: number;
  monthlyPublicL2Cost: number;
  annualPublicL2Cost: number;
  monthlyDCFastCost: number;
  annualDCFastCost: number;
  monthlyGasCost: number;
  annualGasCost: number;
  annualSavingsVsGas: number;
  kwhPer100Miles: number;
  milesPerMonth: number;
  dcFastChargeTime: number;
}

export function calculateCosts(
  efficiency: number,
  batteryKwh: number,
  electricityRate: number,
  gasPrice: number,
  monthlyMiles: number = 1000,
  gasMPG: number = 28,
  dcRate: number = 0.49,
  dcChargeSpeedKw: number = 150
): ChargingCosts {
  const kwhPerMile = 1 / efficiency;
  const kwhPer100Miles = 100 / efficiency;
  const publicL2Rate = electricityRate * 1.8;

  const costPerMile = kwhPerMile * electricityRate;
  const costPerFullCharge = batteryKwh * electricityRate;

  const monthlyHomeCost = costPerMile * monthlyMiles;
  const annualHomeCost = monthlyHomeCost * 12;

  const monthlyPublicL2Cost = kwhPerMile * publicL2Rate * monthlyMiles;
  const annualPublicL2Cost = monthlyPublicL2Cost * 12;

  const monthlyDCFastCost = kwhPerMile * dcRate * monthlyMiles;
  const annualDCFastCost = monthlyDCFastCost * 12;

  const gasCostPerMile = gasPrice / gasMPG;
  const monthlyGasCost = gasCostPerMile * monthlyMiles;
  const annualGasCost = monthlyGasCost * 12;

  const annualSavingsVsGas = annualGasCost - annualHomeCost;

  const avgChargeRate = dcChargeSpeedKw * 0.7;
  const kwhToCharge = batteryKwh * 0.7;
  const dcFastChargeTime = Math.round((kwhToCharge / avgChargeRate) * 60);

  return {
    costPerMile,
    costPerFullCharge,
    monthlyHomeCost,
    annualHomeCost,
    monthlyPublicL2Cost,
    annualPublicL2Cost,
    monthlyDCFastCost,
    annualDCFastCost,
    monthlyGasCost,
    annualGasCost,
    annualSavingsVsGas,
    kwhPer100Miles,
    milesPerMonth: monthlyMiles,
    dcFastChargeTime,
  };
}

export function formatCurrency(value: number, decimals: number = 0): string {
  return '$' + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCurrencyPrecise(value: number): string {
  if (value < 0.10) return '$' + value.toFixed(3);
  return '$' + value.toFixed(2);
}
