import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "Assisnte para auxiliar os usuarios com dúvidas relacionadas a integrações por API com a instutuição de pagamentos K8, a K8 oferece duas API's Pagamentos e Cobrancas e vc deve auxiliar o usuário em suas dúvidas, em como autenticar, chamar os endpoints e resolver possíveis problemas, lembrando que cada api tem sua URL específica e ambas autenticam no endpoint /token\n\n"
      },
      {
        "role": "user",
        "content": "Como me autentico na API do Cobrancas da K8?"
      },
      {
        "role": "assistant",
        "content": "Simples, você envia uma request para o endpoint /token com seu client_id, grant_type=password, scope= CobrancasAPI ou PagamentosAPI e client_secret \n\num exemplo de curl para autenticar no pagamentos \ncurl --location 'https://homolog.k8bank.com.br/PagamentosAPI/token' \\\n--header 'x-requested-with: XMLHttpRequest' \\\n--header 'Referer: https://homolog.k8bank.com.br/PagamentosAPI/swagger/ui/index' \\\n--header 'Content-Type: application/x-www-form-urlencoded' \\\n--data-urlencode 'scope=PagamentosAPI' \\\n--data-urlencode 'grant_type=password' \\\n--data-urlencode 'username=OxAyRMjuNXENu0TNBXN6AJYRyN5AZPGCUebSXbJe1v8=' \\\n--data-urlencode 'password=3CPxJHM1yBqrgDWBxr9p9u/dV/nEmMO5NMPxO7wGZuw='\n\nlembrando que ambos tem swagger e urls prórprias\n\nhttps://homolog.k8bank.com.br/PagamentosAPI/swagger/\nhttps://homolog.k8bank.com.br/CobrancasAPI/swagger/\n\nexemplo de resposta:\n\n{\n    \"access_token\": \"9N5RMA8Qpzk86Gorhzi5BFyIHB6mKYVuq59O4AT3pSox-XVwDxNvlpB_1mcBU_XEaDwI1fAxZCiXKRbaEDbof6t4ffxilU_-MvbAhyQp8oPBt-FuSSRnke_7DnS0X89OySc8WyhXRxhP9Zw9hWqKYyzlDOXnz4pifRSis6t7DQ2YiK-fBYbnTKBxnal9HK1LIpy4_BOIso7w88R9K39DzCOBKaGaZqZulWHX7VRUxJArE9nUTUE1CYeNeDDjtrs-uvpW26oeefQebcBkHA-kFy56-0Xjav9-dFlU17O4jGVrOJ86Iodd3Gkje29pum_W1iIBb-X72aiQrO5QcaSGkaxg-y0YnjakkevFfO2pXA63v6foLecA9ilDk5rZvdqG_TuGfwXMxVibS5iOtgv5Ow\",\n    \"token_type\": \"bearer\",\n    \"expires_in\": 3599\n}"
      },
      {
        "role": "assistant",
        "content": "Para se autenticar na API de Cobranças da K8, você precisará seguir os seguintes passos:\n\n1. Obtenha seu client_id e client_secret junto à K8.\n2. Faça uma requisição POST para o endpoint de autenticação fornecido pela API da K8, enviando seu client_id e client_secret no corpo da requisição.\n3. A resposta da requisição conterá um token de acesso (access_token) que você deverá utilizar para autenticar suas próximas requisições à API.\n\nCertifique-se de armazenar e utilizar adequadamente o access_token recebido, pois ele será necessário para acessar os recursos protegidos da API de Cobranças da K8."
      },
      {
        "role": "assistant",
        "content": "Caso esteja utilizando a API Pagamentos siga os passos abaixo para se autenticar:\n1. Obtenha seu client_id e client_secret junto à K8.\n2. Faça uma requisição POST para o endpoint /token da API Pagamentos da K8, enviando seu client_id, client_secret, grant_type=password e scope= PagamentosAPI no corpo da requisição.\n3. A resposta da requisição conterá um token de acesso (access_token) que você deverá utilizar para autenticar suas próximas requisições à API.\n\nLembre-se de armazenar e usar corretamente o access_token recebido para acess"
      },
      {
        "role": "assistant",
        "content": "os endpoints e recursos protegidos da API Pagamentos da K8."
      },
      {
        "role": "assistant",
        "content": "Caso tenha alguma dúvida específica sobre a autenticação na API de Cobranças da K8, por favor, me forneça mais informações para eu poder ajudá-lo de forma mais precisa."
      },
      {
        "role": "assistant",
        "content": "Qualquer outra dúvida ou problema relacionado à autenticação na API de Cobranças da K8, estou à disposição para ajudar."
      },
      {
        "role": "user",
        "content": "Como autenticar no cobrancas?"
      },
      {
        "role": "assistant",
        "content": "Para se autenticar na API de Cobranças da K8, você precisa seguir os seguintes passos:\n\n1. Obtenha seu client_id e client_secret fornecidos pela K8.\n2. Faça uma requisição POST para o endpoint de autenticação da API de Cobranças da K8, passando seu client_id, client_secret, grant_type=password e scope=CobrancasAPI no corpo da requisição.\n\nExemplo de requisição utilizando cURL:\n\n```\ncurl -X POST 'https://api.k8bank.com.br/CobrancasAPI/token' \\\n-H 'Content-Type: application/x-www-form-urlencoded' \\\n-d 'client_id=SEU_CLIENT_ID&client_secret=SEU_CLIENT_SECRET&grant_type=password&scope=CobrancasAPI'\n```\n\n3. Você receberá um token de acesso (access_token) na resposta da requisição, que deverá ser utilizado para autenticar suas próximas chamadas à API de Cobranças.\n\nLembre-se de armazenar de forma segura o access_token e incluí-lo no cabeçalho de suas requisições para acessar os recursos protegidos da API de Cobran"
      },
      {
        "role": "user",
        "content": "Quais endpoints estão disponíveis para serem usados no Cobrancas API?"
      },
      {
        "role": "assistant",
        "content": "Aqui está a lista completa dos endpoints disponíveis no Cobrancas API:\n\n/api/Assinatura\n/api/Assinatura/{id}\n/api/Cliente\n/api/Cliente/{id}\n/api/Cobranca\n/api/Cobranca/{id}\n/api/CobrancaBaixaManual\n/api/GerarRemessaCNAB240\n/api/GerarRemessaCNAB400\n/api/GerarRemessaCNAB240Santander\n/api/CobrancaCNAB\n/api/CobrancaFechamentoCaixa\n/api/CobrancaGerarNF\n/api/CobrancaGerarProtesto\n/api/CobrancaImprimirBoleto\n/api/CobrancaPorClienteId\n/api/CobrancaTemBoletoGerado\n/api/CobrancaVisualizar\n/api/LinkPagamento\n/api/LinkPagamento/{id}\n/api/LinkPagamentoEstatistica\n/api/LinkPagamentoVisualizar\n/api/NotaFiscal\n/api/NotaFiscal/{id}\n/api/NotaFiscalConfiguracaoEmpresa\n/api/NotaFiscalConfiguracaoServico\n/api/NotaFiscalConfiguracaoServico/{id}\n/api/NotaFiscalConsultaServicos\n/api/NotaFiscalMensagens\n/api/NotaFiscalRegimesEspeciaisTributacao\n/api/Produto\n/api/Produto/{id}\n/api/Protesto\n/api/Protesto/{id}\n/api/ProtestoHistorico\n/api/seller/sellers\n/api/seller/seller\nEsses endpoints cobrem uma ampla gama de funcionalidades relacionadas à gestão de cobranças, assinaturas, clientes, notas fiscais, links de pagamento, produtos, protestos, e mais, para o sistema do K8Bank. ​​\n\n\n\n"
      },
      {
        "role": "assistant",
        "content": "Aqui está a lista completa dos endpoints disponíveis para uso na API Cobrancas da K8:\n\n- /api/Assinatura\n- /api/Assinatura/{id}\n- /api/Cliente\n- /api/Cliente/{id}\n- /api/Cobranca\n- /api/Cobranca/{id}\n- /api/CobrancaBaixaManual\n- /api/GerarRemessaCNAB240\n- /api/GerarRemessaCNAB400\n- /api/GerarRemessaCNAB240Santander\n- /api/CobrancaCNAB\n- /api/CobrancaFechamentoCaixa\n- /api/CobrancaGerarNF\n- /api/CobrancaGerarProtesto\n- /api/CobrancaImprimirBoleto\n- /api/CobrancaPorClienteId\n- /api/CobrancaTemBoletoGerado\n- /api/CobrancaVisualizar\n- /api/LinkPagamento\n- /api/LinkPagamento/{id}\n- /api/LinkPagamentoEstatistica\n- /api/LinkPagamentoVisualizar\n"
      },
      {
        "role": "user",
        "content": "Quais os endpoints que eu posso usar no Pagamentos API?"
      },
      {
        "role": "assistant",
        "content": "Aqui está a lista completa dos endpoints disponíveis no Pagamentos API(Pay):\n\n/api/antifraude/incluir\n/api/BaixaManual\n/api/CancelaTransacao\n/api/CancelaTransacaoBoleto\n/api/CancelaTransacaoPIx\n/api/ConsultaTransacao\n/api/ConsultaTransacaoReferencia\n/api/ConsultaTransacoes\n/api/CriaTokenCartao\n/api/CriaTransacaoBoleto\n/api/CriaTransacaoBoletoCartaoPix\n/api/CriaTransacaoBoletoCartaoPixSplit\n/api/CriaTransacaoBoletoHibrido\n/api/CriaTransacaoBoletoSplit\n/api/CriaTransacaoCartao\n/api/CriaTransacaoCartaoSplit\n/api/CriaTransacaoCartoes\n/api/CriaTransacaoCartoesSplit\n/api/CriaTransacaoCheckout\n/api/CriaTransacaoPix\n/api/CriaTransacaoPixSplit\n/api/CriaTransacaoSaldoWebConta\n/api/especie31/criartitulo\n/api/especie31/alterartitulo\n/api/especie31/baixartitulo\n/api/marketplace/boleto\n/api/marketplace/cartao\n/api/marketplace/cartoes\n/api/marketplace/pix\n/api/marketplace/aprovar\n/api/marketplace/reprovar\n/api/marketplace/transacoes\n/api/marketplace/seller\n/api/marketplace/sellers\nEstes endpoints abrangem funcionalidades relacionadas a gestão de transações de pagamento, como criação, consulta, cancelamento, e baixa manual de transações, além de operações específicas para marketplace, antifraude, e gestão de boletos e PIX. ​"
      },
      {
        "role": "assistant"
      },
      {
        "role": "assistant",
        "content": "Aqui está a lista completa dos endpoints disponíveis para uso na API Pagamentos da K8:\n\n- /api/antifraude/incluir\n- /api/BaixaManual\n- /api/CancelaTransacao\n- /api/CancelaTransacaoBoleto\n- /api/CancelaTransacaoPIx\n- /api/ConsultaTransacao\n- /api/ConsultaTransacaoReferencia\n- /api/ConsultaTransacoes\n- /api/CriaTokenCartao\n- /api/CriaTransacaoBoleto\n- /api/CriaTransacaoBoletoCartaoPix\n- /api/CriaTransacaoBoletoCartaoPixSplit\n- /api/CriaTransacaoBoletoHibrido\n- /api/CriaTransacaoBoletoSplit\n- /api/CriaTransacaoCartao\n- /api/CriaTransacaoCartaoSplit\n- /api/CriaTransacaoCartoes\n- /api/CriaTransacaoCartoesSplit\n- /api/CriaTransacaoCheckout\n- /api/CriaTransacaoPix\n- /api/CriaTransacaoPixSplit\n- /api/CriaTransacaoSaldoWebConta\n- /"
      },
      {
        "role": "assistant",
        "content": "Esses são os endpoints disponíveis para serem utilizados na API Pagamentos da K8:\n\n- /api/antifraude/incluir\n- /api/BaixaManual\n- /api/CancelaTransacao\n- /api/CancelaTransacaoBoleto\n- /api/CancelaTransacaoPIx\n- /api/ConsultaTransacao\n- /api/ConsultaTransacaoReferencia\n- /api/ConsultaTransacoes\n- /api/CriaTokenCartao\n- /api/CriaTransacaoBoleto\n- /api/CriaTransacaoBoletoCartaoPix\n- /api/CriaTransacaoBoletoCartaoPixSplit\n- /api/CriaTransacaoBoletoHibrido\n- /api/CriaTransacaoBoletoSplit\n- /api/CriaTransacaoCartao\n- /api/CriaTransacaoCartaoSplit\n- /api/CriaTransacaoCartoes\n- /api/CriaTransacaoCartoesSplit\n- /api/CriaTransacaoCheckout\n- /api/CriaTransacaoPix\n- /api/CriaTransacaoPixSplit\n- /api/CriaTransacaoSaldoWebConta\n- /"
      },
      {
        "role": "assistant",
        "content": "/api/gerar-boleto\n- /api/criar-pagamento\n- /api/consultar-pagamento\n- /api/cancelar-pagamento\n- /api/listar-pagamentos\n- /api/gerar-link-pagamento\n- /api/criar-assinatura\n- /api/consultar-assinatura\n- /api/cancelar-assinatura\n- /api/listar-assinaturas\n- /api/criar-cliente\n- /api/consultar-cliente\n- /api/atualizar-cliente\n- /api/excluir-cliente\n\nEsses são alguns dos endpoints disponíveis na API Pagamentos da K8. Cada endpoint possui funcionalidades específicas para realizar operações relacionadas a pagamentos, boletos, assinaturas, clientes, entre outros."
      }
    ],
    temperature: 0.55,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
