import React, { useState } from 'react';
import { 
  ActivitySquare, 
  TableProperties, 
  Compass, 
  FileText, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  FileDown, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  MinusCircle 
} from 'lucide-react';
import { 
  FunctionalAssessment, 
  MovementItem, 
  MovementStatus, 
  InitialPlanning, 
  DeclarationData 
} from '../../types';

interface Step3Props {
  funcional: FunctionalAssessment;
  movimentos: MovementItem[];
  planejamento: InitialPlanning;
  declaracao: DeclarationData;
  studentName: string;
  onUpdateFuncional: (fields: Partial<FunctionalAssessment>) => void;
  onUpdateMovimentos: (movements: MovementItem[]) => void;
  onUpdatePlanejamento: (fields: Partial<InitialPlanning>) => void;
  onUpdateDeclaracao: (fields: Partial<DeclarationData>) => void;
  onPrev: () => void;
  onViewDocument: () => void;
  onGeneratePdf: () => void;
  isGeneratingPdf: boolean;
}

export const Step3PhysicalAssessment: React.FC<Step3Props> = ({
  funcional,
  movimentos,
  planejamento,
  declaracao,
  studentName,
  onUpdateFuncional,
  onUpdateMovimentos,
  onUpdatePlanejamento,
  onUpdateDeclaracao,
  onPrev,
  onViewDocument,
  onGeneratePdf,
  isGeneratingPdf,
}) => {
  const [newMovementName, setNewMovementName] = useState('');
  const [newMovementFoco, setNewMovementFoco] = useState('');
  const [showAddMovementModal, setShowAddMovementModal] = useState(false);

  const handleMovementStatusChange = (id: string, status: MovementStatus) => {
    const updated = movimentos.map((m) => (m.id === id ? { ...m, status } : m));
    onUpdateMovimentos(updated);
  };

  const handleMovementObsChange = (id: string, observacoes: string) => {
    const updated = movimentos.map((m) => (m.id === id ? { ...m, observacoes } : m));
    onUpdateMovimentos(updated);
  };

  const handleAddCustomMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovementName.trim()) return;
    const newItem: MovementItem = {
      id: `custom_${Date.now()}`,
      nome: newMovementName.trim(),
      foco: newMovementFoco.trim() || 'Avaliação específica personalizada',
      status: 'realiza',
      observacoes: '',
    };
    onUpdateMovimentos([...movimentos, newItem]);
    setNewMovementName('');
    setNewMovementFoco('');
    setShowAddMovementModal(false);
  };

  const handleRemoveMovement = (id: string) => {
    onUpdateMovimentos(movimentos.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Avaliação Funcional e Controle Motor */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <ActivitySquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              1. Avaliação Funcional e Controle Motor
            </h2>
            <p className="text-xs text-slate-500">
              Inspeção postural estática, marcha, transferências e flexibilidade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Postura da Cabeça */}
          <div>
            <label htmlFor="postura-cabeca" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Cabeça e Cervical
            </label>
            <input
              type="text"
              id="postura-cabeca"
              value={funcional.posturaCabeca}
              onChange={(e) => onUpdateFuncional({ posturaCabeca: e.target.value })}
              placeholder="Ex: Leve anteriorização da cabeça / Alinhada"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Ombros e Escápulas */}
          <div>
            <label htmlFor="postura-ombros" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Ombros e Cintura Escapular
            </label>
            <input
              type="text"
              id="postura-ombros"
              value={funcional.posturaOmbros}
              onChange={(e) => onUpdateFuncional({ posturaOmbros: e.target.value })}
              placeholder="Ex: Protração escapular leve, ombro D mais alto"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Coluna Vertebral */}
          <div>
            <label htmlFor="postura-coluna" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Coluna Vertebral (Curvaturas)
            </label>
            <input
              type="text"
              id="postura-coluna"
              value={funcional.posturaColuna}
              onChange={(e) => onUpdateFuncional({ posturaColuna: e.target.value })}
              placeholder="Ex: Hipercifose torácica discreta, retificação lombar"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Pelve e Quadril */}
          <div>
            <label htmlFor="postura-pelve" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Pelve e Quadril
            </label>
            <input
              type="text"
              id="postura-pelve"
              value={funcional.posturaPelve}
              onChange={(e) => onUpdateFuncional({ posturaPelve: e.target.value })}
              placeholder="Ex: Neutra em pé, leve retroversão pélvica ao sentar"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Joelhos e Pés */}
          <div>
            <label htmlFor="postura-joelhos-pes" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Membros Inferiores, Joelhos e Pés
            </label>
            <input
              type="text"
              id="postura-joelhos-pes"
              value={funcional.posturaJoelhosPes}
              onChange={(e) => onUpdateFuncional({ posturaJoelhosPes: e.target.value })}
              placeholder="Ex: Alinhamento neutro, leve pronação no pé direito"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Padrão de Marcha */}
          <div>
            <label htmlFor="marcha-padrao" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Padrão de Marcha (Caminhada)
            </label>
            <input
              type="text"
              id="marcha-padrao"
              value={funcional.marchaPadrao}
              onChange={(e) => onUpdateFuncional({ marchaPadrao: e.target.value })}
              placeholder="Ex: Marcha fluida, boa cadência e dissociação de tronco"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Teste Sentar e Levantar */}
          <div>
            <label htmlFor="sentar-levantar" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Teste de Sentar e Levantar da Cadeira
            </label>
            <input
              type="text"
              id="sentar-levantar"
              value={funcional.sentarLevantar}
              onChange={(e) => onUpdateFuncional({ sentarLevantar: e.target.value })}
              placeholder="Ex: Realiza sem apoio dos braços, controle motor adequado"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Equilíbrio Estático e Dinâmico */}
          <div>
            <label htmlFor="equilibrio" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Equilíbrio (Apoio Unipodal e Estabilidade)
            </label>
            <input
              type="text"
              id="equilibrio"
              value={funcional.equilibrioEstaticoDinamico}
              onChange={(e) => onUpdateFuncional({ equilibrioEstaticoDinamico: e.target.value })}
              placeholder="Ex: Firme em ambos os membros (>25s), sem desvios"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Mobilidade e Alongamento */}
          <div>
            <label htmlFor="mobilidade" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Mobilidade e Cadeia Posterior
            </label>
            <input
              type="text"
              id="mobilidade"
              value={funcional.mobilidadeColunaQuadril}
              onChange={(e) => onUpdateFuncional({ mobilidadeColunaQuadril: e.target.value })}
              placeholder="Ex: Encurtamento leve de isquiotibiais; rigidez torácica"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Observações Gerais Funcionais */}
          <div className="md:col-span-2 lg:col-span-3">
            <label htmlFor="obs-funcionais" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Observações Gerais da Avaliadora
            </label>
            <textarea
              id="obs-funcionais"
              rows={2}
              value={funcional.observacoesGerais}
              onChange={(e) => onUpdateFuncional({ observacoesGerais: e.target.value })}
              placeholder="Ex: Boa consciência respiratória, responde com precisão aos toques proprioceptivos..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900 resize-none"
            />
          </div>
        </div>
      </section>

      {/* 2. Movimentos Específicos do Pilates */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <TableProperties className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                2. Movimentos Específicos e Testes Práticos
              </h2>
              <p className="text-xs text-slate-500">
                Avaliação de padrões motores fundamentais do Pilates
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddMovementModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-lg border border-teal-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Movimento</span>
          </button>
        </div>

        {/* Modal para adicionar movimento extra */}
        {showAddMovementModal && (
          <div className="mb-6 p-4 bg-teal-50/60 rounded-xl border border-teal-200 animate-fadeIn">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
              Novo Teste Motor / Movimento Personalizado
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={newMovementName}
                onChange={(e) => setNewMovementName(e.target.value)}
                placeholder="Nome do exercício (Ex: The Hundred adaptado, Single Leg Stretch)"
                className="px-3 py-2 bg-white border border-teal-300 rounded-lg text-xs text-slate-900"
              />
              <input
                type="text"
                value={newMovementFoco}
                onChange={(e) => setNewMovementFoco(e.target.value)}
                placeholder="Foco avaliativo (Ex: Sustentação do powerhouse e controle cervical)"
                className="px-3 py-2 bg-white border border-teal-300 rounded-lg text-xs text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddMovementModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddCustomMovement}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                Salvar Movimento
              </button>
            </div>
          </div>
        )}

        {/* Tabela Interativa de Movimentos */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                <th className="py-3 px-4 font-semibold w-1/4">Movimento & Foco</th>
                <th className="py-3 px-4 font-semibold w-1/3">Status de Execução</th>
                <th className="py-3 px-4 font-semibold">Observações Biomecânicas / Compensações</th>
                <th className="py-3 px-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movimentos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Nome e Foco */}
                  <td className="py-3 px-4 align-top">
                    <p className="font-bold text-slate-900 text-sm">{item.nome}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.foco}</p>
                  </td>

                  {/* Status Buttons */}
                  <td className="py-3 px-4 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          val: 'realiza' as MovementStatus,
                          label: 'Realiza',
                          activeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
                          icon: CheckCircle2,
                        },
                        {
                          val: 'dificuldade' as MovementStatus,
                          label: 'Dificuldade',
                          activeClass: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
                          icon: AlertTriangle,
                        },
                        {
                          val: 'dor' as MovementStatus,
                          label: 'Sente Dor',
                          activeClass: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
                          icon: XCircle,
                        },
                        {
                          val: 'nao_realiza' as MovementStatus,
                          label: 'Não realiza',
                          activeClass: 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
                          icon: MinusCircle,
                        },
                      ].map((statusOpt) => {
                        const isSelected = item.status === statusOpt.val;
                        const Icon = statusOpt.icon;
                        return (
                          <button
                            type="button"
                            key={statusOpt.val}
                            onClick={() => handleMovementStatusChange(item.id, statusOpt.val)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] transition-all cursor-pointer ${
                              isSelected
                                ? statusOpt.activeClass
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-3 h-3 shrink-0" />
                            <span>{statusOpt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Observações */}
                  <td className="py-3 px-4 align-top">
                    <input
                      type="text"
                      value={item.observacoes}
                      onChange={(e) => handleMovementObsChange(item.id, e.target.value)}
                      placeholder="Ex: Compensação de pelve, uso de acessório de apoio..."
                      className="w-full px-2.5 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </td>

                  {/* Delete (se for custom ou opcional) */}
                  <td className="py-3 px-2 align-top text-center">
                    {movimentos.length > 3 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMovement(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Remover este movimento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Planejamento Inicial e Conduta */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              3. Planejamento Inicial e Conduta Profissional
            </h2>
            <p className="text-xs text-slate-500">
              Prescrição, estratégias de treino, contraindicações e frequência indicada
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Objetivos Prioritários */}
          <div className="md:col-span-2">
            <label htmlFor="plan-objetivos" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Objetivos Terapêuticos e Físicos Prioritários *
            </label>
            <textarea
              id="plan-objetivos"
              rows={3}
              value={planejamento.objetivosPrioritarios}
              onChange={(e) => onUpdatePlanejamento({ objetivosPrioritarios: e.target.value })}
              placeholder="Ex: 1. Estabilização lombar e reforço de transverso do abdômen&#10;2. Alívio de tensão cérvico-escapular&#10;3. Melhora da mobilidade torácica"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Estratégias e Exercícios */}
          <div>
            <label htmlFor="plan-estrategias" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Estratégias e Exercícios Recomendados
            </label>
            <textarea
              id="plan-estrategias"
              rows={3}
              value={planejamento.estrategiasExercicios}
              onChange={(e) => onUpdatePlanejamento({ estrategiasExercicios: e.target.value })}
              placeholder="Ex: Enfatizar Footwork no Reformer com descarga correta de peso, Pontes articuladas, trabalhos de dissociação no Cadillac com molas leves..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Cuidados e Contraindicações */}
          <div>
            <label htmlFor="plan-cuidados" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Cuidados, Restrições e Contraindicações
            </label>
            <textarea
              id="plan-cuidados"
              rows={3}
              value={planejamento.cuidadosContraindicacoes}
              onChange={(e) => onUpdatePlanejamento({ cuidadosContraindicacoes: e.target.value })}
              placeholder="Ex: Evitar flexão lombar sob carga excessiva; monitorar tensão cervical e orientar respiração sem apnéia..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Frequência Recomendada */}
          <div>
            <label htmlFor="plan-frequencia" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Frequência Recomendada
            </label>
            <input
              type="text"
              id="plan-frequencia"
              value={planejamento.frequenciaRecomendada}
              onChange={(e) => onUpdatePlanejamento({ frequenciaRecomendada: e.target.value })}
              placeholder="Ex: 2 vezes por semana (sessões de 50 minutos)"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>

          {/* Aparelhos e Acessórios */}
          <div>
            <label htmlFor="plan-aparelhos" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Aparelhos e Acessórios em Destaque
            </label>
            <input
              type="text"
              id="plan-aparelhos"
              value={planejamento.aparelhosAcessoriosFoco}
              onChange={(e) => onUpdatePlanejamento({ aparelhosAcessoriosFoco: e.target.value })}
              placeholder="Ex: Reformer, Cadillac, Cadeira Combo, Magic Circle"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* 4. Declaração de Responsabilidade e Assinaturas */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              4. Declaração de Responsabilidade do Aluno
            </h2>
            <p className="text-xs text-slate-500">
              Termo de ciência, veracidade das informações e formalização
            </p>
          </div>
        </div>

        {/* Termo Box */}
        <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed mb-6">
          <p className="italic">
            &ldquo;Declaro para os devidos fins que todas as informações prestadas nesta ficha de
            anamnese e avaliação física são a mais pura expressão da verdade, não tendo omitido
            nenhum detalhe sobre meu histórico de saúde, lesões, cirurgias ou sintomas preexistentes.
            Comprometo-me formalmente a comunicar com antecedência à educadora física responsável
            qualquer alteração no meu estado de saúde, novas prescrições médicas ou aparecimento de
            dores durante e após os exercícios.&rdquo;
          </p>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
            <input
              type="checkbox"
              id="declaracao-ciente"
              checked={declaracao.alunoCiente}
              onChange={(e) => onUpdateDeclaracao({ alunoCiente: e.target.checked })}
              className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <label htmlFor="declaracao-ciente" className="text-xs font-semibold text-slate-900 cursor-pointer">
              O aluno confirma ter lido e estar de pleno acordo com as declarações acima
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="decl-data" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Data da Avaliação
            </label>
            <input
              type="date"
              id="decl-data"
              value={declaracao.dataAvaliacao}
              onChange={(e) => onUpdateDeclaracao({ dataAvaliacao: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>

          <div>
            <label htmlFor="decl-aluno" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Nome para Assinatura do Aluno
            </label>
            <input
              type="text"
              id="decl-aluno"
              value={declaracao.assinaturaAlunoNome || studentName}
              onChange={(e) => onUpdateDeclaracao({ assinaturaAlunoNome: e.target.value })}
              placeholder="Nome do Aluno"
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>

          <div>
            <label htmlFor="decl-prof" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Profissional Responsável
            </label>
            <input
              type="text"
              id="decl-prof"
              value={declaracao.assinaturaProfissional}
              onChange={(e) => onUpdateDeclaracao({ assinaturaProfissional: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/40 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          id="btn-prev-step-3"
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Saúde e Hábitos</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            id="btn-view-doc"
            onClick={onViewDocument}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-all border border-slate-300 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Eye className="w-4 h-4 text-teal-700" />
            <span>Ver Documento Formatado</span>
          </button>

          <button
            type="button"
            id="btn-final-generate-pdf"
            onClick={onGeneratePdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-teal-700/25 transition-all disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
          >
            {isGeneratingPdf ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gerando PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-5 h-5" />
                <span>Gerar e Salvar PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
