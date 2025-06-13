import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryProvider } from '@/provider/queryProvider'
import { ThemeProvider } from '@/provider/themeProvider'
import { Web3Provider } from '@/provider/web3Provider'
import { routers } from '@/routes/routes'
import './assets/css/App.css'

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Web3Provider>
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
        </Web3Provider>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
