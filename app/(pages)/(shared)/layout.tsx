import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({ children }: IChildren) => {
  return (
    <main className="app px-4 mx-auto max-w-7xl">
      <ButtonScrollToBottom />
      <Navbar />
      {children}
    </main>
  );
}

export default layout