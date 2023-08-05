import { ReactNode } from 'react';
import "@styles/globals.css";
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import { Session } from 'next-auth';

export const metadata = {
    title: "PromptVerse",
    description: "Ignite Creativity & Explore Infinite Prompts"
}

type RootLayoutProps = {
  children: ReactNode;
  session: Session;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
        <body>
          <Provider session={session}>
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
