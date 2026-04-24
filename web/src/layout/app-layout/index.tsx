import React from 'react'
import Header from './components/header'

type Props = {
    children: React.ReactNode
}

function AppLayout({children}: Props) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header/>
      <main className="flex min-h-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
