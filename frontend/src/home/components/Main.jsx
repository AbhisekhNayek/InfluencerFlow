import About from '../components/About.jsx';
import Features from '../components/Features.jsx';
import Contact from '../components/Contact.jsx';

function Main() {
  return (
      <main className="flex flex-col items-center w-full">
        <Features />
        <About />
        <Contact />
      </main>
  );
}
export default Main;
