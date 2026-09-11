import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { CaseStudyPage } from "./components/CaseStudy";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { content } from "./model/content";
import { useScrollToHash } from "./presenters/useScrollToHash";

function HomePage() {
  return (
    <>
      <Hero {...content.hero} />
      <Work {...content.work} />
      <About {...content.about} />
    </>
  );
}

/** Header/Footer/Cursor persist across routes; only `<main>` swaps. */
function Layout() {
  useScrollToHash();

  return (
    <>
      <Cursor />

      <Header
        wordmark={content.wordmark}
        nav={content.nav}
        resume={content.resume}
      />

      <main id="top">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<CaseStudyPage />} />
        </Routes>
      </main>

      <Footer {...content.footer} />
    </>
  );
}

/**
 * Composition root. Pulls the Model (content) and hands slices of it
 * to each view. Views own their own presenters where they need logic.
 */
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  );
}
