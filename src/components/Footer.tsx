import React from 'react';
import { Instagram, FileText, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200/80 py-8 px-4 text-center print:hidden">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-sm font-bold text-slate-800">
            Ficha de Anamnese e Avaliação Inicial – Pilates
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Profissional: <strong className="text-teal-900">Tássia - Educadora Física</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/tassia.movimento"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-instagram-link"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-teal-500/10 hover:from-pink-500/20 hover:to-teal-500/20 text-slate-800 font-semibold text-xs rounded-full border border-pink-200/60 transition-all shadow-2xs hover:shadow-xs group"
          >
            <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>Instagram: <strong className="text-pink-700">@tassia.movimento</strong></span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 font-medium">
        <p>Sistema especializado de prescrição, anamnese e avaliação motora para Pilates.</p>
        <p className="mt-1 sm:mt-0">Documentos salvos e gerados com segurança no seu navegador.</p>
      </div>
    </footer>
  );
};
