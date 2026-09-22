import React from 'react';
import { UserCheck, HeartPulse, ActivitySquare, CheckCircle, Eye } from 'lucide-react';

interface TabNavigationProps {
  currentTab: number;
  onSelectTab: (tabIndex: number) => void;
  activeView: 'form' | 'preview';
  onToggleView: (view: 'form' | 'preview') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  currentTab,
  onSelectTab,
  activeView,
  onToggleView,
}) => {
  const tabs = [
    {
      index: 1,
      id: 'tab-personal',
      title: '1. Dados Pessoais e Objetivos',
      shortTitle: '1. Pessoais & Objetivos',
      description: 'Identificação, rotina, motivos e experiência',
      icon: UserCheck,
    },
    {
      index: 2,
      id: 'tab-health',
      title: '2. Saúde e Hábitos',
      shortTitle: '2. Saúde & Hábitos',
      description: 'Histórico clínico, medicamentos, dor e esforço',
      icon: HeartPulse,
    },
    {
      index: 3,
      id: 'tab-assessment',
      title: '3. Avaliação Física e Planejamento',
      shortTitle: '3. Avaliação & Conduta',
      description: 'Postura, movimentos Pilates e planejamento',
      icon: ActivitySquare,
    },
  ];

  return (
    <nav aria-label="Passos da avaliação" className="mb-6 print:hidden">
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === 'form' && currentTab === tab.index;
            const isCompleted = activeView === 'form' && currentTab > tab.index;

            return (
              <button
                key={tab.index}
                id={tab.id}
                type="button"
                onClick={() => {
                  onSelectTab(tab.index);
                  if (activeView !== 'form') {
                    onToggleView('form');
                  }
                }}
                className={`flex items-start gap-3 p-3.5 rounded-xl text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-teal-50 to-emerald-50/70 border-2 border-teal-500 shadow-sm text-teal-950'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isActive ? 'text-teal-700' : 'text-slate-500'
                      }`}
                    >
                      Etapa {tab.index} de 3
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                    )}
                  </div>
                  <h3
                    className={`text-sm font-bold truncate mt-0.5 ${
                      isActive ? 'text-teal-950' : 'text-slate-800'
                    }`}
                  >
                    {tab.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
