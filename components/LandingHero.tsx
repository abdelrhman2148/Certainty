import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Lock } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
              New: AI-Powered Proposal Summaries. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Turn your proposal into numbers buyers believe.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              You sell certainty. Not math. Not spreadsheets. 
              Instantly generate a trustworthy ROI analysis that helps you close $5k - $100k deals faster.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={onGetStarted}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
              >
                Create ROI Calculator <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#features" className="text-sm font-semibold leading-6 text-slate-900">
                See features <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Social Proof / Features Lite */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8 text-center">
             <div className="flex flex-col items-center">
                <div className="rounded-lg bg-indigo-50 p-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Logic, Not Fluff</h3>
                <p className="mt-2 text-sm text-slate-500">Show payback period and net profit instantly.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="rounded-lg bg-indigo-50 p-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Trust Beats Flash</h3>
                <p className="mt-2 text-sm text-slate-500">Simple, conservative formats buyers accept.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="rounded-lg bg-indigo-50 p-3 mb-4">
                  <Lock className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Secure & Private</h3>
                <p className="mt-2 text-sm text-slate-500">Your deal data never leaves your browser.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};