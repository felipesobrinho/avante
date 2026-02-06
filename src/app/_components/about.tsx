import { CheckCircle2 } from "lucide-react";
import Image from "next/image";


export default function About() {

    return (
        <section id="sobre" className="py-20 px-6">
                <div className="container mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Excelência em Usinagem de Precisão
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Com mais de duas décadas de experiência no setor, a Avante Borrachas e Vedações se consolidou 
                        como referência na fabricação de peças de vedação para equipamentos pesados. 
                        Nossa especialização em torno mecânico nos permite entregar produtos com 
                        tolerâncias mínimas e acabamento superior.
                      </p>
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        Atendemos as principais mineradoras do país, fornecendo peças que garantem 
                        a operação contínua de escavadeiras, tratores, carregadeiras e outros 
                        equipamentos críticos para a operação.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-foreground">Certificação ISO 9001:2015</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-foreground">Matéria-prima de alta qualidade</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-foreground">Controle dimensional rigoroso</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl aspect-square p-4 flex items-center justify-center overflow-hidden">
                      <Image src={'/example.jpeg'} width={900} height={900} alt="Avante Borrachas e Vedações" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                  </div>
                </div>
              </section>
    )
}