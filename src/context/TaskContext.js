import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  tarefas: [
    { id: 1, nome: 'Estudar conceitos de React JS', concluida: true },
    { id: 2, nome: 'Desenvolver o Gerenciador de Tarefas', concluida: false },
    { id: 3, nome: 'Estudar lógica', concluida: false }
  ],
  filtro: 'TODAS', // 'TODAS' | 'PENDENTES' | 'CONCLUIDAS'
  tema: 'verde-agua' // 'verde-agua' | 'azul-marinho'
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tarefas: [
          ...state.tarefas,
          { id: Date.now(), nome: action.payload, concluida: false }
        ]
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tarefas: state.tarefas.map((tarefa) =>
          tarefa.id === action.payload
            ? { ...tarefa, concluida: !tarefa.concluida }
            : tarefa
        )
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tarefas: state.tarefas.filter((tarefa) => tarefa.id !== action.payload)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filtro: action.payload
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        tema: state.tema === 'verde-agua' ? 'azul-marinho' : 'verde-agua'
      };

    default:
      return state;
  }
}

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Sincroniza o atributo data-theme na tag <html> sempre que state.tema mudar
  useEffect(() => {
    if (state.tema === 'azul-marinho') {
      document.documentElement.setAttribute('data-theme', 'azul-marinho');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [state.tema]);

  const adicionarTarefa = (nome) => {
    dispatch({ type: 'ADD_TASK', payload: nome });
  };

  const alternarTarefa = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const removerTarefa = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  const alterarFiltro = (filtro) => {
    dispatch({ type: 'SET_FILTER', payload: filtro });
  };

  const alternarTema = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <TaskContext.Provider
      value={{
        tarefas: state.tarefas,
        filtro: state.filtro,
        tema: state.tema,
        adicionarTarefa,
        alternarTarefa,
        removerTarefa,
        alterarFiltro,
        alternarTema
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser utilizado dentro de um TaskProvider');
  }
  return context;
}