import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { Process } from './components/Process';
import { Work } from './components/Work';
import { Culture } from './components/Culture';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { theme } from './theme';

export default function App() {
  return (
    <div className="tl-page">
      <Nav />
      <Hero />
      {theme.showMarquee && <Marquee />}
      <Services />
      <Stats />
      <Process />
      <Work />
      <Culture />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
