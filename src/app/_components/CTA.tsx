import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";


export default function CTA() {

    return (
        <section className="py-20 px-6 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para garantir a performance dos seus equipamentos?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Entre em contato com nossa equipe e receba um orçamento personalizado 
            para as necessidades da sua operação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              (31) 3333-4444
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Mail className="w-5 h-5 mr-2" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </section>
    )
}