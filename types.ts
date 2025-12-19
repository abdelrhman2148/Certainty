export interface ROIInputs {
  oneTimeCost: number;
  monthlyCost: number;
  hoursSavedPerMonth: number;
  hourlyRate: number;
  monthlyRevenueUplift: number;
  timeHorizonMonths: number;
}

export interface ROIResults {
  totalCost: number;
  totalSavings: number;
  totalRevenue: number;
  totalBenefits: number;
  netProfit: number;
  roiPercentage: number;
  paybackPeriodMonths: number | null; // Null means never pays back
}

export enum AppView {
  LANDING = 'LANDING',
  CALCULATOR = 'CALCULATOR',
  PRICING = 'PRICING'
}