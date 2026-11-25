import React, { useState } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import ListaDeTarefas from './components/ListaDeTarefas';

function FormularioEControles() {
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [avisoVazio, setAvisoVazio] = useState(false);

  const {
    tarefas,
    filtro,
    tema,
    adicionarTarefa,
    alterarFiltro,
    alternarTema
  } = useTasks();

  // Contadores derivados automaticamente do estado global
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluida).length;
  const pendentes = total - concluidas;

  const handleSubmit = (e) => {
    e.preventDefault();
    const textoLimpo = nomeTarefa.trim();

    if (!textoLimpo) {
      setAvisoVazio(true);
      return;
    }

    setAvisoVazio(false);
    adicionarTarefa(textoLimpo);
    setNomeTarefa('');
  };

  const handleInputChange = (e) => {
    setNomeTarefa(e.target.value);
    if (avisoVazio) {
      setAvisoVazio(false);
    }
  };

  const classeBotaoFiltro = (valorFiltro) =>
    filtro === valorFiltro
      ? 'filtro-ativo transicao-tema px-3.5 py-2 rounded-[7px] text-xs sm:text-sm font-semibold cursor-pointer'
      : 'transicao-tema px-3.5 py-2 rounded-[7px] text-xs sm:text-sm font-semibold text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b] cursor-pointer';

  return (
    <main className="max-w-2xl mx-auto flex flex-col gap-5">
      {/* BLOCO 1: CABEÇALHO SÓLIDO + BOTÃO MUDAR TEMA + CONTADOR */}
      <header className="bg-primaria transicao-tema rounded-[12px] p-5 sm:p-7 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Gerenciador de Tarefas
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Checklist diário organizador de tarefas
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={alternarTema}
              title="Alternar tema de cores"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white"
                style={{
                  backgroundColor: tema === 'verde-agua' ? '#ccfbf1' : '#93c5fd'
                }}
              />
              <span>Mudar tema</span>
            </button>

            <span className="bg-white/20 text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
              {concluidas} de {total} concluídas
            </span>
          </div>
        </div>
      </header>

      {/* BLOCO 2: CARTÃO ISOLADO PARA ADICIONAR NOVA TAREFA */}
      <section
        aria-label="Adicionar nova tarefa"
        className="bg-white rounded-[12px] border border-[#cbd5e1] p-4 sm:p-5 shadow-sm"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="input-nova-tarefa" className="sr-only">
              Digite uma nova tarefa
            </label>
            <input
              id="input-nova-tarefa"
              type="text"
              placeholder="Digite uma nova tarefa..."
              autoComplete="off"
              value={nomeTarefa}
              onChange={handleInputChange}
              className="input-tarefa w-full rounded-[8px] px-4 py-3 text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="btn-primario transicao-tema rounded-[8px] px-6 py-3 text-sm sm:text-base font-semibold cursor-pointer shrink-0"
          >
            Adicionar
          </button>
        </form>

        {avisoVazio && (
          <p className="text-xs text-rose-600 font-medium mt-2">
            Por favor, escreva o nome da tarefa antes de adicionar.
          </p>
        )}
      </section>

      {/* BLOCO 3: QUADRO DE FILTROS E LISTA ESTRUTURADA */}
      <section
        aria-label="Quadro de tarefas"
        className="bg-white rounded-[12px] border border-[#cbd5e1] overflow-hidden shadow-sm"
      >
        <div className="bg-[#f8fafc] border-b border-[#cbd5e1] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2">
          <div role="tablist" aria-label="Filtrar tarefas" className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => alterarFiltro('TODAS')}
              className={classeBotaoFiltro('TODAS')}
            >
              Todas <span className="ml-1 opacity-85 font-normal">({total})</span>
            </button>
            <button
              type="button"
              onClick={() => alterarFiltro('PENDENTES')}
              className={classeBotaoFiltro('PENDENTES')}
            >
              Pendentes <span className="ml-1 opacity-85 font-normal">({pendentes})</span>
            </button>
            <button
              type="button"
              onClick={() => alterarFiltro('CONCLUIDAS')}
              className={classeBotaoFiltro('CONCLUIDAS')}
            >
              Concluídas <span className="ml-1 opacity-85 font-normal">({concluidas})</span>
            </button>
          </div>
        </div>

        <ListaDeTarefas />
      </section>
    </main>
  );
}

function App() {
  return (
    <TaskProvider>
      <FormularioEControles />
    </TaskProvider>
  );
}

export default App;