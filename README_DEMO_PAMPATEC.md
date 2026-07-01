# Ajustes da demo PampaTec

Esta versão mantém o estilo original do frontend React/Vite, mas reorganiza a demonstração para apresentar melhor o fluxo do processo seletivo da PampaTec.

## Como rodar

```bash
npm install
npm run dev
```

Acesse o endereço indicado pelo Vite, normalmente `http://localhost:5173/`.

## Usuários simulados

Senha para todos: `Senha@123`

- `empreendedor@pampatec.com.br`
- `gestor@pampatec.com.br`
- `avaliador@pampatec.com.br`
- `comissao@pampatec.com.br`
- `pesquisador@pampatec.com.br`
- `admin@pampatec.com.br`
- `multi@pampatec.com.br` — demonstra seleção de perfil múltiplo
- `inativo@pampatec.com.br` — demonstra bloqueio de usuário inativo

## Principais melhorias

1. Identidade PampaTec
   - Logo PampaTec aplicado no cabeçalho e na landing page.
   - Texto institucional: Plataforma de Gestão do Processo Seletivo; Incubadora Tecnológica PampaTec • UNIPAMPA.
   - Paleta verde/cinza preservando o estilo original do projeto.

2. Perfis separados conforme documentação
   - Empreendedor.
   - Gestor Administrativo.
   - Avaliador Externo.
   - Comissão Técnica.
   - Professor/Pesquisador.
   - Administrador do Sistema.

3. Login demonstrativo com seleção de perfil
   - Credenciais simuladas.
   - Mensagem de erro sem apagar os campos.
   - Usuário inativo bloqueado.
   - Seleção de perfil para usuário com múltiplos perfis.
   - Redirecionamento para o painel do perfil.

4. Nova tela de configuração de edital
   - Demonstra configuração de edital, documentos, critérios e prazos.
   - Modalidade fluxo contínuo ou em lote.
   - Etapas configuráveis.
   - Documentos obrigatórios.
   - Critérios/rubricas.
   - Validação de campos obrigatórios e datas.
   - Salvar rascunho e publicar edital.

5. Nova tela da Comissão Técnica
   - Separa comissão do avaliador externo.
   - Consolidação de avaliações individuais.
   - Destaque de divergência entre avaliadores.
   - Bloqueio de deliberação com avaliação pendente.
   - Justificativa obrigatória para deliberação.
   - Simulação de solicitação de complementação e julgamento de recurso.

6. Nova tela de Administrador
   - Usuários, perfis e situação ativa/inativa.
   - Matriz de permissões demonstrativa.
   - Trilha de auditoria simulada.

7. Status mais acessíveis
   - Status agora aparecem com ícone + cor + texto, não apenas cor.

## Limitações assumidas

Esta versão ainda não possui backend real. Logo, autenticação, auditoria, upload, permissões e persistência são simulados no frontend. O objetivo desta versão é demonstração visual e validação de fluxo com o cliente.
