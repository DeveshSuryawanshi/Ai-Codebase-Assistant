import React from 'react'
import Header from './components/header'
import RepoIndexingInput from './components/repo-indexing-input'

function page() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-[140%] rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-amber-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/3 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl gap-12 px-4 py-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
        <Header />
        <RepoIndexingInput />
      </div>
    </main>
  )
}

export default page
