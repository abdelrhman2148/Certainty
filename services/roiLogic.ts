import { ROIInputs, ROIResults } from '../types';

export const calculateROI = (inputs: ROIInputs): ROIResults => {
  const {
    oneTimeCost,
    monthlyCost,
    hoursSavedPerMonth,
    hourlyRate,
    monthlyRevenueUplift,
    timeHorizonMonths,
  } = inputs;

  // Costs
  const totalMonthlyCost = monthlyCost * timeHorizonMonths;
  const totalCost = oneTimeCost + totalMonthlyCost;

  // Benefits
  const monthlySavings = hoursSavedPerMonth * hourlyRate;
  const totalSavings = monthlySavings * timeHorizonMonths;
  const totalRevenue = monthlyRevenueUplift * timeHorizonMonths;
  const totalBenefits = totalSavings + totalRevenue;

  // Net Logic
  const netProfit = totalBenefits - totalCost;
  
  // ROI %
  // Avoid division by zero
  const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  // Payback Period
  // (Initial Cost) / (Monthly Benefit - Monthly Cost)
  const monthlyNetBenefit = (monthlySavings + monthlyRevenueUplift) - monthlyCost;
  
  let paybackPeriodMonths: number | null = null;
  
  if (monthlyNetBenefit > 0) {
    paybackPeriodMonths = oneTimeCost / monthlyNetBenefit;
  } else if (oneTimeCost === 0 && monthlyNetBenefit > 0) {
      paybackPeriodMonths = 0; // Immediate payback if no upfront cost
  }

  return {
    totalCost,
    totalSavings,
    totalRevenue,
    totalBenefits,
    netProfit,
    roiPercentage,
    paybackPeriodMonths,
  };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatNumber = (val: number, decimals = 1) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  }).format(val);
};