import { useState, useMemo } from 'react'
import { Token } from '@/stores/tokens'

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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div className='relative px-2 py-4 bg-background border border-border rounded-2xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
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
              className='w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
          </div>
        </div>

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
              <p>No tokens found</p>
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
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all text-left ${
                      isDisabled
                        ? 'opacity-50 cursor-not-allowed bg-muted/50'
                        : 'hover:bg-muted/50 active:bg-muted cursor-pointer'
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
                        <div className='text-sm text-muted-foreground'>
                          {token.currency.includes('BSC') ? 'BNB Smart Chain' : 'Ethereum'}
                        </div>
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
