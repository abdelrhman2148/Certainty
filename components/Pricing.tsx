import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-600 hover:text-indigo-600 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Calculator
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Close Deals Faster with Certainty
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            Choose the plan that fits your sales volume.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Starter</h3>
            <p className="mt-4 text-slate-500">For trying it out.</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="ml-3 text-slate-600">Unlimited Calculations</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="ml-3 text-slate-600">Basic Web View</span>
              </li>
              <li className="flex items-start opacity-50">
                <Check className="w-5 h-5 text-slate-300 shrink-0" />
                <span className="ml-3 text-slate-400">PDF Export (Watermarked)</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-slate-100 text-slate-800 font-semibold py-3 rounded-lg hover:bg-slate-200 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-600 p-8 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
               Best Value
             </div>
            <h3 className="text-lg font-semibold text-slate-900">Pro Consultant</h3>
            <p className="mt-4 text-slate-500">For serious deal closers.</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-slate-900">$19</span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="ml-3 text-slate-600">Unlimited PDF Exports</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="ml-3 text-slate-600">Save Proposals</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="ml-3 text-slate-600">No Watermarks</span>
              </li>
               <li className="flex items-start">
                <Check className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="ml-3 text-slate-600">AI Copy Generation</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Upgrade to Pro
            </button>
          </div>

          {/* Agency Tier */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900">Agency</h3>
            <p className="mt-4 text-slate-500">For sales teams & white-labeling.</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-slate-900">$49</span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="ml-3 text-slate-600">Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="ml-3 text-slate-600">White-label PDF (Your Logo)</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="ml-3 text-slate-600">Team Account (5 users)</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-900 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};