import { lazy, Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';

const Skills = lazy(() => import('./components/Skills/Skills'));
const Work = lazy(() => import('./components/Work/Work'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function App() {
  return (
    <main>
      <NavBar />
      <Home />
      <Suspense fallback={null}>
        <Skills />
        <Work />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  );
}

export default App;
