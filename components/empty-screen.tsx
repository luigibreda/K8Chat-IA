import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Quais endpoint existem?',
    message: `Liste para mim todos os endpoints da API do Cobrancas`
  },
  {
    heading: 'Como criar uma transação?',
    message: 'Me ensine a criar uma transação, me ensine passo a passo e de exemplos'
  },
  {
    heading: 'Como gerar um boleto?',
    message: `Me de o passo a passo de como me conectar à api do Pagamentos e chamar o endpoint criaTransacaoBoleto`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Aqui é a Kaká assistente virtual da K8!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Seja muito bem vindo, estou aqui para te ajudar com nossos sistemas:{' '}
          <ExternalLink href="http://homolog.k8bank.com.br/PagamentosUI/">Pagamentos</ExternalLink> e{' '}
          <ExternalLink href="http://homolog.k8bank.com.br/CobrancasUI/">Cobranças</ExternalLink>.
        </p>
        <p className="leading-normal text-muted-foreground">
          Você pode começar com perguntas como:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
