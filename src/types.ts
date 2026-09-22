export interface StudentData {
  nome: string;
  dataNascimento: string;
  idade: string;
  email: string;
  telefone: string;
  profissao: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  contatoEmergenciaParentesco: string;
}

export interface StudentObjectives {
  motivoPrincipal: string[];
  motivoOutro: string;
  oQueGostariaMelhorar: string;
  expectativas: string;
}

export interface PhysicalExperience {
  praticaAtividade: 'sim' | 'nao' | '';
  quaisAtividades: string;
  frequenciaSemanal: string;
  jaFezPilates: 'sim' | 'nao' | '';
  tempoPilates: string;
  experienciaPilatesDetalhes: string;
}

export interface HealthHistory {
  condicoes: {
    pressaoAlta: boolean;
    pressaoBaixa: boolean;
    diabetes: boolean;
    cardiacas: boolean;
    respiratorias: boolean; // Asma, Bronquite
    labirintite: boolean;
    osteoporose: boolean;
    herniaDisco: boolean;
    artroseArtrite: boolean;
    fibromialgia: boolean;
    problemasColuna: boolean;
    outrasCondicoes: string;
  };
  cirurgias: string;
  lesoes: string;
  fisioterapia: 'nunca' | 'atual' | 'passado' | '';
  fisioterapiaMotivo: string;
}

export interface MedicationData {
  usaMedicamentoContinuo: 'sim' | 'nao' | '';
  quaisMedicamentos: string;
  interferemExercicio: 'sim' | 'nao' | 'nao_sabe' | '';
  interferemDetalhes: string;
}

export interface PainDiscomfort {
  senteDor: 'sim' | 'nao' | '';
  localDor: string;
  lado: 'direito' | 'esquerdo' | 'bilateral' | 'central' | 'nao_se_aplica';
  tipoDor: string; // Pontada, queimação, pontual, irradiada, peso
  escalaDorRepouso: number; // 0 a 10
  escalaDorExercicio: number; // 0 a 10
  fatoresMelhora: string;
  fatoresPiora: string;
}

export interface EffortSymptoms {
  faltaArExcessiva: boolean;
  tontura: boolean;
  palpitacoes: boolean;
  nauseas: boolean;
  visaoTurva: boolean;
  doresNoPeito: boolean;
  nenhumSinal: boolean;
  outrosSinais: string;
}

export interface ElderlySpecific {
  historicoQuedas12Meses: 'sim' | 'nao' | '';
  quantidadeQuedas: string;
  medoDeCair: 'sim' | 'nao' | 'as_vezes' | '';
  usoDispositivoAuxilio: 'nenhum' | 'bengala' | 'andador' | 'muleta' | 'outro';
  outroDispositivo: string;
}

export interface RoutineHabits {
  qualidadeSono: 'excelente' | 'boa' | 'regular' | 'ruim' | '';
  horasSono: string;
  nivelEstresse: 'baixo' | 'moderado' | 'alto' | '';
  tempoSentadoDia: string;
  posturaTrabalho: string;
  consumoAgua: string;
}

export interface FunctionalAssessment {
  posturaCabeca: string;
  posturaOmbros: string;
  posturaColuna: string; // Lordose, cifose, escoliose
  posturaPelve: string;
  posturaJoelhosPes: string;
  marchaPadrao: string;
  sentarLevantar: string; // Facilidade, uso de apoio, compensação
  equilibrioEstaticoDinamico: string; // Apoio unipodal, oscilação
  mobilidadeColunaQuadril: string;
  alongamentoPosterior: string;
  observacoesGerais: string;
}

export type MovementStatus = 'realiza' | 'dificuldade' | 'dor' | 'nao_realiza';

export interface MovementItem {
  id: string;
  nome: string;
  foco: string;
  status: MovementStatus;
  observacoes: string;
}

export interface InitialPlanning {
  objetivosPrioritarios: string;
  estrategiasExercicios: string;
  cuidadosContraindicacoes: string;
  frequenciaRecomendada: string;
  aparelhosAcessoriosFoco: string;
}

export interface DeclarationData {
  alunoCiente: boolean;
  dataAvaliacao: string;
  cidade: string;
  assinaturaAlunoNome: string;
  assinaturaProfissional: string;
}

export interface AnamneseFormState {
  aluno: StudentData;
  objetivos: StudentObjectives;
  experiencia: PhysicalExperience;
  saude: HealthHistory;
  medicamentos: MedicationData;
  dor: PainDiscomfort;
  esforco: EffortSymptoms;
  idoso: ElderlySpecific;
  rotina: RoutineHabits;
  funcional: FunctionalAssessment;
  movimentos: MovementItem[];
  planejamento: InitialPlanning;
  declaracao: DeclarationData;
}
