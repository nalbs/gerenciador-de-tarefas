# 📋 Gerenciador de Tarefas

> Checklist diário organizador de tarefas desenvolvido em **React JS** para a disciplina de **Linguagem de Programação para Internet**.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-Package_Manager-2C8EBB?style=flat-square&logo=yarn&logoColor=white)

---

## 📖 Sobre o Projeto

O **Gerenciador de Tarefas** é uma *Single Page Application* (SPA) desenvolvida com o objetivo de consolidar a arquitetura moderna de interfaces reativas no front-end utilizando **React JS**. A aplicação permite organizar atividades diárias de forma prática, responsiva e sem recarregamento de página, operando sobre a **Virtual DOM** para atualizações rápidas e eficientes.

---

## ✨ Funcionalidades

- **Adição de Tarefas:** Formulário controlado com validação inline que impede o cadastro de tarefas vazias e limpa o campo automaticamente após a inclusão.
- **Controle de Conclusão:** Caixa de seleção (*checkbox*) personalizada que alterna o status entre **Pendente** e **Concluída**, aplicando estilização visual (texto riscado e etiqueta de status).
- **Exclusão de Tarefas:** Botão discreto em cada item para remover tarefas da lista.
- **Filtragem Dinâmica por Status:** Abas interativas (**Todas**, **Pendentes** e **Concluídas**) acompanhadas de contadores atualizados em tempo real.
- **Alternância de Tema:** Botão **Mudar tema** no cabeçalho que alterna a paleta de cores da interface entre **Verde-Água** e **Azul-Marinho** via variáveis CSS.

---

## 🧠 Conceitos e Arquitetura Aplicados

O código foi estruturado seguindo as boas práticas de engenharia de front-end com React:

- **Componentização e Reusabilidade:** Interface dividida em componentes funcionais autônomos e com responsabilidades bem definidas (`App`, `ListaDeTarefas`, `Tarefa` e `TaskProvider`).
- **Gerenciamento de Estado Global (`Context API`):** Uso combinado de `createContext`, `useContext` e `useReducer` em um hook customizado (`useTasks`) para centralizar tarefas, filtro ativo e tema, evitando *prop drilling*.
- **Imutabilidade de Dados:** Todas as operações de estado (`ADD_TASK`, `TOGGLE_TASK`, `REMOVE_TASK`, `SET_FILTER` e `TOGGLE_THEME`) geram novas referências em memória usando o operador *spread* (`...`), `.map()` e `.filter()`, sem mutar o estado original.
- **Componentes Controlados e Eventos:** Sincronização bidirecional de formulários com `useState`, tratamento de eventos em *camelCase* (`onSubmit`, `onChange`, `onClick`) e prevenção de comportamento padrão do navegador com `e.preventDefault()`.
- **Reconciliação Otimizada:** Uso obrigatório da propriedade única `key={tarefa.id}` nas renderizações dinâmicas de listas com `.map()`.

---

## 📁 Estrutura de Pastas

```text
gerenciador-de-tarefas/
├── public/
│   └── index.html               # Estrutura HTML base, fonte Inter e Tailwind CSS
├── src/
│   ├── components/
│   │   ├── ListaDeTarefas.js    # Filtragem dinâmica e listagem com .map()
│   │   └── Tarefa.js            # Item individual com checkbox, badge e exclusão
│   ├── context/
│   │   └── TaskContext.js       # Estado global (useContext + useReducer + tema)
│   ├── App.js                   # Componente raiz, cabeçalho, formulário e abas
│   ├── index.css                # Variáveis CSS dos temas e estilos utilitários
│   └── index.js                 # Ponto de entrada da aplicação React
├── package.json                 # Dependências e scripts do projeto
├── yarn.lock                    # Árvore exata de dependências gerenciada pelo Yarn
└── README.md                    # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalados em sua máquina:
- [Node.js](https://nodejs.org/) (versão LTS)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Passo a passo

```bash
# 1. Clone este repositório
git clone [https://github.com/nalbs/gerenciador-de-tarefas.git](https://github.com/nalbs/gerenciador-de-tarefas.git)

# 2. Acesse a pasta do projeto
cd gerenciador-de-tarefas

# 3. Instale todas as dependências declaradas no package.json
yarn

# 4. Inicie o servidor local de desenvolvimento
yarn start
```

Após executar `yarn start`, a aplicação estará disponível no navegador em `http://localhost:3000`.

Para gerar a versão otimizada de produção:

```bash
yarn build
```

---

## 👨‍💻 Autor

Desenvolvido por **Nalberth Dutra** — Trabalho Final da disciplina de **Linguagem de Programação para Internet**.