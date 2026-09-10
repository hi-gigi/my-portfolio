import { About } from "./components/About";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { content } from "./model/content";

/**
 * Composition root. Pulls the Model (content) and hands slices of it
 * to each view. Views own their own presenters where they need logic.
 */
export default function App() {
  return (
    <>
      <Cursor />

      <Header
        wordmark={content.wordmark}
        nav={content.nav}
        resume={content.resume}
      />

      <main id="top">
        <Hero {...content.hero} />
        <Work {...content.work} />
        <About {...content.about} />
      </main>

      <Footer {...content.footer} />
    </>
  );
}
