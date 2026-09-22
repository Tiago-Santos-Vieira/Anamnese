import React from 'react';
import { 
  FileCheck2, 
  Instagram, 
  Sparkles, 
  RotateCcw, 
  Printer, 
  FileDown, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';

interface HeaderProps {
  currentTab: number;
  totalSteps: number;
  completionPercentage: number;
  onPrintPreview: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  activeView: 'form' | 'preview';
  onToggleView: (view: 'form' | 'preview') => void;
}

export const Header: React.FC<HeaderProps> = ({
  completionPercentage,
  onPrintPreview,
  onLoadSample,
  onReset,
  activeView,
  onToggleView,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-teal-100 sticky top-0 z-40 transition-all shadow-xs print:hidden">
      {/* Top Banner with Professional Info */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-teal-50 px-4 py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Profissional: <strong className="text-white">Tássia</strong> — Educadora Física</span>
          </div>
          
          <a
            href="https://instagram.com/tassia.movimento"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-link"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 px-2.5 py-1 rounded-full text-white transition-all text-xs font-medium border border-white/20"
            title="Acessar o perfil no Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-300" />
            <span>Instagram: <strong>@tassia.movimento</strong></span>
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                  Método Pilates
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {completionPercentage}% preenchido
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                Ficha de Anamnese e Avaliação Inicial – Pilates
              </h1>
            </div>
          </div>

          {/* Quick Actions & PDF buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
            {/* View toggle (Form vs Preview) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                id="btn-view-form"
                onClick={() => onToggleView('form')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeView === 'form'
                    ? 'bg-white text-teal-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Preenchimento
              </button>
              <button
                type="button"
                id="btn-view-preview"
                onClick={() => onToggleView('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeView === 'preview'
                    ? 'bg-white text-teal-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Documento</span>
              </button>
            </div>

            {/* Load Sample Data Button */}
            <button
              type="button"
              id="btn-load-sample"
              onClick={onLoadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-all border border-slate-200"
              title="Preencher com dados de exemplo da aluna Mariana para testes rápidos"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Exemplo Demonstrativo</span>
              <span className="sm:hidden">Exemplo</span>
            </button>

            {/* Reset Button */}
            <button
              type="button"
              id="btn-reset-form"
              onClick={onReset}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
              title="Limpar formulário"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Action: Imprimir / Salvar PDF */}
            <button
              type="button"
              id="btn-header-print-save"
              onClick={onPrintPreview}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] shadow-sm shadow-teal-700/20 rounded-xl transition-all cursor-pointer"
              title="Abrir diálogo de impressão e salvar como PDF"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(5, completionPercentage)}%` }}
          />
        </div>
      </div>
    </header>
  );
};
