import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'
import { IconGitHub, IconGoogle } from '@/components/ui/icons'; 

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <div className="flex flex-col space-y-4"> {/* Ajuste o layout conforme necessário */}
        {/* Card do Assistente Virtual */}
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <img className="w-full" src='/kaka-k8-ia.jpg' alt="Kaká - Assistente Virtual da K8" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Kaká - Assistente Virtual da K8</div>
            <p className="text-gray-700 text-base">
              Conheça o Kaká, seu assistente virtual para tornar sua experiência ainda melhor.
            </p>
          </div>
        </div>

        <LoginButton
          provider="github"
          icon={<IconGitHub className="mr-2" />}
          text=" Login com GitHub"
        />
        <LoginButton
          provider="google"
          icon={<IconGoogle className="mr-2" />} // Certifique-se de ter um componente IconGoogle
          text=" Login com Google"
        />
      </div>
    </div>
  )
}
