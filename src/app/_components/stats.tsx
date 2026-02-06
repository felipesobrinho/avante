export default function Stats() {

    return (
        <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">25+</p>
              <p className="text-muted-foreground mt-1">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground mt-1">Clientes Atendidos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">10K+</p>
              <p className="text-muted-foreground mt-1">Peças Fabricadas/Mês</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">99.8%</p>
              <p className="text-muted-foreground mt-1">Taxa de Satisfação</p>
            </div>
          </div>
        </div>
      </section>
    )
}