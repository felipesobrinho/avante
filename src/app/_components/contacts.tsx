import { Mail, MapPin, Phone } from "lucide-react";

export default function Contacts() {

    return (
        <section id="contato" className="py-20 px-6 bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Entre em Contato</h2>
              <p className="text-muted-foreground mb-8">
                Nossa equipe está pronta para atender você e encontrar a melhor 
                solução para suas necessidades de vedação industrial.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Endereço</h4>
                    <p className="text-muted-foreground">Rua Falcão, 195 - São Lucas <br />Belo Horizonte - MG, 30110-021</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Telefone</h4>
                    <p className="text-muted-foreground">(31) 98727-7111 (Telefone e WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">E-mail</h4>
                    <p className="text-muted-foreground">avanteborrachas@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="bg-secondary rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Solicite um Orçamento</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input 
                    type="text" 
                    placeholder="Empresa" 
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="tel" 
                  placeholder="Telefone" 
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea 
                  placeholder="Descreva sua necessidade..." 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <Button className="w-full" size="lg">
                  Enviar Solicitação
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div> */}
          </div>
        </div>
      </section>
    )
}