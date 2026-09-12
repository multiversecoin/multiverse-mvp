# Multiverse MVP

Plataforma de economia digital territorial para Moema, São Paulo - MVP para Hackathon de Inovação e Impacto Humano.

## 🎬 Vídeo de Apresentação (2 min)

[docs/video/multiverse-coin-2min.mp4](docs/video/multiverse-coin-2min.mp4) — narração em pt-BR, demo do app e números de impacto.
Para regerar o vídeo, veja [tools/video/README.md](tools/video/README.md).

## 🌟 Visão Geral

A Multiverse é uma plataforma que conecta **PESSOAS + COMÉRCIO LOCAL + INTELIGÊNCIA + IMPACTO + SEGURANÇA** em um ecossistema digital territorial. O primeiro território experimental é **Moema, São Paulo**, funcionando como um laboratório para testar uma nova forma de economia local.

## 🚀 Funcionalidades

### Core Features
- **🏠 Home**: Dashboard com saldo, impacto, território e estabelecimentos próximos
- **🔍 Explorar**: Descoberta de comércio local com categorias e filtros
- **💰 Carteira Digital**: Saldo em MCC, histórico de transações e estatísticas
- **❤️ Impacto Social**: Acompanhamento de impacto pessoal e comunitário
- **🛡️ Segurança Territorial**: Mapa de segurança e pontos de apoio comunitário

### Experiência do Usuário
- **Mobile-first**: Design otimizado para uso com uma mão
- **Transações Demonstrativas**: Fluxo completo de compra com cashback
- **Atualização em Tempo Real**: Saldo e impacto atualizados após transações
- **Navegação Intuitiva**: 5 tabs principais com fácil acesso

## 🔒 Segurança

O MVP implementa guardrails abrangentes contra prompts maliciosos e ataques comuns:

- **Sanitização de Input**: Proteção contra XSS e injeção de código
- **Rate Limiting**: Prevenção contra força bruta e abuso
- **Validação de Transações**: Limites de valor e verificação de anomalias
- **Detecção de Atividade Suspeita**: Monitoramento de padrões anormais
- **Tokens Seguros**: Geração criptografada para cada transação
- **Auditoria**: Logging completo de eventos de segurança

📖 [Documentação Completa de Segurança](SECURITY.md)  
📖 [Proteção Contra Prompts Maliciosos](PROMPT_PROTECTION.md)

## 🛠️ Tech Stack

### Versão Next.js (Principal)
- **Next.js 14.2.5** (App Router)
- **React 18.3.1**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React Icons**

### Versão Standalone HTML
- **HTML5 + CSS3 + JavaScript (Vanilla)**
- **Tailwind CSS (via CDN)**
- **Google Fonts (Inter)**
- **Crypto API (nativa)**

## 📁 Estrutura do Projeto

```
multiverse-mvp/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/          # Componentes React
│   │   ├── App.tsx          # Componente principal
│   │   ├── Navigation.tsx   # Navegação inferior
│   │   ├── Home.tsx         # Tela inicial
│   │   ├── Explore.tsx      # Exploração de comércios
│   │   ├── MerchantDetail.tsx # Detalhes do estabelecimento
│   │   ├── Impact.tsx       # Impacto social
│   │   ├── Safety.tsx       # Segurança territorial
│   │   ├── Wallet.tsx       # Carteira digital
│   │   └── SecurityGuard.tsx # Componente de segurança
│   ├── lib/                 # Utilitários e dados
│   │   ├── security.ts      # Guardrails de segurança
│   │   ├── data.ts          # Dados demonstrativos
│   │   └── utils.ts         # Funções utilitárias
│   └── types/               # Definições TypeScript
│       └── index.ts
├── index.html               # Versão standalone (teste imediato)
├── package.json            # Dependências Next.js
├── SECURITY.md             # Documentação de segurança
├── PROMPT_PROTECTION.md    # Proteção contra prompts
└── README.md               # Este arquivo
```

## 🎯 Como Usar

### Versão Standalone (Recomendado para Testes Imediatos)

1. Abra o arquivo `index.html` diretamente no navegador
2. Nenhuma instalação ou dependência necessária
3. Funciona offline após carregamento inicial

### Versão Next.js (Para Desenvolvimento)

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🧪 Testes

### Cenários de Teste Implementados

1. **Navegação Completa**: Todas as 5 telas acessíveis
2. **Transação Demonstrativa**: Fluxo completo de compra
3. **Atualização de Estado**: Saldo e impacto atualizados
4. **Responsividade**: Mobile-first adaptável
5. **Guardrails de Segurança**: Validações e proteções ativas

### Testes de Segurança

- **Sanitização de Input**: Testado contra XSS
- **Rate Limiting**: Testado contra força bruta
- **Validação de Valores**: Testado contra valores extremos
- **Detecção de Anomalias**: Testado contra padrões suspeitos

## 📊 Dados Demonstrativos

O MVP utiliza dados simulados para demonstração:

- **10 estabelecimentos** em Moema
- **5 ofertas** disponíveis
- **5 pontos de apoio** comunitário
- **3 áreas de atenção** no mapa de segurança
- **10 transações** no histórico
- **Dados de impacto** por categorias

⚠️ **Nota**: Todos os dados são demonstrativos. Nenhuma transação real é processada.

## 🎨 Identidade Visual

A aplicação segue uma direção visual:
- **Sofisticada e moderna**
- **Futurista mas humana**
- **Territorial e brasileira**
- **Limpa e profissional**
- **Mobile-first**

## 🚧 Roadmap

### Próximas Fases (Fora do Escopo Inicial)

- [ ] Autenticação real (biometria, OAuth)
- [ ] Backend com API segura
- [ ] Integração com blockchain (visão de longo prazo)
- [ ] Sistema de pagamentos real
- [ ] IA para recomendações personalizadas
- [ ] Integração com APIs de segurança reais
- [ ] Expansão para outros territórios
- [ ] Sistema de notificações push

## 📄 Licença

Este projeto foi desenvolvido para o Hackathon de Inovação e Impacto Humano em São Paulo.

## 👥 Equipe

**Engenheiro Principal**: Devin (AI-powered development assistant)

## 📞 Contato

- **WhatsApp**: +55 11 99995-5356
- **Email**: contato@multiverse.com

## 🙏 Agradecimentos

Desenvolvido como parte do Programa Centelha 3 — FAPESP para promover inovação e impacto social em comunidades brasileiras.

---

**Status**: MVP Completo ✅  
**Versão**: 1.0.0  
**Data**: 12 de setembro de 2026  
**Território Piloto**: Moema, São Paulo, Brasil
