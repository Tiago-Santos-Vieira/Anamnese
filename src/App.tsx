import React, { useState, useEffect, useRef } from 'react';
import { 
  FileDown, 
  Printer, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileCheck2,
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
import { generateAnamnesePdf } from './utils/pdfGenerator';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Hidden print container ref
  const printDocRef = useRef<HTMLDivElement>(null);

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
    showToast('Ficha de exemplo carregada com sucesso! Você pode inspecionar ou gerar o PDF.', 'success');
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

  // Primary PDF Generation Handler
  const handleGeneratePdf = async () => {
    const studentName = formData.aluno.nome?.trim() || 'Aluno';
    setIsGeneratingPdf(true);

    try {
      // Find the document element to export
      const docElement = document.getElementById('printable-anamnese-doc');
      if (!docElement) {
        throw new Error('Elemento do documento não foi encontrado na página.');
      }

      await generateAnamnesePdf(docElement, studentName);
      showToast(`PDF "Anamnese_${studentName.replace(/\s+/g, '_')}.pdf" gerado com sucesso!`, 'success');
    } catch (error) {
      console.error('Falha ao gerar PDF:', error);
      showToast('Ocorreu uma instabilidade ao gerar o PDF. Tentando modo de impressão nativo...', 'error');
      // Fallback to window.print()
      setTimeout(() => {
        window.print();
      }, 500);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Native Print Handler
  const handleNativePrint = () => {
    window.print();
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
        isGeneratingPdf={isGeneratingPdf}
        onGeneratePdf={handleGeneratePdf}
        onPrintPreview={handleNativePrint}
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
          <div>
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
                onGeneratePdf={handleGeneratePdf}
                isGeneratingPdf={isGeneratingPdf}
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
                  <span>Pré-visualização do Documento PDF</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Este é o formato exato que será exportado para o arquivo PDF da aluna(o) {formData.aluno.nome || ''}.
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setActiveView('form')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all border border-slate-200"
                >
                  Voltar ao Formulário
                </button>

                <button
                  type="button"
                  onClick={handleNativePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-xl border border-teal-200 transition-all"
                  title="Imprimir ou Salvar com as opções nativas do navegador"
                >
                  <Printer className="w-4 h-4 text-teal-700" />
                  <span>Imprimir</span>
                </button>

                <button
                  type="button"
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm shadow-teal-700/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Gerando PDF...</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      <span>Gerar e Salvar PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* The Document */}
            <div className="overflow-x-auto pb-6">
              <PrintableDocument data={formData} elementId="printable-anamnese-doc" />
            </div>
          </div>
        )}

        {/* Off-screen Container for Document Rendering when in 'form' view so html2pdf can capture full DOM layout and metrics */}
        {activeView === 'form' && (
          <div
            style={{
              position: 'fixed',
              left: '-9999px',
              top: 0,
              width: '850px',
              pointerEvents: 'none',
              zIndex: -50,
            }}
            aria-hidden="true"
          >
            <PrintableDocument data={formData} elementId="printable-anamnese-doc" />
          </div>
        )}
      </main>

      {/* Floating Action Button for PDF generation on mobile / tablet */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden print:hidden">
        <button
          type="button"
          onClick={handleGeneratePdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 active:scale-95 text-white font-bold rounded-full shadow-xl shadow-teal-900/30 text-xs disabled:opacity-50 cursor-pointer border border-white/20"
        >
          {isGeneratingPdf ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FileDown className="w-4 h-4" />
          )}
          <span>Salvar PDF</span>
        </button>
      </div>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}
