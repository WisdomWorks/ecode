import { useEffect, useState } from 'react'

export const useDarkModeCodeEditor = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('themeCodeEditor') || 'light',
  )

  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)

    window.localStorage.setItem('themeCodeEditor', theme)
  }, [theme, colorTheme])

  return {
    setTheme,
    theme,
  }
}
