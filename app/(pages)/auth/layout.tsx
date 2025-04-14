import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom';

const layout = ({ children }: IChildren) => {
  return (
    <main className="app">
      <ButtonScrollToBottom />
      {children}
    </main>
  );
}

export default layout