import React from 'react';
import { 
  HeartPulse, 
  Pill, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  Moon, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { 
  HealthHistory, 
  MedicationData, 
  PainDiscomfort, 
  EffortSymptoms, 
  ElderlySpecific, 
  RoutineHabits 
} from '../../types';

interface Step2Props {
  saude: HealthHistory;
  medicamentos: MedicationData;
  dor: PainDiscomfort;
  esforco: EffortSymptoms;
  idoso: ElderlySpecific;
  rotina: RoutineHabits;
  onUpdateSaude: (fields: Partial<HealthHistory>) => void;
  onUpdateMedicamentos: (fields: Partial<MedicationData>) => void;
  onUpdateDor: (fields: Partial<PainDiscomfort>) => void;
  onUpdateEsforco: (fields: Partial<EffortSymptoms>) => void;
  onUpdateIdoso: (fields: Partial<ElderlySpecific>) => void;
  onUpdateRotina: (fields: Partial<RoutineHabits>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2HealthAndHabits: React.FC<Step2Props> = ({
  saude,
  medicamentos,
  dor,
  esforco,
  idoso,
  rotina,
  onUpdateSaude,
  onUpdateMedicamentos,
  onUpdateDor,
  onUpdateEsforco,
  onUpdateIdoso,
  onUpdateRotina,
  onPrev,
  onNext,
}) => {
  const handleCondicaoToggle = (key: keyof HealthHistory['condicoes']) => {
    onUpdateSaude({
      condicoes: {
        ...saude.condicoes,
        [key]: !saude.condicoes[key],
      },
    });
  };

  const handleEsforcoToggle = (key: keyof EffortSymptoms) => {
    if (key === 'nenhumSinal') {
      const newVal = !esforco.nenhumSinal;
      onUpdateEsforco({
        nenhumSinal: newVal,
        faltaArExcessiva: false,
        tontura: false,
        palpitacoes: false,
        nauseas: false,
        visaoTurva: false,
        doresNoPeito: false,
      });
    } else {
      onUpdateEsforco({
        ...esforco,
        [key]: !esforco[key],
        nenhumSinal: false,
      });
    }
  };

  // Helper for pain scale color
  const getPainColor = (val: number) => {
    if (val === 0) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (val <= 3) return 'text-teal-700 bg-teal-100 border-teal-300';
    if (val <= 6) return 'text-amber-800 bg-amber-100 border-amber-300';
    if (val <= 8) return 'text-orange-800 bg-orange-100 border-orange-300';
    return 'text-rose-800 bg-rose-100 border-rose-300';
  };

  const getPainDescriptor = (val: number) => {
    if (val === 0) return '0 - Sem dor';
    if (val <= 2) return `${val} - Dor leve e tolerável`;
    if (val <= 4) return `${val} - Dor moderada`;
    if (val <= 6) return `${val} - Dor incômoda e limitante`;
    if (val <= 8) return `${val} - Dor intensa e aguda`;
    return `${val} - Dor insuportável / extrema`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Histórico de Saúde */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">1. Histórico de Saúde</h2>
            <p className="text-xs text-slate-500">
              Patologias diagnosticadas, cirurgias, lesões e tratamentos fisioterapêuticos
            </p>
          </div>
        </div>

        {/* Condições Clínicas Grid */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
            Condições e Patologias Diagnosticadas
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { id: 'pressaoAlta', label: 'Pressão Alta (Hipertensão)' },
              { id: 'pressaoBaixa', label: 'Pressão Baixa (Hipotensão)' },
              { id: 'diabetes', label: 'Diabetes' },
              { id: 'cardiacas', label: 'Doenças Cardíacas' },
              { id: 'respiratorias', label: 'Respiratórias (Asma/Bronquite)' },
              { id: 'labirintite', label: 'Labirintite / Vertigem' },
              { id: 'osteoporose', label: 'Osteoporose / Osteopenia' },
              { id: 'herniaDisco', label: 'Hérnia de Disco / Protusão' },
              { id: 'artroseArtrite', label: 'Artrose / Artrite' },
              { id: 'fibromialgia', label: 'Fibromialgia' },
              { id: 'problemasColuna', label: 'Desvios de Coluna (Escoliose...)' },
            ].map(({ id, label }) => {
              const isChecked = !!saude.condicoes[id as keyof HealthHistory['condicoes']];
              return (
                <button
                  type="button"
                  key={id}
                  id={`btn-condicao-${id}`}
                  onClick={() => handleCondicaoToggle(id as keyof HealthHistory['condicoes'])}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-rose-50/70 border-rose-300 text-rose-950 font-semibold shadow-2xs'
                      : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                  <span className="leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Outras condições e cirurgias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="outras-condicoes" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Outras Condições, Alergias ou Observações Médicas
            </label>
            <textarea
              id="outras-condicoes"
              rows={2}
              value={saude.condicoes.outrasCondicoes}
              onChange={(e) =>
                onUpdateSaude({
                  condicoes: { ...saude.condicoes, outrasCondicoes: e.target.value },
                })
              }
              placeholder="Ex: Protusão discal lombar L4-L5 diagnosticada em 2022"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 resize-none"
            />
          </div>

          <div>
            <label htmlFor="cirurgias" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Cirurgias Prévias (Quais e quando?)
            </label>
            <textarea
              id="cirurgias"
              rows={2}
              value={saude.cirurgias}
              onChange={(e) => onUpdateSaude({ cirurgias: e.target.value })}
              placeholder="Ex: Apendicectomia aos 16 anos; Artroscopia no joelho em 2018..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 resize-none"
            />
          </div>

          <div>
            <label htmlFor="lesoes" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Lesões, Fraturas ou Entorses Prévias
            </label>
            <input
              type="text"
              id="lesoes"
              value={saude.lesoes}
              onChange={(e) => onUpdateSaude({ lesoes: e.target.value })}
              placeholder="Ex: Entorse no tornozelo direito, estiramento muscular..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900"
            />
          </div>

          {/* Fisioterapia */}
          <div className="bg-slate-50/60 p-3.5 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Tratamento com Fisioterapia
            </label>
            <div className="flex flex-wrap gap-4 mb-2">
              {[
                { val: 'nunca', label: 'Nunca fez' },
                { val: 'atual', label: 'Em tratamento atual' },
                { val: 'passado', label: 'Já fez no passado' },
              ].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-1.5 text-xs text-slate-800 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="fisioterapia"
                    value={val}
                    checked={saude.fisioterapia === val}
                    onChange={() => onUpdateSaude({ fisioterapia: val as any })}
                    className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {saude.fisioterapia && saude.fisioterapia !== 'nunca' && (
              <input
                type="text"
                value={saude.fisioterapiaMotivo}
                onChange={(e) => onUpdateSaude({ fisioterapiaMotivo: e.target.value })}
                placeholder="Qual o motivo e objetivo da fisioterapia?"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            )}
          </div>
        </div>
      </section>

      {/* 2. Medicamentos de Uso Contínuo */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">2. Medicamentos</h2>
            <p className="text-xs text-slate-500">
              Medicamentos de uso rotineiro e potenciais interferências na prática de exercícios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Faz uso de medicamentos contínuos?
            </label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="usaMedicamentoContinuo"
                  value="sim"
                  checked={medicamentos.usaMedicamentoContinuo === 'sim'}
                  onChange={() => onUpdateMedicamentos({ usaMedicamentoContinuo: 'sim' })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="usaMedicamentoContinuo"
                  value="nao"
                  checked={medicamentos.usaMedicamentoContinuo === 'nao'}
                  onChange={() =>
                    onUpdateMedicamentos({
                      usaMedicamentoContinuo: 'nao',
                      quaisMedicamentos: 'Nenhum medicamento contínuo',
                      interferemExercicio: 'nao',
                    })
                  }
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Não</span>
              </label>
            </div>

            {medicamentos.usaMedicamentoContinuo === 'sim' && (
              <div>
                <label htmlFor="quais-medicamentos" className="block text-xs font-medium text-slate-600 mb-1">
                  Quais medicamentos e dosagens?
                </label>
                <textarea
                  id="quais-medicamentos"
                  rows={2}
                  value={medicamentos.quaisMedicamentos}
                  onChange={(e) => onUpdateMedicamentos({ quaisMedicamentos: e.target.value })}
                  placeholder="Ex: Anti-hipertensivo (Losartana 50mg), Levotiroxina..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40 resize-none"
                />
              </div>
            )}
          </div>

          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Os medicamentos interferem na prática física?
            </label>
            <div className="flex gap-4 mb-3">
              {[
                { val: 'nao', label: 'Não' },
                { val: 'sim', label: 'Sim' },
                { val: 'nao_sabe', label: 'Não tem certeza' },
              ].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-1.5 text-xs text-slate-800 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="interferemExercicio"
                    value={val}
                    checked={medicamentos.interferemExercicio === val}
                    onChange={() => onUpdateMedicamentos({ interferemExercicio: val as any })}
                    className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div>
              <label htmlFor="interferem-detalhes" className="block text-xs font-medium text-slate-600 mb-1">
                Cuidados especiais ou orientação médica
              </label>
              <input
                type="text"
                id="interferem-detalhes"
                value={medicamentos.interferemDetalhes}
                onChange={(e) => onUpdateMedicamentos({ interferemDetalhes: e.target.value })}
                placeholder="Ex: Cuidado com mudanças bruscas de postura (pressão)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dor e Desconfortos com Escala Analógica Visual (EVA) */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">3. Dor e Desconfortos</h2>
            <p className="text-xs text-slate-500">
              Localização, características e graduação da dor (Escala Visual Analógica - 0 a 10)
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-slate-50/70 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
            Apresenta dor ou desconforto frequente?
          </label>
          <div className="flex gap-5">
            <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
              <input
                type="radio"
                name="senteDor"
                value="sim"
                checked={dor.senteDor === 'sim'}
                onChange={() => onUpdateDor({ senteDor: 'sim' })}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span>Sim, sinto dores ou incômodos</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
              <input
                type="radio"
                name="senteDor"
                value="nao"
                checked={dor.senteDor === 'nao'}
                onChange={() =>
                  onUpdateDor({
                    senteDor: 'nao',
                    localDor: 'Sem queixa de dor atual',
                    lado: 'nao_se_aplica',
                    escalaDorRepouso: 0,
                    escalaDorExercicio: 0,
                  })
                }
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span>Não sinto dor</span>
            </label>
          </div>
        </div>

        {dor.senteDor === 'sim' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="local-dor" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Localização da Dor *
                </label>
                <input
                  type="text"
                  id="local-dor"
                  value={dor.localDor}
                  onChange={(e) => onUpdateDor({ localDor: e.target.value })}
                  placeholder="Ex: Região lombar, cervical, joelho direito, ombro esquerdo"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label htmlFor="lado-dor" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Lado Acometido
                </label>
                <select
                  id="lado-dor"
                  value={dor.lado}
                  onChange={(e) => onUpdateDor({ lado: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
                >
                  <option value="bilateral">Bilateral (ambos os lados)</option>
                  <option value="direito">Lado Direito</option>
                  <option value="esquerdo">Lado Esquerdo</option>
                  <option value="central">Centralizado</option>
                  <option value="nao_se_aplica">Não se aplica</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tipo-dor" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tipo de Sensação
                </label>
                <input
                  type="text"
                  id="tipo-dor"
                  value={dor.tipoDor}
                  onChange={(e) => onUpdateDor({ tipoDor: e.target.value })}
                  placeholder="Ex: Pontada, queimação, peso, latejante, pontual"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="fatores-melhora" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  O que costuma aliviar a dor?
                </label>
                <input
                  type="text"
                  id="fatores-melhora"
                  value={dor.fatoresMelhora}
                  onChange={(e) => onUpdateDor({ fatoresMelhora: e.target.value })}
                  placeholder="Ex: Repouso, alongamento, compressa quente"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="fatores-piora" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  O que piora a dor?
                </label>
                <input
                  type="text"
                  id="fatores-piora"
                  value={dor.fatoresPiora}
                  onChange={(e) => onUpdateDor({ fatoresPiora: e.target.value })}
                  placeholder="Ex: Ficar sentado muito tempo, carregar peso"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
                />
              </div>
            </div>

            {/* Sliders da Escala de Dor EVA (0 a 10) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Dor em Repouso */}
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Escala de Dor em Repouso
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPainColor(
                      dor.escalaDorRepouso
                    )}`}
                  >
                    {getPainDescriptor(dor.escalaDorRepouso)}
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-dor-repouso"
                  min="0"
                  max="10"
                  step="1"
                  value={dor.escalaDorRepouso}
                  onChange={(e) => onUpdateDor({ escalaDorRepouso: Number(e.target.value) })}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1">
                  <span>0 (Sem dor)</span>
                  <span>5 (Moderada)</span>
                  <span>10 (Insuportável)</span>
                </div>
              </div>

              {/* Dor no Exercício */}
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Escala de Dor no Exercício / Movimento
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPainColor(
                      dor.escalaDorExercicio
                    )}`}
                  >
                    {getPainDescriptor(dor.escalaDorExercicio)}
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-dor-exercicio"
                  min="0"
                  max="10"
                  step="1"
                  value={dor.escalaDorExercicio}
                  onChange={(e) => onUpdateDor({ escalaDorExercicio: Number(e.target.value) })}
                  className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1">
                  <span>0 (Sem dor)</span>
                  <span>5 (Moderada)</span>
                  <span>10 (Insuportável)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Sinais Durante o Esforço */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">4. Sinais Durante o Esforço Físico</h2>
            <p className="text-xs text-slate-500">
              Sintomas ou reações que o aluno possa apresentar durante a atividade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { id: 'nenhumSinal', label: 'Nenhum sinal (Sem restrições)' },
            { id: 'faltaArExcessiva', label: 'Falta de ar excessiva / dispneia' },
            { id: 'tontura', label: 'Tontura / sensação de desmaio' },
            { id: 'palpitacoes', label: 'Palpitações / Taquicardia' },
            { id: 'nauseas', label: 'Náuseas / Enjoo' },
            { id: 'visaoTurva', label: 'Visão turva / Escurecimento visual' },
            { id: 'doresNoPeito', label: 'Dor ou aperto no peito' },
          ].map(({ id, label }) => {
            const isChecked = !!esforco[id as keyof EffortSymptoms];
            const isNone = id === 'nenhumSinal';
            return (
              <button
                type="button"
                key={id}
                id={`btn-esforco-${id}`}
                onClick={() => handleEsforcoToggle(id as keyof EffortSymptoms)}
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  isChecked
                    ? isNone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                      : 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                    : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked
                      ? isNone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-rose-600 border-rose-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span className="leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        <div>
          <label htmlFor="outros-sinais" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Outros Sinais ou Observações
          </label>
          <input
            type="text"
            id="outros-sinais"
            value={esforco.outrosSinais}
            onChange={(e) => onUpdateEsforco({ outrosSinais: e.target.value })}
            placeholder="Ex: Leve fadiga ao subir escadas, cansaço no calor..."
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
          />
        </div>
      </section>

      {/* 5. Para Alunos Idosos / Prevenção de Quedas */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">5. Para Alunos Idosos / Risco de Quedas</h2>
            <p className="text-xs text-slate-500">
              Histórico de equilíbrio, incidentes e dispositivos de suporte à marcha
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Histórico de Quedas */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Teve quedas nos últimos 12 meses?
            </label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="quedas"
                  value="nao"
                  checked={idoso.historicoQuedas12Meses === 'nao'}
                  onChange={() => onUpdateIdoso({ historicoQuedas12Meses: 'nao', quantidadeQuedas: '0' })}
                  className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                />
                <span>Não</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="quedas"
                  value="sim"
                  checked={idoso.historicoQuedas12Meses === 'sim'}
                  onChange={() => onUpdateIdoso({ historicoQuedas12Meses: 'sim' })}
                  className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                />
                <span>Sim</span>
              </label>
            </div>
            {idoso.historicoQuedas12Meses === 'sim' && (
              <input
                type="text"
                value={idoso.quantidadeQuedas}
                onChange={(e) => onUpdateIdoso({ quantidadeQuedas: e.target.value })}
                placeholder="Quantas quedas e em que situação?"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            )}
          </div>

          {/* Medo de Cair */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Sente medo de cair no dia a dia?
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: 'nao', label: 'Não tem medo' },
                { val: 'as_vezes', label: 'Às vezes / em desníveis' },
                { val: 'sim', label: 'Sim, medo frequente' },
              ].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="medoDeCair"
                    value={val}
                    checked={idoso.medoDeCair === val}
                    onChange={() => onUpdateIdoso({ medoDeCair: val as any })}
                    className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dispositivo de Auxílio */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label htmlFor="select-auxilio-idoso" className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Uso de dispositivo de auxílio
            </label>
            <select
              id="select-auxilio-idoso"
              value={idoso.usoDispositivoAuxilio}
              onChange={(e) => onUpdateIdoso({ usoDispositivoAuxilio: e.target.value as any })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            >
              <option value="nenhum">Nenhum (marcha independente)</option>
              <option value="bengala">Bengala</option>
              <option value="andador">Andador</option>
              <option value="muleta">Muleta</option>
              <option value="outro">Outro dispositivo</option>
            </select>
            {idoso.usoDispositivoAuxilio === 'outro' && (
              <input
                type="text"
                id="outro-dispositivo"
                value={idoso.outroDispositivo}
                onChange={(e) => onUpdateIdoso({ outroDispositivo: e.target.value })}
                placeholder="Qual dispositivo utiliza?"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            )}
          </div>
        </div>
      </section>

      {/* 6. Rotina e Hábitos de Vida */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">6. Rotina e Hábitos de Vida</h2>
            <p className="text-xs text-slate-500">
              Sono, nível de estresse, tempo sentado e hidratação
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Qualidade do sono */}
          <div>
            <label htmlFor="select-qualidade-sono" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Qualidade do Sono
            </label>
            <select
              id="select-qualidade-sono"
              value={rotina.qualidadeSono}
              onChange={(e) => onUpdateRotina({ qualidadeSono: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            >
              <option value="">Selecione...</option>
              <option value="excelente">Excelente (sono reparador)</option>
              <option value="boa">Boa</option>
              <option value="regular">Regular (acorda algumas vezes)</option>
              <option value="ruim">Ruim (insônia ou cansaço ao acordar)</option>
            </select>
          </div>

          {/* Horas de Sono */}
          <div>
            <label htmlFor="rotina-sono" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Média de Horas de Sono por Noite
            </label>
            <input
              type="text"
              id="rotina-sono"
              value={rotina.horasSono}
              onChange={(e) => onUpdateRotina({ horasSono: e.target.value })}
              placeholder="Ex: 7 a 8 horas"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Nível de Estresse */}
          <div>
            <label htmlFor="select-nivel-estresse" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Nível Habitual de Estresse
            </label>
            <select
              id="select-nivel-estresse"
              value={rotina.nivelEstresse}
              onChange={(e) => onUpdateRotina({ nivelEstresse: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            >
              <option value="">Selecione...</option>
              <option value="baixo">Baixo (rotina tranquila)</option>
              <option value="moderado">Moderado</option>
              <option value="alto">Alto (rotina acelerada / sob pressão)</option>
            </select>
          </div>

          {/* Tempo Sentado */}
          <div>
            <label htmlFor="rotina-sentado" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Tempo Diário Sentado(a)
            </label>
            <input
              type="text"
              id="rotina-sentado"
              value={rotina.tempoSentadoDia}
              onChange={(e) => onUpdateRotina({ tempoSentadoDia: e.target.value })}
              placeholder="Ex: 8 horas diárias no trabalho"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Postura de Trabalho */}
          <div>
            <label htmlFor="rotina-postura" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Postura Predominante no Trabalho
            </label>
            <input
              type="text"
              id="rotina-postura"
              value={rotina.posturaTrabalho}
              onChange={(e) => onUpdateRotina({ posturaTrabalho: e.target.value })}
              placeholder="Ex: Sentado com computador / Em pé / Dirigindo"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Consumo de Água */}
          <div>
            <label htmlFor="rotina-agua" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Consumo Diário de Água
            </label>
            <input
              type="text"
              id="rotina-agua"
              value={rotina.consumoAgua}
              onChange={(e) => onUpdateRotina({ consumoAgua: e.target.value })}
              placeholder="Ex: 1,5 a 2 litros por dia"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          id="btn-prev-step-2"
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Dados Pessoais</span>
        </button>

        <button
          type="button"
          id="btn-next-step-2"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-sm shadow-teal-700/20 transition-all cursor-pointer"
        >
          <span>Avançar para Avaliação Física</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
