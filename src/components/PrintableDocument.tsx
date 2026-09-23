import React from 'react';
import { 
  FileCheck2, 
  Instagram, 
  Heart, 
  Activity, 
  Shield, 
  Target, 
  User, 
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Briefcase
} from 'lucide-react';
import { AnamneseFormState, MovementStatus } from '../types';

interface PrintableDocumentProps {
  data: AnamneseFormState;
  elementId?: string;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  data,
  elementId = 'printable-anamnese-doc',
}) => {
  const { aluno, objetivos, experiencia, saude, medicamentos, dor, esforco, idoso, rotina, funcional, movimentos, planejamento, declaracao } = data;

  const activeHealthConditions = Object.entries(saude.condicoes)
    .filter(([key, val]) => val === true && key !== 'outrasCondicoes')
    .map(([key]) => {
      const labels: Record<string, string> = {
        pressaoAlta: 'Hipertensão (Pressão Alta)',
        pressaoBaixa: 'Hipotensão (Pressão Baixa)',
        diabetes: 'Diabetes',
        cardiacas: 'Doenças Cardíacas',
        respiratorias: 'Doenças Respiratórias (Asma/Bronquite)',
        labirintite: 'Labirintite / Vertigem',
        osteoporose: 'Osteoporose / Osteopenia',
        herniaDisco: 'Hérnia de Disco / Protusão',
        artroseArtrite: 'Artrose / Artrite',
        fibromialgia: 'Fibromialgia',
        problemasColuna: 'Desvios Posturais de Coluna',
      };
      return labels[key] || key;
    });

  const activeEffortSymptoms = [
    esforco.faltaArExcessiva && 'Falta de ar excessiva',
    esforco.tontura && 'Tontura / vertigem',
    esforco.palpitacoes && 'Palpitações / taquicardia',
    esforco.nauseas && 'Náuseas / enjoo',
    esforco.visaoTurva && 'Visão turva',
    esforco.doresNoPeito && 'Dor / aperto no peito',
  ].filter(Boolean) as string[];

  const allPains = (dor.listaDores && dor.listaDores.length > 0)
    ? dor.listaDores.filter(p => p.localDor || (p.escalaDorRepouso ?? 0) > 0 || (p.escalaDorExercicio ?? 0) > 0)
    : (dor.localDor ? [{
        id: 'dor-1',
        localDor: dor.localDor,
        lado: dor.lado || 'nao_se_aplica',
        tipoDor: dor.tipoDor || '',
        escalaDorRepouso: dor.escalaDorRepouso ?? 0,
        escalaDorExercicio: dor.escalaDorExercicio ?? 0,
        fatoresMelhora: dor.fatoresMelhora || '',
        fatoresPiora: dor.fatoresPiora || '',
      }] : []);

  const getStatusBadge = (status: MovementStatus) => {
    switch (status) {
      case 'realiza':
        return <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Realiza</span>;
      case 'dificuldade':
        return <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">Dificuldade</span>;
      case 'dor':
        return <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">Sente Dor</span>;
      case 'nao_realiza':
        return <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Não Realiza</span>;
    }
  };

  const formatDateBr = (dateStr?: string) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return dateStr;
  };

  return (
    <div
      id={elementId}
      className="bg-white text-slate-800 p-6 sm:p-10 max-w-4xl mx-auto shadow-md print:shadow-none print:p-4 rounded-xl print:rounded-none font-sans leading-relaxed border border-slate-200 print:border-none"
    >
      {/* Document Header */}
      <header className="border-b-2 border-teal-600 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs border border-teal-700/50">
              <span className="font-serif text-2xl font-bold tracking-tight text-white select-none">
                T
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Studio & Prescrição Clínica
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Ficha de Anamnese e Avaliação Inicial – Pilates
              </h1>
            </div>
          </div>

          <div className="sm:text-right bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 shrink-0">
            <p className="text-xs font-bold text-slate-900">
              Profissional: <span className="text-teal-800">Tássia - Educadora Física</span>
            </p>
            <p className="text-[11px] text-slate-600 flex items-center sm:justify-end gap-1 mt-0.5">
              <span>Instagram:</span>
              <strong className="text-pink-700">@tassia.movimento</strong>
            </p>
            <p className="text-[10px] text-slate-600 font-semibold mt-0.5">
              Data: {formatDateBr(declaracao.dataAvaliacao) || new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </header>

      {/* 1. DADOS PESSOAIS */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <User className="w-3.5 h-3.5" />
          <span>1. Dados do Aluno</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
          <div className="col-span-2">
            <span className="text-slate-600 font-medium block text-[10px]">Nome Completo</span>
            <span className="font-bold text-slate-900 text-sm">{aluno.nome || 'Não informado'}</span>
          </div>

          <div>
            <span className="text-slate-600 font-medium block text-[10px]">Data de Nasc. / Idade</span>
            <span className="font-semibold text-slate-900">
              {aluno.dataNascimento ? formatDateBr(aluno.dataNascimento) : '—'}
              {aluno.idade ? ` (${aluno.idade} anos)` : ''}
            </span>
          </div>

          <div>
            <span className="text-slate-600 font-medium block text-[10px]">Telefone / WhatsApp</span>
            <span className="font-semibold text-slate-900">{aluno.telefone || '—'}</span>
          </div>

          <div className="col-span-2">
            <span className="text-slate-600 font-medium block text-[10px]">E-mail</span>
            <span className="font-semibold text-slate-900 truncate block">{aluno.email || '—'}</span>
          </div>

          <div className="col-span-2">
            <span className="text-slate-600 font-medium block text-[10px]">Profissão / Postura no Trabalho</span>
            <span className="font-semibold text-slate-900">{aluno.profissao || '—'}</span>
          </div>

          <div className="col-span-2 sm:col-span-4 pt-1.5 border-t border-slate-200/80 mt-1 flex flex-wrap gap-4 text-[11px]">
            <div>
              <span className="text-slate-600">Contato de Emergência: </span>
              <strong className="text-slate-900">{aluno.contatoEmergenciaNome || '—'}</strong>
            </div>
            {aluno.contatoEmergenciaTelefone && (
              <div>
                <span className="text-slate-600">Telefone: </span>
                <strong className="text-slate-900">{aluno.contatoEmergenciaTelefone}</strong>
              </div>
            )}
            {aluno.contatoEmergenciaParentesco && (
              <div>
                <span className="text-slate-600">Parentesco: </span>
                <strong className="text-slate-900">{aluno.contatoEmergenciaParentesco}</strong>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. OBJETIVOS E EXPERIÊNCIA FÍSICA */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>2. Objetivos com o Pilates & Experiência Prévia</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Objetivos */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Motivos Principais
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {objetivos.motivoPrincipal && objetivos.motivoPrincipal.length > 0 ? (
                objetivos.motivoPrincipal.map((g) => (
                  <span key={g} className="px-2 py-0.5 bg-teal-100 text-teal-900 rounded font-semibold text-[11px] border border-teal-200">
                    {g}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">Nenhum selecionado</span>
              )}
              {objetivos.motivoOutro && (
                <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded text-[11px]">
                  {objetivos.motivoOutro}
                </span>
              )}
            </div>

            {objetivos.oQueGostariaMelhorar && (
              <div className="mt-2 pt-2 border-t border-slate-200">
                <span className="text-slate-600 text-[10px] block">O que mais gostaria de melhorar:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{objetivos.oQueGostariaMelhorar}</p>
              </div>
            )}
            {objetivos.expectativas && (
              <div className="mt-2 pt-1 border-t border-slate-200/60">
                <span className="text-slate-600 text-[10px] block">Expectativas:</span>
                <p className="text-slate-700 italic mt-0.5">{objetivos.expectativas}</p>
              </div>
            )}
          </div>

          {/* Experiência Física */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Prática de Atividades e Histórico de Pilates
            </p>
            <div className="space-y-1.5">
              <div>
                <span className="text-slate-600">Pratica atividade física atualmente: </span>
                <strong className="text-slate-900 capitalize">
                  {experiencia.praticaAtividade ? (experiencia.praticaAtividade === 'sim' ? 'Sim' : 'Não (Sedentário)') : '—'}
                </strong>
                {experiencia.praticaAtividade === 'sim' && experiencia.quaisAtividades && (
                  <span className="block text-slate-800 font-medium">
                    Modalidades: {experiencia.quaisAtividades} ({experiencia.frequenciaSemanal || 'frequência livre'})
                  </span>
                )}
              </div>

              <div className="pt-1.5 border-t border-slate-200">
                <span className="text-slate-600">Já praticou Pilates antes: </span>
                <strong className="text-slate-900 capitalize">
                  {experiencia.jaFezPilates ? (experiencia.jaFezPilates === 'sim' ? 'Sim' : 'Não (Iniciante)') : '—'}
                </strong>
                {experiencia.jaFezPilates === 'sim' && (
                  <p className="text-slate-800 font-medium mt-0.5">
                    Tempo: {experiencia.tempoPilates || '—'} | Detalhes: {experiencia.experienciaPilatesDetalhes || 'Sem queixas'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HISTÓRICO DE SAÚDE, MEDICAMENTOS E DOR */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <Heart className="w-3.5 h-3.5" />
          <span>3. Histórico Clínico, Medicamentos e Sintomas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Condições e Patologias */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Patologias Diagnosticadas
            </span>
            {activeHealthConditions.length > 0 ? (
              <ul className="list-disc list-inside space-y-0.5 text-rose-900 font-semibold">
                {activeHealthConditions.map((cond) => (
                  <li key={cond}>{cond}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600 italic">Nenhuma patologia crônica relatada</p>
            )}
            {saude.condicoes.outrasCondicoes && (
              <p className="mt-1.5 text-[11px] text-slate-800 font-medium">
                <strong>Outras:</strong> {saude.condicoes.outrasCondicoes}
              </p>
            )}
            {saude.cirurgias && (
              <p className="mt-1.5 text-[11px] text-slate-800">
                <strong>Cirurgias:</strong> {saude.cirurgias}
              </p>
            )}
            {saude.lesoes && (
              <p className="mt-1 text-[11px] text-slate-800">
                <strong>Lesões:</strong> {saude.lesoes}
              </p>
            )}
            {saude.fisioterapia && (
              <p className="mt-1 text-[11px] text-slate-800">
                <strong>Fisioterapia:</strong> {saude.fisioterapia} {saude.fisioterapiaMotivo ? `(${saude.fisioterapiaMotivo})` : ''}
              </p>
            )}
          </div>

          {/* Medicamentos e Esforço */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Medicamentos & Sinais no Esforço
            </span>
            <div className="mb-2">
              <span className="text-slate-600">Uso contínuo: </span>
              <strong className="text-slate-900">
                {medicamentos.usaMedicamentoContinuo === 'sim' ? 'Sim' : 'Não'}
              </strong>
              {medicamentos.usaMedicamentoContinuo === 'sim' && medicamentos.quaisMedicamentos && (
                <p className="text-slate-800 font-medium mt-0.5">{medicamentos.quaisMedicamentos}</p>
              )}
              {medicamentos.interferemDetalhes && (
                <p className="text-slate-600 text-[10px] mt-0.5">Obs: {medicamentos.interferemDetalhes}</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-600 block text-[10px]">Sinais durante o esforço:</span>
              {activeEffortSymptoms.length > 0 ? (
                <p className="text-rose-900 font-bold mt-0.5">
                  {activeEffortSymptoms.join(', ')}
                </p>
              ) : (
                <p className="text-emerald-800 font-medium mt-0.5">Nenhum sinal limitante relatado</p>
              )}
              {esforco.outrosSinais && (
                <p className="text-slate-600 text-[10px] mt-0.5">{esforco.outrosSinais}</p>
              )}
            </div>
          </div>

          {/* Quadro de Dor & Escala Visual Analógica */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                Quadro de Dor e Desconfortos (EVA)
              </span>
              {dor.senteDor === 'sim' && allPains.length > 1 && (
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-1.5 py-0.5 rounded">
                  {allPains.length} regiões
                </span>
              )}
            </div>

            {dor.senteDor === 'sim' && allPains.length > 0 ? (
              <div className="space-y-2">
                {allPains.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className={`text-xs ${idx > 0 ? 'pt-2 border-t border-slate-200' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-900 leading-tight">
                        {allPains.length > 1 && (
                          <span className="text-teal-800 mr-1 font-extrabold">#{idx + 1}</span>
                        )}
                        <span className="text-rose-900">{p.localDor || 'Local não especificado'}</span>
                      </p>
                      {p.lado && p.lado !== 'nao_se_aplica' && (
                        <span className="text-[10px] text-slate-500 font-medium capitalize shrink-0">
                          ({p.lado})
                        </span>
                      )}
                    </div>

                    {p.tipoDor && (
                      <p className="text-slate-700 text-[11px] mt-0.5">
                        Sensação: {p.tipoDor}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-1 font-semibold">
                      <span className="bg-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                        Repouso: <strong>{p.escalaDorRepouso}/10</strong>
                      </span>
                      <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[10px] border border-amber-300">
                        Exercício: <strong>{p.escalaDorExercicio}/10</strong>
                      </span>
                    </div>

                    {(p.fatoresMelhora || p.fatoresPiora) && (
                      <div className="text-[10px] text-slate-600 mt-1 space-y-0.5">
                        {p.fatoresMelhora && <p>Alívio: {p.fatoresMelhora}</p>}
                        {p.fatoresPiora && <p>Agravamento: {p.fatoresPiora}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : dor.senteDor === 'sim' ? (
              <p className="text-slate-600 italic text-xs">Dor relatada, mas locais não especificados.</p>
            ) : (
              <p className="text-emerald-800 font-semibold text-xs">Sem queixas de dor ou desconforto atual.</p>
            )}
          </div>
        </div>

        {/* Idoso e Rotina */}
        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50/70 p-2.5 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-600 text-[10px] block">Qualidade do Sono</span>
            <span className="font-semibold text-slate-900 capitalize">
              {rotina.qualidadeSono || '—'} {rotina.horasSono ? `(${rotina.horasSono})` : ''}
            </span>
          </div>
          <div>
            <span className="text-slate-600 text-[10px] block">Nível de Estresse</span>
            <span className="font-semibold text-slate-900 capitalize">{rotina.nivelEstresse || '—'}</span>
          </div>
          <div>
            <span className="text-slate-600 text-[10px] block">Tempo Sentado / Hidratação</span>
            <span className="font-semibold text-slate-900">
              {rotina.tempoSentadoDia || '—'} {rotina.consumoAgua ? `• ${rotina.consumoAgua}` : ''}
            </span>
          </div>
          <div>
            <span className="text-slate-600 text-[10px] block">Prevenção de Quedas</span>
            <span className="font-semibold text-slate-900">
              {idoso.historicoQuedas12Meses === 'sim' ? `${idoso.quantidadeQuedas || 1} quedas` : 'Sem quedas'} 
              {idoso.usoDispositivoAuxilio !== 'nenhum' ? ` • Auxílio: ${idoso.usoDispositivoAuxilio}` : ''}
            </span>
          </div>
        </div>
      </section>

      {/* 4. AVALIAÇÃO FUNCIONAL & CONTROLE MOTOR */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>4. Avaliação Funcional e Controle Motor</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Cabeça e Ombros</span>
            <p className="font-semibold text-slate-900">
              {funcional.posturaCabeca || 'Alinhada'} • {funcional.posturaOmbros || 'Nivelados'}
            </p>
          </div>

          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Coluna Vertebral & Pelve</span>
            <p className="font-semibold text-slate-900">
              {funcional.posturaColuna || 'Preservada'} • {funcional.posturaPelve || 'Neutra'}
            </p>
          </div>

          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Membros Inferiores & Pés</span>
            <p className="font-semibold text-slate-900">{funcional.posturaJoelhosPes || 'Alinhamento neutro'}</p>
          </div>

          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Padrão de Marcha</span>
            <p className="font-semibold text-slate-900">{funcional.marchaPadrao || 'Harmônica'}</p>
          </div>

          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Teste Sentar e Levantar</span>
            <p className="font-semibold text-slate-900">{funcional.sentarLevantar || 'Adequado sem apoio'}</p>
          </div>

          <div>
            <span className="text-slate-600 text-[10px] block font-medium">Equilíbrio & Mobilidade</span>
            <p className="font-semibold text-slate-900">
              {funcional.equilibrioEstaticoDinamico || 'Bom controle'} • {funcional.mobilidadeColunaQuadril || 'Funcional'}
            </p>
          </div>

          {funcional.observacoesGerais && (
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-200">
              <span className="text-slate-600 text-[10px] block font-medium">Observações da Avaliadora:</span>
              <p className="text-slate-800 italic mt-0.5">{funcional.observacoesGerais}</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. MOVIMENTOS ESPECÍFICOS DO PILATES */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>5. Execução de Movimentos Específicos do Pilates</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-2 px-3 w-2/5">Movimento Avaliado</th>
                <th className="py-2 px-3 w-1/5">Desempenho</th>
                <th className="py-2 px-3">Observações / Ajustes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movimentos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3">
                    <strong className="text-slate-900">{item.nome}</strong>
                    <span className="block text-[10px] text-slate-600">{item.foco}</span>
                  </td>
                  <td className="py-2 px-3">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-2 px-3 text-[11px] text-slate-700">
                    {item.observacoes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. PLANEJAMENTO INICIAL & CONDUTA */}
      <section className="mb-6 break-inside-avoid">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-md border-l-4 border-teal-600 mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>6. Planejamento Inicial e Conduta Profissional</span>
        </div>

        <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200 text-xs space-y-2.5">
          <div>
            <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">
              Objetivos Terapêuticos Prioritários
            </span>
            <p className="font-semibold text-slate-900 whitespace-pre-line mt-0.5">
              {planejamento.objetivosPrioritarios || 'Não especificado'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
            <div>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">
                Estratégias e Exercícios Foco
              </span>
              <p className="text-slate-800 mt-0.5">{planejamento.estrategiasExercicios || '—'}</p>
            </div>

            <div>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">
                Cuidados e Contraindicações
              </span>
              <p className="text-rose-900 font-semibold mt-0.5">{planejamento.cuidadosContraindicacoes || 'Nenhuma contraindicação formal'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-200 text-[11px]">
            <div>
              <span className="text-slate-600 font-medium">Frequência Recomendada: </span>
              <strong className="text-teal-900">{planejamento.frequenciaRecomendada || '2x por semana'}</strong>
            </div>
            <div>
              <span className="text-slate-600 font-medium">Aparelhos / Acessórios: </span>
              <strong className="text-slate-900">{planejamento.aparelhosAcessoriosFoco || 'Reformer, Cadillac e Mat'}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DECLARAÇÃO E ASSINATURAS */}
      <section className="break-inside-avoid pt-2 border-t-2 border-slate-200">
        <p className="text-[10px] text-slate-600 italic leading-relaxed mb-6">
          &ldquo;Declaro que as informações acima são verdadeiras e completas. Comprometo-me a comunicar imediatamente à instrutora qualquer alteração no meu quadro de saúde, novas orientações médicas ou sintomas incomuns durante as aulas de Pilates.&rdquo;
        </p>

        <div className="grid grid-cols-2 gap-8 text-center text-xs mt-8">
          <div>
            <div className="border-b border-slate-400 pb-1 mb-1.5 min-h-[30px] flex items-end justify-center">
              <span className="font-semibold text-slate-800">
                {declaracao.assinaturaAlunoNome || aluno.nome || ''}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">Aluno</p>
          </div>

          <div>
            <div className="border-b border-slate-400 pb-1 mb-1.5 min-h-[30px] flex items-end justify-center">
              <span className="font-bold text-teal-950">
                {declaracao.assinaturaProfissional || 'Tássia - Educadora Física'}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">Educadora Física Responsável</p>
            <p className="text-[10px] text-pink-700 font-semibold mt-0.5">@tassia.movimento</p>
          </div>
        </div>
      </section>
    </div>
  );
};
