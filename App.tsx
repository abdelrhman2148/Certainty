import React, { useState } from 'react';
import { AppView } from './types';
import { LandingHero } from './components/LandingHero';
import { Calculator } from './components/Calculator';
import { Pricing } from './components/Pricing';
import { Calculator as CalcIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingHero onGetStarted={() => setCurrentView(AppView.CALCULATOR)} />;
      case AppView.CALCULATOR:
        return <Calculator onShowPricing={() => setCurrentView(AppView.PRICING)} />;
      case AppView.PRICING:
        return <Pricing onBack={() => setCurrentView(AppView.CALCULATOR)} />;
      default:
        return <LandingHero onGetStarted={() => setCurrentView(AppView.CALCULATOR)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(AppView.LANDING)}>
              <CalcIcon className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="font-bold text-xl text-slate-900">Certainty</span>
            </div>
            <div className="flex items-center space-x-4">
               {currentView !== AppView.PRICING && (
                 <button 
                  onClick={() => setCurrentView(AppView.PRICING)}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                 >
                   Pricing
                 </button>
               )}
               {currentView === AppView.LANDING && (
                 <button 
                  onClick={() => setCurrentView(AppView.CALCULATOR)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                 >
                   Open Calculator
                 </button>
               )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-sm text-slate-400">© 2024 Certainty ROI. Build trust, close deals.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;