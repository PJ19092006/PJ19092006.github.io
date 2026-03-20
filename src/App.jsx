import React from "react";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/home";
import { Projects } from "./pages/Projects";
import { Campaign } from "./pages/Campaign/Campaign";
import ShootingStars from "./components/ui/Shootingstars";

function App() {
  return (
    <div className="App">
      <ShootingStars count={12} />
      <Navbar>
        <Home />
        <Projects />
        <Experience />
        <Campaign />
        <About />
        <Contact />
      </Navbar>
    </div>
  );
}

export default App;
