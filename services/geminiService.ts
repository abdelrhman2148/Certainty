import { GoogleGenAI } from "@google/genai";
import { ROIInputs, ROIResults } from "../types";
import { formatCurrency, formatNumber } from "./roiLogic";

export const generateSalesCopy = async (inputs: ROIInputs, results: ROIResults): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are an expert B2B sales copywriter. 
      Generate a single, punchy, "Plain English" ROI summary paragraph (max 60 words) for a proposal.
      
      The goal is to convince a buyer that this investment pays for itself quickly.
      Be conservative but confident. Focus on the "Cost of Inaction" vs the "Gain".
      
      Here is the data:
      - Investment: ${formatCurrency(results.totalCost)} over ${inputs.timeHorizonMonths} months.
      - Payback Period: ${results.paybackPeriodMonths ? formatNumber(results.paybackPeriodMonths) + ' months' : 'Never'}.
      - Total Value Created: ${formatCurrency(results.totalBenefits)}.
      - Net Profit: ${formatCurrency(results.netProfit)}.
      - ROI: ${formatNumber(results.roiPercentage)}%.
      
      Do not use markdown. Do not use bullet points. Just one strong paragraph.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI summary. Please try again.";
  }
};