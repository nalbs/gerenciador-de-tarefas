import React from 'react';
import { useTasks } from '../context/TaskContext';

function Tarefa({ tarefa }) {
  const { alternarTarefa, removerTarefa } = useTasks();

  return (
    <li className="group flex items-center justify-between gap-3 px-4 sm:px-6 py-4 hover:bg-[#f8fafc] transition-colors">
      {/* Lado Esquerdo: Checkbox estilizado + Nome da Tarefa */}
      <label className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0 select-none">
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => alternarTarefa(tarefa.id)}
          className="sr-only"
        />

        <span
          className={`checkbox-custom w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 ${
            tarefa.concluida ? 'marcado' : ''
          }`}
        >
          {tarefa.concluida && (
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 10 8 14 16 6" />
            </svg>
          )}
        </span>

        <span
          className={`text-sm sm:text-[15px] font-medium truncate transition-colors ${
            tarefa.concluida ? 'line-through text-[#64748b]' : 'text-[#1e293b]'
          }`}
        >
          {tarefa.nome}
        </span>
      </label>

      {/* Lado Direito: Badge de Situação + Botão Discreto de Excluir */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span
          className={`transicao-tema text-xs font-semibold px-3 py-1 rounded-full ${
            tarefa.concluida ? 'badge-concluida' : 'bg-[#e2e8f0] text-[#64748b]'
          }`}
        >
          {tarefa.concluida ? 'Concluída' : 'Pendente'}
        </span>

        <button
          type="button"
          onClick={() => removerTarefa(tarefa.id)}
          title="Remover tarefa"
          aria-label={`Remover tarefa ${tarefa.nome}`}
          className="w-7 h-7 rounded-[7px] flex items-center justify-center text-lg leading-none text-[#64748b] hover:text-rose-600 hover:bg-rose-50 opacity-75 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer"
        >
          &times;
        </button>
      </div>
    </li>
  );
}

export default Tarefa;