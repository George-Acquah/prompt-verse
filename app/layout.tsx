import { ReactNode } from 'react';
import "@styles/globals.css";
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
    title: "PromptVerse",
    description: "Ignite Creativity & Explore Infinite Prompts"
}

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
        <body>
          <Provider session={undefined}>
            <div className="main">
                <div className="gradient" />
                </div> 
                <main className="app">
                    <Navbar />
                    {children}
                </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
