import { Award, Shield, Truck, Wrench } from "lucide-react";


export default function Diferentials() {

    return (
        <section id="diferenciais" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher a Avante?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos tecnologia, experiência e compromisso para entregar 
              as melhores soluções em vedação industrial.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Qualidade Certificada</h3>
              <p className="text-muted-foreground text-sm">
                Processos certificados ISO 9001 com rastreabilidade total de produção.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chart-2/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground text-sm">
                Logística otimizada para atender suas demandas com agilidade.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Suporte Técnico</h3>
              <p className="text-muted-foreground text-sm">
                Equipe especializada para auxiliar na especificação e aplicação.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chart-4/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Garantia Estendida</h3>
              <p className="text-muted-foreground text-sm">
                Confiança total com garantia em todos os nossos produtos.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}