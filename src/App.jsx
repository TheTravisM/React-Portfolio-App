import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Skills from './components/Skills/Skills'
import Work from './components/Work/Work'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <main>
      <NavBar />
      <Home />
      <Skills />
      <Work />
      <Projects />
      <Contact />
    </main>
  )
}

export default App
