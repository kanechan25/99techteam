import { Header } from '@/components/Header'
import { SwapForm } from '@/components/SwapForm'
import useTokens from '@/hooks/useTokens'

export default function Home() {
  const { tokens, isLoading, error } = useTokens()

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <Header />
      <main className='container mx-auto px-6 py-8'>
        <div className='space-y-8'>
          <section className='flex justify-center'>
            <div className='w-full max-w-md'>
              <h2 className='text-2xl font-bold text-center text-foreground tracking-wider uppercase text-shadow-lg mb-6'>
                Swap Tokens
              </h2>
              {isLoading ? (
                <div className='flex items-center justify-center py-12'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-foreground'></div>
                  <span className='ml-2'>Loading tokens...</span>
                </div>
              ) : error ? (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                  <strong className='font-bold'>Error: </strong>
                  <span>{error}</span>
                </div>
              ) : (
                <SwapForm tokens={tokens} />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
