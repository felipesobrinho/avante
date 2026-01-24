import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const beneficios = [
 {
  title: "Alta Durabilidade",
  desc: "Materiais resistentes para ambientes extremos.",
 },
 {
  title: "Entrega Rápida",
  desc: "Logística eficiente para todo o Brasil.",
 },
 {
  title: "Suporte Técnico",
  desc: "Especialistas prontos para te atender.",
 },
];

const produtos = ["Anéis de Vedação", "Retentores", "Gaxetas", "Vedação Hidráulica"];

export default function Home() {
 return (
  <>
   <div className="relative h-screen w-full mx-auto flex flex-col justify-around">

    <div className="absolute inset-0 bg-[url(/hero-bg.jpg)] bg-cover bg-center bg-blend-overlay opacity-30"></div>

    <header className="z-10 mx-auto w-full flex items-center jusitify-center">
     <div className="flex items-center justify-around w-full mx-auto px-6">

      <div className="flex gap-5 justify-center items-center">
       <h1 className="text-xl font-bold">Avante</h1>
      </div>

      <nav className="hidden md:flex gap-6 text-lg font-bold">
       <a href="#produtos" className="hover:text-slate-300">
        Produtos
       </a>
       <a href="#beneficios" className="hover:text-slate-300">
        Benefícios
       </a>
       <a href="#contato" className="hover:text-slate-300">
        Contato
       </a>
      </nav>

     </div>
    </header>

    <section>
     <div className="relative z-10 mx-auto flex gap-6 flex-col items-center w-full">
      <h2 className="text-4xl font-bold max-w-xl md:max-w-2xl text-center">
       Soluções em vedação industrial de alta performance
      </h2>

      <p className="max-w-xl md:max-w-2xl text-slate-200 text-lg text-center">
       Produtos confiáveis para aplicações industriais, hidráulicas e
       pneumáticas.
      </p>

      <Button
        variant="default"
        className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg"
      >
       <Link href="#contato" className="font-bold"> Solicitar Orçamento </Link>
      </Button>
     </div>
    </section>

    <section>
     <div className="relative z-10 w-full mx-auto flex flex-col gap-6 items-center">
      <h3 className="text-3xl font-bold">
       Quem somos?
      </h3>
      <p className="max-w-xl md:max-w-4xl text-lg text-center">
        Somos uma empresa especializada em soluções de vedação industrial, com foco em alta performance e durabilidade. Com mais de 10 anos de experiência no mercado, oferecemos produtos confiáveis para aplicações industriais, hidráulicas e pneumáticas.
      </p>
     </div>
    </section>

    <section id="beneficios">
     <div className="relative z-10 w-full mx-auto flex flex-col items-center justify-around gap-8">

      <h3 className="text-3xl font-bold">
       Por que escolher a Avante?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {beneficios.map((item) => (
        <div
         key={item.title}
         className="bg-white p-6 rounded-lg shadow-sm border text-accent"
        >
         <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
         <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
       ))}

      </div>
     </div>
    </section>
   </div>

   <section id="produtos" className="bg-gray-100 py-20">
    <div className="max-w-7xl mx-auto px-6">
     <h3 className="text-3xl font-bold mb-12 text-accent">Nossos Produtos</h3>

     <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      {produtos.map(
       (produto) => (
        <div
         key={produto}
         className="bg-white/70 text-accent border rounded-lg p-6 text-center font-medium hover:shadow-lg transition"
        >
         {produto}
        </div>
       ),
      )}
     </div>
    </div>
   </section>

   <section id="contato" className="bg-slate-900 text-white py-20">
    <div className="max-w-4xl mx-auto px-6 text-center">
     <h3 className="text-3xl font-bold">Precisa de uma solução sob medida?</h3>
     <p className="mt-4 text-slate-300">
      Entre em contato e receba um orçamento rápido e personalizado.
     </p>
     <a
      href="#"
      className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded"
     >
      Falar com Especialista
     </a>
    </div>
   </section>

   <footer className="bg-slate-950 text-slate-400 text-sm py-6">
    <div className="max-w-7xl mx-auto px-6 text-center">
     © 2026 Avante. Todos os direitos reservados.
    </div>
   </footer>
  </>
 );
}
