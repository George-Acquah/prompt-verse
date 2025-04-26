import Footer from "@/components/footer";

const layout = ({ children }: IChildren) => {
  return (
    <main className="app">
      {children} <Footer />
    </main>
  );
};

export default layout;
