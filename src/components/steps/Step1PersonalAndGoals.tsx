import React from 'react';
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  Briefcase, 
  ShieldAlert, 
  Target, 
  Dumbbell, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StudentData, StudentObjectives, PhysicalExperience } from '../../types';

interface Step1Props {
  aluno: StudentData;
  objetivos: StudentObjectives;
  experiencia: PhysicalExperience;
  onUpdateAluno: (fields: Partial<StudentData>) => void;
  onUpdateObjetivos: (fields: Partial<StudentObjectives>) => void;
  onUpdateExperiencia: (fields: Partial<PhysicalExperience>) => void;
  onNext: () => void;
}

const COMMON_GOALS = [
  'Qualidade de Vida',
  'Fortalecimento Muscular',
  'Alívio de Dores',
  'Melhora da Postura',
  'Reabilitação / Tratamento',
  'Ganho de Flexibilidade',
  'Condicionamento Físico',
  'Consciência Corporal',
  'Alívio do Estresse / Relaxamento',
  'Prevenção de Lesões',
];

export const Step1PersonalAndGoals: React.FC<Step1Props> = ({
  aluno,
  objetivos,
  experiencia,
  onUpdateAluno,
  onUpdateObjetivos,
  onUpdateExperiencia,
  onNext,
}) => {
  // Auto-calculate age when birth date changes if age is empty or calculated
  const handleBirthDateChange = (val: string) => {
    onUpdateAluno({ dataNascimento: val });
    if (val) {
      const birth = new Date(val);
      if (!isNaN(birth.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          calculatedAge--;
        }
        if (calculatedAge >= 0 && calculatedAge < 120) {
          onUpdateAluno({ dataNascimento: val, idade: calculatedAge.toString() });
        }
      }
    }
  };

  const toggleGoal = (goal: string) => {
    const current = objetivos.motivoPrincipal || [];
    const exists = current.includes(goal);
    const updated = exists
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    onUpdateObjetivos({ motivoPrincipal: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Dados Pessoais do Aluno */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">1. Dados do Aluno</h2>
            <p className="text-xs text-slate-500">
              Informações de identificação e contato de emergência
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Nome */}
          <div className="lg:col-span-2">
            <label htmlFor="aluno-nome" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Nome Completo do Aluno *
            </label>
            <div className="relative">
              <input
                type="text"
                id="aluno-nome"
                value={aluno.nome}
                onChange={(e) => onUpdateAluno({ nome: e.target.value })}
                placeholder="Ex: Mariana Silveira Rodrigues"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="aluno-data-nasc" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Data de Nascimento
            </label>
            <div className="relative">
              <input
                type="date"
                id="aluno-data-nasc"
                value={aluno.dataNascimento}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Idade */}
          <div>
            <label htmlFor="aluno-idade" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Idade (anos)
            </label>
            <input
              type="number"
              id="aluno-idade"
              value={aluno.idade}
              onChange={(e) => onUpdateAluno({ idade: e.target.value })}
              placeholder="Ex: 36"
              min="1"
              max="120"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-slate-900"
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="aluno-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                id="aluno-email"
                value={aluno.email}
                onChange={(e) => onUpdateAluno({ email: e.target.value })}
                placeholder="nome@email.com"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Telefone / WhatsApp */}
          <div>
            <label htmlFor="aluno-telefone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Telefone / WhatsApp *
            </label>
            <div className="relative">
              <input
                type="tel"
                id="aluno-telefone"
                value={aluno.telefone}
                onChange={(e) => onUpdateAluno({ telefone: e.target.value })}
                placeholder="(00) 00000-0000"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Profissão */}
          <div className="lg:col-span-3">
            <label htmlFor="aluno-profissao" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Profissão / Ocupação Principal e Postura de Trabalho
            </label>
            <input
              type="text"
              id="aluno-profissao"
              value={aluno.profissao}
              onChange={(e) => onUpdateAluno({ profissao: e.target.value })}
              placeholder="Ex: Arquiteta - fica 8 horas sentada em frente ao computador"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-slate-900"
            />
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Contato de Emergência
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencia-nome" className="block text-xs font-medium text-slate-600 mb-1">
                Nome do Contato
              </label>
              <input
                type="text"
                id="emergencia-nome"
                value={aluno.contatoEmergenciaNome}
                onChange={(e) => onUpdateAluno({ contatoEmergenciaNome: e.target.value })}
                placeholder="Ex: Carlos Rodrigues"
                className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="emergencia-telefone" className="block text-xs font-medium text-slate-600 mb-1">
                Telefone de Emergência
              </label>
              <input
                type="tel"
                id="emergencia-telefone"
                value={aluno.contatoEmergenciaTelefone}
                onChange={(e) => onUpdateAluno({ contatoEmergenciaTelefone: e.target.value })}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="emergencia-parentesco" className="block text-xs font-medium text-slate-600 mb-1">
                Grau de Parentesco / Vínculo
              </label>
              <input
                type="text"
                id="emergencia-parentesco"
                value={aluno.contatoEmergenciaParentesco}
                onChange={(e) => onUpdateAluno({ contatoEmergenciaParentesco: e.target.value })}
                placeholder="Ex: Esposo, Mãe, Irmão"
                className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Objetivos com o Pilates */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">2. Objetivos com o Pilates</h2>
            <p className="text-xs text-slate-500">
              Selecione as metas prioritárias e o que o aluno busca alcançar
            </p>
          </div>
        </div>

        {/* Motivo Principal - Interactive Chips */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
            Motivos Principais para Praticar Pilates (selecione quantos desejar)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {COMMON_GOALS.map((goal) => {
              const isSelected = objetivos.motivoPrincipal?.includes(goal);
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold shadow-xs ring-1 ring-teal-500/30'
                      : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="leading-tight">{goal}</span>
                  {isSelected ? (
                    <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 ml-1">
                      <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0 ml-1"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="objetivo-outro" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Outro Motivo ou Queixa Específica
            </label>
            <input
              type="text"
              id="objetivo-outro"
              value={objetivos.motivoOutro}
              onChange={(e) => onUpdateObjetivos({ motivoOutro: e.target.value })}
              placeholder="Ex: Recomendação do ortopedista para alívio lombar"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="objetivo-melhorar" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              O que você mais gostaria de melhorar? *
            </label>
            <input
              type="text"
              id="objetivo-melhorar"
              value={objetivos.oQueGostariaMelhorar}
              onChange={(e) => onUpdateObjetivos({ oQueGostariaMelhorar: e.target.value })}
              placeholder="Ex: Eliminar dores no pescoço e melhorar o alinhamento da postura"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="objetivo-expectativas" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Expectativas com as Aulas e com a Instrutora
            </label>
            <textarea
              id="objetivo-expectativas"
              rows={2}
              value={objetivos.expectativas}
              onChange={(e) => onUpdateObjetivos({ expectativas: e.target.value })}
              placeholder="Ex: Aulas personalizadas no meu ritmo, exercícios seguros com orientação atenta para não forçar as articulações..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-slate-900 resize-none"
            />
          </div>
        </div>
      </section>

      {/* 3. Experiência Física */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">3. Experiência com Atividade Física</h2>
            <p className="text-xs text-slate-500">
              Histórico esportivo, rotina atual e contato prévio com o Pilates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pratica atividades físicas atualmente? */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Pratica atividades físicas atualmente?
            </label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="praticaAtividade"
                  value="sim"
                  checked={experiencia.praticaAtividade === 'sim'}
                  onChange={() => onUpdateExperiencia({ praticaAtividade: 'sim' })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="praticaAtividade"
                  value="nao"
                  checked={experiencia.praticaAtividade === 'nao'}
                  onChange={() => onUpdateExperiencia({ praticaAtividade: 'nao', quaisAtividades: '', frequenciaSemanal: 'Sedentário(a)' })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Não (sedentário no momento)</span>
              </label>
            </div>

            {experiencia.praticaAtividade === 'sim' && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <label htmlFor="quais-atividades" className="block text-xs font-medium text-slate-600 mb-1">
                    Quais modalidades ou esportes?
                  </label>
                  <input
                    type="text"
                    id="quais-atividades"
                    value={experiencia.quaisAtividades}
                    onChange={(e) => onUpdateExperiencia({ quaisAtividades: e.target.value })}
                    placeholder="Ex: Musculação, caminhada, natação..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="frequencia-semanal" className="block text-xs font-medium text-slate-600 mb-1">
                    Frequência semanal
                  </label>
                  <input
                    type="text"
                    id="frequencia-semanal"
                    value={experiencia.frequenciaSemanal}
                    onChange={(e) => onUpdateExperiencia({ frequenciaSemanal: e.target.value })}
                    placeholder="Ex: 2 a 3 vezes por semana, 45 min"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Já fez Pilates antes? */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
              Já praticou Pilates anteriormente?
            </label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="jaFezPilates"
                  value="sim"
                  checked={experiencia.jaFezPilates === 'sim'}
                  onChange={() => onUpdateExperiencia({ jaFezPilates: 'sim' })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="jaFezPilates"
                  value="nao"
                  checked={experiencia.jaFezPilates === 'nao'}
                  onChange={() => onUpdateExperiencia({ jaFezPilates: 'nao', tempoPilates: '', experienciaPilatesDetalhes: 'Primeiro contato com o método' })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span>Não (iniciante total)</span>
              </label>
            </div>

            {experiencia.jaFezPilates === 'sim' && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <label htmlFor="tempo-pilates" className="block text-xs font-medium text-slate-600 mb-1">
                    Por quanto tempo praticou?
                  </label>
                  <input
                    type="text"
                    id="tempo-pilates"
                    value={experiencia.tempoPilates}
                    onChange={(e) => onUpdateExperiencia({ tempoPilates: e.target.value })}
                    placeholder="Ex: 6 meses (Studio com aparelhos)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="detalhes-pilates" className="block text-xs font-medium text-slate-600 mb-1">
                    Como foi sua experiência? Alguma restrição anterior?
                  </label>
                  <input
                    type="text"
                    id="detalhes-pilates"
                    value={experiencia.experienciaPilatesDetalhes}
                    onChange={(e) => onUpdateExperiencia({ experienciaPilatesDetalhes: e.target.value })}
                    placeholder="Ex: Gostava muito dos aparelhos; parou por mudança de endereço"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          id="btn-next-step-1"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-sm shadow-teal-700/20 transition-all cursor-pointer"
        >
          <span>Avançar para Saúde e Hábitos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
