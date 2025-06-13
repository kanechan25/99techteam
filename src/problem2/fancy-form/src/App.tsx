import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CounterStoreProvider } from '@/provider/counterProvider'
import { QueryProvider } from '@/provider/queryProvider'
import { ThemeProvider } from '@/provider/themeProvider'
import { routers } from '@/routes/routes'
import './assets/css/App.css'

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <CounterStoreProvider>
          <BrowserRouter>
            <Routes>
              <Route>
                {routers.map((route) => (
                  <Route key={route.id} path={route.href} element={route.element} />
                ))}
                <Route path='*' element={<Navigate to='/' replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CounterStoreProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
