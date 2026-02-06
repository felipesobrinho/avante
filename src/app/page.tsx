import NavLanding from './_components/nav-landing';
import Hero from './_components/hero';
import Stats from './_components/stats';
import About from "./_components/about";
import Products from "./_components/products";
import Diferentials from "./_components/diferentials";
import CTA from './_components/CTA';
import Contacts from "./_components/contacts";
import Footer from "./_components/footer";
import WhatsappContact from './_components/whatsapp-contact';

export default function Home() {
 return (
  <div className="min-h-screen bg-background">
      <NavLanding />

      <Hero />

      <Stats  />

      <About />

      <Products />

      <Diferentials />

      <CTA />

      <Contacts />

      <Footer />

      <WhatsappContact />
    </div>
 );
}
