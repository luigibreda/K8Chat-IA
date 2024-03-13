<a href="https://k8-chat-ia.vercel.app/">
  <h1 align="center">K8 AI Chatbot</h1>
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="https://github.com/luigibreda/K8Chat-IA/blob/main/public/print1.png">
  <h1 align="center">K8 AI Chatbot</h1>
</a>

<p align="center">
  Um modelo de aplicativo de chatbot de IA, construído com Next.js, o SDK de IA da Vercel, OpenAI e Vercel KV, transforma-se na apresentação do Chatbot K8. Este sistema inovador foi projetado para fornecer uma interface de comunicação dinâmica e inteligente, capacitando usuários e desenvolvedores a explorar o potencial da inteligência artificial de maneira acessível e eficiente.
</p>

<p align="center">
  <a href="#tecnologia"><strong>Tecnologia</strong></a> ·
  <a href="#provedor-de-ia"><strong>Provedores de IA</strong></a> ·
  <a href="#Criando-uma-Instância-de-Banco-de-Dados-KV"><strong>Criando uma Instância de Banco de Dados KV</strong></a> ·
  <a href="#rodando-localmente"><strong>Rodando localmente</strong></a> ·
  <a href="#autores"><strong>Autores</strong></a>
</p>
<br/>

## Tecnologia 

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Suporte para OpenAI (padrão), Anthropic, Cohere, Hugging Face, ou modelo customizados de IA e/ou LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Provedores de IA

Este template vem com o `gpt-3.5-turbo` da OpenAI como padrão. No entanto, graças ao [SDK de IA da Vercel](https://sdk.vercel.ai/docs), você pode mudar os provedores de LLM para [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co) ou usar [LangChain](https://js.langchain.com) com apenas algumas linhas de código.

## Criando uma Instância de Banco de Dados KV

Siga os passos descritos no [guia de início rápido](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) fornecido pela Vercel. Este guia o ajudará a criar e configurar sua instância de banco de dados KV na Vercel, permitindo que sua aplicação interaja com ele.

Lembre-se de atualizar suas variáveis de ambiente (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) no arquivo `.env` com as credenciais apropriadas fornecidas durante a configuração do banco de dados KV.


## Rodando localmente

Para executar o Chatbot de IA do Next.js, você precisará configurar as variáveis de ambiente definidas em `.env.example`. Recomenda-se o uso de [Variáveis de Ambiente Vercel](https://vercel.com/docs/projects/environment-variables) para essa finalidade, mas apenas um arquivo `.env` é necessário.

> **Nota:** Você não deve fazer commit do seu arquivo `.env`. Fazer isso exporia segredos que permitiriam a outros controlar o acesso às suas contas de OpenAI e de provedores de autenticação.

## Configuração

Siga estes passos para configurar seu ambiente:

1. Instalar o CLI do Vercel

   ```bash
   npm i -g vercel
   ```

2. Se quiser vincule com o Vercel e seu Github   (crie `.vercel` no diretório): `vercel link`
3. Baixe suas váriaveis de ambiente: `vercel env pull`
4. Instalando e executando

```bash
npm install
npm run dev
```

O seu aplicativo agora deve estar rodando em [localhost:3000](http://localhost:3000/).

## Autores

Código criado usando [Vercel](https://vercel.com), [GPT](https://chat.openai.com/) e [Next.js](https://nextjs.org) desenvolvido e idealizado por:

- Luigi Matheus ([@luigibreda](https://github.com/luigibreda/)) 
