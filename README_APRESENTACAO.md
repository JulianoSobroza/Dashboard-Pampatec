# PampaTec — Protótipo frontend mockado para apresentação

Esta versão foi ajustada para funcionar como protótipo frontend demonstrativo, sem backend, sem banco de dados real e sem autenticação real.

## Como rodar

```bash
npm install
npm run dev
```

## O que foi estabilizado

- As chamadas ao backend foram substituídas por dados simulados no frontend.
- O login funciona em modo demonstrativo, com acesso direto aos perfis.
- As telas de gestor, empreendedor, avaliador, comissão, documentos e edital carregam dados mockados.
- O kanban do gestor preserva o fluxo com Pitch visível.
- A comissão técnica possui fila de propostas, avaliações, complementações e deliberação simulada.
- A linguagem das telas foi ajustada para apresentação, evitando mencionar backend, FastAPI ou banco.

## Perfis de demonstração

- empreendedor@pampatec.com.br
- gestor@pampatec.com.br
- avaliador@pampatec.com.br
- comissao@pampatec.com.br
- pesquisador@pampatec.com.br
- admin@pampatec.com.br

Senha para todos: `Senha@123`

Também é possível clicar diretamente nos cards de perfil na tela de acesso.

## Escopo desta versão

Esta versão é apenas frontend mockado. Não deve ser apresentada como sistema completo, sistema em produção ou sistema integrado com backend.
