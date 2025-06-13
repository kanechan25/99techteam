import { Header } from '@/components/Header'
import useTokens from '@/hooks/useTokens'

export default function Home() {
  const { tokens, isLoading, error } = useTokens()

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <Header />
      <main className='container mx-auto px-6 py-8'>
        <div className='space-y-8'>
          <section className='bg-muted rounded-lg p-6 transition-colors duration-300'>
            <h3 className='text-xl font-semibold text-foreground mb-4'>Token Prices</h3>

            {isLoading && (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-foreground'></div>
                <span className='ml-2'>Loading tokens...</span>
              </div>
            )}

            {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                <strong className='font-bold'>Error: </strong>
                <span>{error}</span>
              </div>
            )}

            {!isLoading && !error && tokens.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {tokens.map((token) => (
                  <div
                    key={token.currency}
                    className='bg-background border border-border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200'
                  >
                    <div className='flex items-center space-x-3'>
                      <img
                        src={token.imageUrl}
                        alt={token.currency}
                        className='w-8 h-8 rounded-full'
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-token-icon.png'
                        }}
                      />
                      <div className='flex-1'>
                        <h4 className='font-semibold text-foreground uppercase'>{token.currency}</h4>
                        <p className='text-sm text-muted-foreground'>${token.price.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !error && tokens.length === 0 && (
              <p className='text-center text-muted-foreground py-8'>No tokens available</p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
