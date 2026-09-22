import React from 'react';
import { 
  Instagram, 
  Sparkles, 
  RotateCcw, 
  Printer, 
  Eye, 
  FileEdit,
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
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all shadow-xs print:hidden">
      {/* Top Subtle Status Line with Professional Info */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-teal-50 px-4 py-1.5 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            {/* Elegant Mini T Monogram badge in top bar */}
            <span className="w-4 h-4 rounded-full bg-emerald-400 text-teal-950 font-serif font-black text-[10px] flex items-center justify-center shadow-xs">
              T
            </span>
            <span>
              Profissional: <strong className="text-white font-semibold">Tássia</strong> — Educadora Física
            </span>
          </div>
          
          <a
            href="https://instagram.com/tassia.movimento"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-link"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 px-2.5 py-0.5 rounded-full text-white transition-all text-[11px] font-medium border border-white/15"
            title="Acessar o perfil no Instagram @tassia.movimento"
          >
            <Instagram className="w-3 h-3 text-pink-300" />
            <span>Instagram: <strong className="text-pink-100">@tassia.movimento</strong></span>
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Logo Monogram "T" & Title */}
          <div className="flex items-center gap-3.5">
            {/* Prominent "T" Logo representing Tássia */}
            <div 
              id="header-tassia-logo"
              className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-teal-900/15 border border-teal-600/30 shrink-0 select-none group transition-transform hover:scale-105"
            >
              {/* Refined Typography Monogram */}
              <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-xs">
                T
              </span>
              {/* Delicate movement accent dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-2xs"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  Pilates & Movimento
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {completionPercentage}% preenchido
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
                Ficha de Anamnese e Avaliação Inicial – Pilates
              </h1>
            </div>
          </div>

          {/* Clean Action Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                id="btn-view-form"
                onClick={() => onToggleView('form')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeView === 'form'
                    ? 'bg-white text-teal-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5 text-teal-700" />
                <span>Formulário</span>
              </button>
              
              <button
                type="button"
                id="btn-view-preview"
                onClick={() => onToggleView('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeView === 'preview'
                    ? 'bg-white text-teal-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-teal-700" />
                <span>Ver Documento</span>
              </button>
            </div>

            {/* Load Sample Demo */}
            <button
              type="button"
              id="btn-load-sample"
              onClick={onLoadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-200 cursor-pointer shadow-2xs"
              title="Carregar exemplo da aluna Mariana para demonstração"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Exemplo</span>
            </button>

            {/* Reset Form */}
            <button
              type="button"
              id="btn-reset-form"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-xl transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
              title="Limpar formulário"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Primary Action Button: Imprimir / Salvar PDF */}
            <button
              type="button"
              id="btn-header-print-save"
              onClick={onPrintPreview}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 active:scale-[0.98] shadow-sm shadow-teal-900/15 rounded-xl transition-all cursor-pointer"
              title="Abrir diálogo de impressão e salvar como PDF"
            >
              <Printer className="w-4 h-4 text-emerald-200" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="w-full bg-slate-100 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-600 to-emerald-500 h-1 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(4, completionPercentage)}%` }}
          />
        </div>
      </div>
    </header>
  );
};
