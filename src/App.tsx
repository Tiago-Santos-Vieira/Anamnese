import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';
import { AnamneseFormState } from './types';
import { getInitialAnamneseState, SAMPLE_ANAMNESE_DATA } from './data/initialData';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { Step1PersonalAndGoals } from './components/steps/Step1PersonalAndGoals';
import { Step2HealthAndHabits } from './components/steps/Step2HealthAndHabits';
import { Step3PhysicalAssessment } from './components/steps/Step3PhysicalAssessment';
import { PrintableDocument } from './components/PrintableDocument';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'tassia_pilates_anamnese_draft_v1';

export default function App() {
  const [formData, setFormData] = useState<AnamneseFormState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao ler rascunho salvo:', e);
    }
    return getInitialAnamneseState();
  });

  const [currentTab, setCurrentTab] = useState<number>(1);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Auto-save to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Não foi possível salvar rascunho localmente', e);
    }
  }, [formData]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Calculate completion percentage
  const calculateCompletion = (): number => {
    let filled = 0;
    let total = 14;

    if (formData.aluno.nome) filled++;
    if (formData.aluno.telefone) filled++;
    if (formData.aluno.dataNascimento || formData.aluno.idade) filled++;
    if (formData.objetivos.motivoPrincipal?.length) filled++;
    if (formData.objetivos.oQueGostariaMelhorar) filled++;
    if (formData.experiencia.praticaAtividade) filled++;
    if (formData.experiencia.jaFezPilates) filled++;
    if (formData.saude.cirurgias || formData.saude.condicoes.outrasCondicoes || Object.values(formData.saude.condicoes).some(v => v === true)) filled++;
    if (formData.medicamentos.usaMedicamentoContinuo) filled++;
    if (formData.dor.senteDor) filled++;
    if (formData.funcional.posturaCabeca || formData.funcional.posturaColuna) filled++;
    if (formData.movimentos.some((m) => m.observacoes || m.status !== 'realiza')) filled++;
    if (formData.planejamento.objetivosPrioritarios) filled++;
    if (formData.declaracao.alunoCiente) filled++;

    return Math.round((filled / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  // Handlers for partial updates
  const updateAluno = (fields: Partial<AnamneseFormState['aluno']>) => {
    setFormData((prev) => ({ ...prev, aluno: { ...prev.aluno, ...fields } }));
  };

  const updateObjetivos = (fields: Partial<AnamneseFormState['objetivos']>) => {
    setFormData((prev) => ({ ...prev, objetivos: { ...prev.objetivos, ...fields } }));
  };

  const updateExperiencia = (fields: Partial<AnamneseFormState['experiencia']>) => {
    setFormData((prev) => ({ ...prev, experiencia: { ...prev.experiencia, ...fields } }));
  };

  const updateSaude = (fields: Partial<AnamneseFormState['saude']>) => {
    setFormData((prev) => ({ ...prev, saude: { ...prev.saude, ...fields } }));
  };

  const updateMedicamentos = (fields: Partial<AnamneseFormState['medicamentos']>) => {
    setFormData((prev) => ({ ...prev, medicamentos: { ...prev.medicamentos, ...fields } }));
  };

  const updateDor = (fields: Partial<AnamneseFormState['dor']>) => {
    setFormData((prev) => ({ ...prev, dor: { ...prev.dor, ...fields } }));
  };

  const updateEsforco = (fields: Partial<AnamneseFormState['esforco']>) => {
    setFormData((prev) => ({ ...prev, esforco: { ...prev.esforco, ...fields } }));
  };

  const updateIdoso = (fields: Partial<AnamneseFormState['idoso']>) => {
    setFormData((prev) => ({ ...prev, idoso: { ...prev.idoso, ...fields } }));
  };

  const updateRotina = (fields: Partial<AnamneseFormState['rotina']>) => {
    setFormData((prev) => ({ ...prev, rotina: { ...prev.rotina, ...fields } }));
  };

  const updateFuncional = (fields: Partial<AnamneseFormState['funcional']>) => {
    setFormData((prev) => ({ ...prev, funcional: { ...prev.funcional, ...fields } }));
  };

  const updateMovimentos = (movimentos: AnamneseFormState['movimentos']) => {
    setFormData((prev) => ({ ...prev, movimentos }));
  };

  const updatePlanejamento = (fields: Partial<AnamneseFormState['planejamento']>) => {
    setFormData((prev) => ({ ...prev, planejamento: { ...prev.planejamento, ...fields } }));
  };

  const updateDeclaracao = (fields: Partial<AnamneseFormState['declaracao']>) => {
    setFormData((prev) => ({ ...prev, declaracao: { ...prev.declaracao, ...fields } }));
  };

  // Sample data loader
  const handleLoadSample = () => {
    setFormData({ ...SAMPLE_ANAMNESE_DATA });
    showToast('Ficha de exemplo carregada com sucesso! Você pode inspecionar ou imprimir/salvar em PDF.', 'success');
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados preenchidos da ficha?')) {
      const initial = getInitialAnamneseState();
      setFormData(initial);
      localStorage.removeItem(STORAGE_KEY);
      setCurrentTab(1);
      showToast('Formulário redefinido com sucesso.', 'info');
    }
  };

  // Fast, stable, vector-quality Print / Save as PDF handler
  const handlePrint = () => {
    setActiveView('preview');
    // Allow brief time for preview state render before triggering native print
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col antialiased selection:bg-teal-200 selection:text-teal-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 animate-bounce print:hidden">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toastMessage.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/70 hover:text-white ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        totalSteps={3}
        completionPercentage={completionPercentage}
        onPrintPreview={handlePrint}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {/* Tab & Step Navigation Bar */}
        <TabNavigation
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setActiveView('form');
          }}
          activeView={activeView}
          onToggleView={setActiveView}
        />

        {/* View: Form Fill Wizard */}
        {activeView === 'form' && (
          <div className="print:hidden">
            {currentTab === 1 && (
              <Step1PersonalAndGoals
                aluno={formData.aluno}
                objetivos={formData.objetivos}
                experiencia={formData.experiencia}
                onUpdateAluno={updateAluno}
                onUpdateObjetivos={updateObjetivos}
                onUpdateExperiencia={updateExperiencia}
                onNext={() => {
                  setCurrentTab(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 2 && (
              <Step2HealthAndHabits
                saude={formData.saude}
                medicamentos={formData.medicamentos}
                dor={formData.dor}
                esforco={formData.esforco}
                idoso={formData.idoso}
                rotina={formData.rotina}
                onUpdateSaude={updateSaude}
                onUpdateMedicamentos={updateMedicamentos}
                onUpdateDor={updateDor}
                onUpdateEsforco={updateEsforco}
                onUpdateIdoso={updateIdoso}
                onUpdateRotina={updateRotina}
                onPrev={() => {
                  setCurrentTab(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNext={() => {
                  setCurrentTab(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 3 && (
              <Step3PhysicalAssessment
                funcional={formData.funcional}
                movimentos={formData.movimentos}
                planejamento={formData.planejamento}
                declaracao={formData.declaracao}
                studentName={formData.aluno.nome}
                onUpdateFuncional={updateFuncional}
                onUpdateMovimentos={updateMovimentos}
                onUpdatePlanejamento={updatePlanejamento}
                onUpdateDeclaracao={updateDeclaracao}
                onPrev={() => {
                  setCurrentTab(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewDocument={() => {
                  setActiveView('preview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onPrintDocument={handlePrint}
              />
            )}
          </div>
        )}

        {/* View: Printable Document Inspection / Preview */}
        {activeView === 'preview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Bar for Preview */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-teal-600" />
                  <span>Pré-visualização do Documento</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualização formatada para conferência e emissão do documento da aluna(o) {formData.aluno.nome || ''}.
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  id="btn-preview-back-form"
                  onClick={() => setActiveView('form')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-all border border-slate-200 cursor-pointer"
                >
                  Voltar ao Formulário
                </button>

                <button
                  type="button"
                  id="btn-preview-print-save"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm shadow-teal-700/20 transition-all cursor-pointer"
                  title="Abrir diálogo para Imprimir ou Salvar como PDF"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
              </div>
            </div>

            {/* The Document */}
            <div className="overflow-x-auto pb-6">
              <PrintableDocument data={formData} elementId="printable-anamnese-doc" />
            </div>
          </div>
        )}

        {/* Hidden on screen, visible only when printing directly from form mode (e.g. Ctrl+P) */}
        {activeView === 'form' && (
          <div className="hidden print:block">
            <PrintableDocument data={formData} elementId="printable-anamnese-doc" />
          </div>
        )}
      </main>

      {/* Floating Action Button for Print/Save PDF on mobile / tablet */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden print:hidden">
        <button
          type="button"
          id="btn-mobile-print-save"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 active:scale-95 text-white font-bold rounded-full shadow-xl shadow-teal-900/30 text-xs cursor-pointer border border-white/20"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}
