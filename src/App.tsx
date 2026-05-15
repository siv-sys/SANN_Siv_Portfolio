import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { LanguageProvider } from './lib/language';

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <div className="aurora-bg" />
        <Navbar />
        <main className="flex-grow">
          <section id="home" className="scroll-mt-28">
            <Home />
          </section>
          <section id="about" className="scroll-mt-28">
            <About />
          </section>
          <section id="projects" className="scroll-mt-28">
            <Projects />
          </section>
          <section id="skills" className="scroll-mt-28">
            <Skills />
          </section>
          <section id="contact" className="scroll-mt-28">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
