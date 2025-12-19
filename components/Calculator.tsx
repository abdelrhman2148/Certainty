import React, { useState, useEffect } from 'react';
import { ROIInputs, ROIResults } from '../types';
import { calculateROI, formatCurrency, formatNumber } from '../services/roiLogic';
import { generateSalesCopy } from '../services/geminiService';
import { InputGroup } from './InputGroup';
import { ArrowRight, RefreshCw, Lock, Printer, Save, Sparkles } from 'lucide-react';

interface CalculatorProps {
  onShowPricing: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onShowPricing }) => {
  const [inputs, setInputs] = useState<ROIInputs>({
    oneTimeCost: 5000,
    monthlyCost: 500,
    hoursSavedPerMonth: 20,
    hourlyRate: 100,
    monthlyRevenueUplift: 2000,
    timeHorizonMonths: 12,
  });

  const [results, setResults] = useState<ROIResults>(calculateROI(inputs));
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    setResults(calculateROI(inputs));
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateCopy = async () => {
    setLoadingAi(true);
    const text = await generateSalesCopy(inputs, results);
    setAiSummary(text);
    setLoadingAi(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 no-print">
        <h2 className="text-2xl font-bold text-slate-900">ROI Projector</h2>
        <div className="flex gap-2">
          <button onClick={onShowPricing} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            <Save className="w-4 h-4" />
            Save Proposal
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            <Printer className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 space-y-6 no-print">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">1</span>
              Investment
            </h3>
            <InputGroup 
              label="One-time Project Cost" 
              value={inputs.oneTimeCost} 
              onChange={(v) => handleInputChange('oneTimeCost', v)}
              prefix="$"
            />
            <InputGroup 
              label="Monthly Retainer / Software Cost" 
              value={inputs.monthlyCost} 
              onChange={(v) => handleInputChange('monthlyCost', v)}
              prefix="$"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">2</span>
              Impact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                label="Hours Saved / Mo" 
                value={inputs.hoursSavedPerMonth} 
                onChange={(v) => handleInputChange('hoursSavedPerMonth', v)}
                suffix="hrs"
              />
              <InputGroup 
                label="Cost Per Hour" 
                value={inputs.hourlyRate} 
                onChange={(v) => handleInputChange('hourlyRate', v)}
                prefix="$"
              />
            </div>
            <InputGroup 
              label="Monthly Revenue Increase" 
              value={inputs.monthlyRevenueUplift} 
              onChange={(v) => handleInputChange('monthlyRevenueUplift', v)}
              prefix="$"
              helpText="Conservative estimate of new revenue generated."
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">3</span>
              Timeline
            </h3>
            <InputGroup 
              label="Forecast Duration" 
              value={inputs.timeHorizonMonths} 
              onChange={(v) => handleInputChange('timeHorizonMonths', v)}
              suffix="months"
            />
          </div>
        </div>

        {/* OUTPUTS COLUMN */}
        <div className="lg:col-span-7">
          <div className="sticky top-6 space-y-6">
            
            {/* Main KPI Cards */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                 <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Proposal Forecast</h3>
                 <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                   {inputs.timeHorizonMonths}-Month Outlook
                 </span>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Investment</p>
                  <p className="text-3xl font-bold text-slate-900">{formatCurrency(results.totalCost)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Payback Period</p>
                    <div className="flex items-baseline gap-2">
                       <p className={`text-2xl font-bold ${results.paybackPeriodMonths && results.paybackPeriodMonths <= 6 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {results.paybackPeriodMonths !== null 
                          ? formatNumber(results.paybackPeriodMonths) 
                          : "∞"}
                      </p>
                      <span className="text-sm text-slate-500">months</span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                  <p className="text-sm text-indigo-800 font-medium mb-1">Projected Net ROI</p>
                  <p className="text-4xl font-bold text-indigo-700">{formatNumber(results.roiPercentage)}%</p>
                  <p className="text-sm text-indigo-600 mt-2">
                    {formatCurrency(results.netProfit)} net profit
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown Table */}
              <div className="px-8 pb-8">
                 <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <tbody className="divide-y divide-slate-100">
                        <tr className="bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-600">Metric</td>
                          <td className="px-4 py-3 font-medium text-slate-600 text-right">Value</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-600">Labor Savings</td>
                          <td className="px-4 py-3 text-slate-900 text-right font-medium">{formatCurrency(results.totalSavings)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-600">Revenue Uplift</td>
                          <td className="px-4 py-3 text-slate-900 text-right font-medium">{formatCurrency(results.totalRevenue)}</td>
                        </tr>
                        <tr className="bg-indigo-50/50">
                          <td className="px-4 py-3 font-bold text-slate-800">Total Value Created</td>
                          <td className="px-4 py-3 font-bold text-indigo-700 text-right">{formatCurrency(results.totalBenefits)}</td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Executive Summary
                </h3>
                <button 
                  onClick={handleGenerateCopy}
                  disabled={loadingAi}
                  className="no-print text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 disabled:opacity-50"
                >
                  {loadingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {aiSummary ? 'Regenerate' : 'Generate with AI'}
                </button>
              </div>
              
              <div className="prose prose-sm max-w-none">
                {aiSummary ? (
                   <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-slate-800 italic">
                      "{aiSummary}"
                   </div>
                ) : (
                  <div className="text-slate-400 text-sm italic border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                    Click "Generate" to create a persuasive ROI argument for your proposal based on the numbers above.
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">
                Calculations assume conservative estimates. Actual results may vary based on execution speed.
              </p>
            </div>

          </div>
        </div>
      </div>
      
      {/* Print Only Footer */}
      <div className="print-only hidden mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>Generated by Certainty ROI Calculator</p>
      </div>
    </div>
  );
};