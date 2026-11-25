import React from 'react';
import { useTasks } from '../context/TaskContext';
import Tarefa from './Tarefa';

function ListaDeTarefas() {
  const { tarefas, filtro } = useTasks();

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'CONCLUIDAS') return tarefa.concluida;
    if (filtro === 'PENDENTES') return !tarefa.concluida;
    return true;
  });

  const obterMensagemVazia = () => {
    if (filtro === 'PENDENTES') return 'Nenhuma tarefa pendente no momento.';
    if (filtro === 'CONCLUIDAS') return 'Nenhuma tarefa concluída ainda.';
    return 'Sua lista está vazia. Adicione uma nova tarefa acima.';
  };

  return (
    <>
      {/* Cabeçalho Sutil da Tabela */}
      <div className="bg-[#f8fafc]/70 border-b border-[#e2e8f0] px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
        <span>Tarefa</span>
        <span className="pr-8">Situação</span>
      </div>

      {/* Lista de Tarefas ou Estado Vazio */}
      {tarefasFiltradas.length > 0 ? (
        <ul className="divide-y divide-[#e2e8f0]">
          {tarefasFiltradas.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))}
        </ul>
      ) : (
        <div className="py-12 px-6 text-center">
          <p className="text-sm text-[#64748b] font-medium">{obterMensagemVazia()}</p>
        </div>
      )}
    </>
  );
}

export default ListaDeTarefas;