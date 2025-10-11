import Banner from "@/app/components/Banner";
import Servicios from "@/app/components/Servicios";
import Testimonios from "@/app/components/Testimonios";
import Galeria from "@/app/components/Galeria";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <Servicios />
      <Testimonios />
      <Galeria />
      <Footer />
    </main>
  );
}
