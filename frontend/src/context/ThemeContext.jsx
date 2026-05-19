import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [tema, setTemaState] = useState(
    () => localStorage.getItem('tema') || 'claro'
  )

  // aplica el atributo al body cada vez que cambia el tema
  useEffect(() => {
    document.body.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  function toggleTema() {
    setTemaState(prev => prev === 'claro' ? 'oscuro' : 'claro')
  }

  function setTema(nuevoTema) {
    setTemaState(nuevoTema)
  }

  return (
    <ThemeContext.Provider value={{ tema, setTema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
