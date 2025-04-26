import { ButtonScrollToTop } from '@/components/button-scroll-to-bottom';
import Footer from '@/components/footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({ children }: IChildren) => {
  return (
    <main className="app px-4 mx-auto max-w-7xl">
      <ButtonScrollToTop />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default layout