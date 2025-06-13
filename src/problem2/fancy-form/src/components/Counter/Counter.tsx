import { useState } from 'react'

interface CounterProps {
  initialValue?: number
  label?: string
}

export const Counter = ({ initialValue = 0, label = 'Count' }: CounterProps) => {
  const [count, setCount] = useState(initialValue)

  const handleIncrement = () => setCount((prev) => prev + 1)
  const handleDecrement = () => setCount((prev) => prev - 1)
  const handleReset = () => setCount(initialValue)

  return (
    <div className='flex flex-col items-center gap-4 p-6 rounded-lg border border-border bg-card transition-colors duration-300'>
      <h2 className='text-xl font-semibold text-card-foreground'>{label}</h2>
      <p className='text-4xl font-bold text-card-foreground transition-colors' data-testid='count-value'>
        {count}
      </p>
      <div className='flex gap-3'>
        <button
          onClick={handleDecrement}
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md'
          aria-label='Decrease count'
        >
          -
        </button>
        <button
          onClick={handleReset}
          className='px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md'
          aria-label='Reset count'
        >
          Reset
        </button>
        <button
          onClick={handleIncrement}
          className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md'
          aria-label='Increase count'
        >
          +
        </button>
      </div>
    </div>
  )
}
