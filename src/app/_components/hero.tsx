import { ArrowRight, Factory } from "lucide-react"
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function Hero() {

    return (
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-sidebar-background via-sidebar-accent to-sidebar-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-foreground px-4 py-2 rounded-full text-sm mb-6">
              <Factory className="w-4 h-4" />
              Líder em Peças de Vedação Industrial
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-sidebar-foreground mb-6 leading-tight">
              Peças de Vedação de
              <span className="text-primary"> Alta Performance</span> para Mineração
            </h1>
            <p className="text-lg text-sidebar-muted mb-8 leading-relaxed">
              Fabricamos peças de vedação com precisão milimétrica em torno mecânico, 
              atendendo as maiores mineradoras do Brasil. Qualidade e confiabilidade 
              para manter suas escavadeiras e tratores em operação contínua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"https://wa.me/9999999?text=Olá, tudo bem? Vim pelo site de vocês, gostaria de solicitar um orçamento!"}>
                <Button size="lg" className="text-lg px-8">
                    Fale com um Especialista
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                Ver Catálogo de Produtos
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
}