import AppLayout from '@/layout/app-layout';
import React from 'react'

type Props = {
    children: React.ReactNode
}

function Layout({children}: Props) {
  return (
    <AppLayout>{children}</AppLayout>
  )
}

export default Layout;