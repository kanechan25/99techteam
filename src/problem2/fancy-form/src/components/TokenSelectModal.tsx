import { useState, useMemo } from 'react'
import { Token } from '@/stores/tokens'
import { useTheme } from '@/provider/themeProvider'

interface TokenSelectModalProps {
  isOpen: boolean
  onClose: () => void
  tokens: Token[]
  onSelectToken: (token: Token) => void
  disabledToken?: Token | null
  title: string
}

export const TokenSelectModal = ({
  isOpen,
  onClose,
  tokens,
  onSelectToken,
  disabledToken,
  title,
}: TokenSelectModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()

  // Popular tokens - you can make this a prop or keep it hardcoded
  const popularTokens = useMemo(() => {
    const popularSymbols = ['ETH', 'USDC', 'USDT', 'WBTC', 'BUSD']
    return tokens.filter((token) => popularSymbols.includes(token.currency))
  }, [tokens])

  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      const matchesSearch = token.currency.toLowerCase().includes(searchQuery.toLowerCase())
      const isNotDisabled = !disabledToken || token.currency !== disabledToken.currency
      return matchesSearch && isNotDisabled
    })
  }, [tokens, searchQuery, disabledToken])

  const handleSelectToken = (token: Token) => {
    onSelectToken(token)
    onClose()
    setSearchQuery('')
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-18'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative px-2 py-4 backdrop-blur-xl rounded-2xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col shadow-2xl shadow-black/50 dark:shadow-white/20 ring-1 ring-white/20 dark:ring-white/30 drop-shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.01] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.25)] ${
          theme === 'dark' ? 'bg-slate-900/95 border-slate-600' : 'bg-white/95 border-slate-300'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center space-x-3 pl-4'>
            <div className='relative'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-white'>
                  <path
                    d='M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                  <path d='M12 8v8M8 12h8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                </svg>
              </div>
              <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse'></div>
            </div>
            <h2 className='text-xl font-semibold text-foreground tracking-wider uppercase text-shadow-lg'>{title}</h2>
          </div>
          <button onClick={onClose} className='text-muted-foreground hover:text-foreground transition-colors p-1'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search tokens'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-muted border border-border border-[#5c5656] rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
          </div>
        </div>

        {/* Popular Tokens */}
        {!searchQuery && popularTokens.length > 0 && (
          <div className='px-4 pb-2'>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-sm font-medium text-muted-foreground tracking-wide'>{'Popular tokens'}</h3>
            </div>
            <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-2'>
              {popularTokens.slice(0, 8).map((token) => {
                const isDisabled = Boolean(disabledToken && token.currency === disabledToken.currency)

                return (
                  <button
                    key={token.currency}
                    onClick={() => !isDisabled && handleSelectToken(token)}
                    disabled={isDisabled}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border transition-all duration-200 min-w-[70px] ${
                      isDisabled
                        ? 'opacity-50 cursor-not-allowed bg-muted/30 border-border/30'
                        : 'bg-muted/20 border-border/50 hover:bg-gradient-to-br hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer backdrop-blur-sm'
                    }`}
                  >
                    <div className='relative mb-2'>
                      <img
                        src={token.imageUrl}
                        alt={token.currency}
                        className='w-8 h-8 rounded-full'
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-token-icon.png'
                        }}
                      />
                      {/* Chain badge for BSC tokens */}
                      {token.currency.includes('BSC') && (
                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full border border-background'></div>
                      )}
                    </div>
                    <span className='text-xs font-medium text-foreground text-center leading-tight'>
                      {token.currency}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Token List */}
        <div className='flex-1 overflow-y-auto'>
          {filteredTokens.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
              <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mb-4'
              >
                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                <path
                  d='M16 16L12 12L8 8'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p>{'No tokens found'}</p>
            </div>
          ) : (
            <div className='space-y-1 p-2'>
              {filteredTokens.map((token) => {
                const isDisabled = Boolean(disabledToken && token.currency === disabledToken.currency)

                return (
                  <button
                    key={token.currency}
                    onClick={() => !isDisabled && handleSelectToken(token)}
                    disabled={isDisabled}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 text-left ${
                      isDisabled
                        ? 'opacity-50 cursor-not-allowed bg-muted/50'
                        : 'hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 cursor-pointer backdrop-blur-sm drop-shadow-md'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='relative'>
                        <img
                          src={token.imageUrl}
                          alt={token.currency}
                          className='w-10 h-10 rounded-full'
                          onError={(e) => {
                            e.currentTarget.src = '/fallback-token-icon.png'
                          }}
                        />
                        {/* Chain badge for BSC tokens */}
                        {token.currency.includes('BSC') && (
                          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-background'></div>
                        )}
                      </div>
                      <div>
                        <div className='font-semibold text-foreground text-lg'>{token.currency}</div>
                        <div className='text-sm text-muted-foreground'>{token.currency}</div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium text-foreground'>${token.price.toFixed(6)}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
