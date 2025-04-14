import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({ children }: IChildren) => {
  return (
    <main className="app">
      <ButtonScrollToBottom />
      {<Navbar />}
      {children}
    </main>
  );
}

export default layout