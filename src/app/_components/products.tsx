import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Wrench } from "lucide-react";
import Image from "next/image";


export default function Products() {

    return (
        <section id="produtos" className="py-20 px-6 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Produtos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Linha completa de peças de vedação para equipamentos pesados, 
              fabricadas com os mais altos padrões de qualidade.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-48 h-w-48 mb-4">
                  <Image src="/retentor.jpeg" width={192} height={192} alt="Retentores" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Retentores</h3>
                <p className="text-muted-foreground mb-4">
                  Retentores de alta performance para vedação de eixos rotativos e estacionários.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-48 h-w-48 mb-4">
                  <Image src="/aneis.jpeg" width={192} height={192} alt="Aneis" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Anéis O-Ring</h3>
                <p className="text-muted-foreground mb-4">
                  Anéis de vedação em diversos materiais e dimensões para aplicações hidráulicas.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-warning/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                  <Wrench className="w-7 h-7 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Gaxetas</h3>
                <p className="text-muted-foreground mb-4">
                  Gaxetas para cilindros hidráulicos e pneumáticos de equipamentos pesados.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-48 h-48 mb-4">
                  <Image src="/bucha-impacto.jpeg" width={192} height={192} alt="Buchas"/>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Buchas</h3>
                <p className="text-muted-foreground mb-4">
                  Buchas de bronze, nylon e materiais especiais para alta resistência ao desgaste.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-48 h-48 mb-4">
                  <Image src="/coxin-britador-1024.png" width={192} height={192} alt="Coxim"/>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Coxim</h3>
                <p className="text-muted-foreground mb-4">
                  Coxins antivibratórios para proteção de componentes sensíveis em equipamentos.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-48 h-48 mb-4">
                  <Image src="/regua-1024.png" width={192} height={192} alt="Réguas"/>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Réguas</h3>
                <p className="text-muted-foreground mb-4">
                  Réguas de impacto para britadores, garantindo proteção contra desgaste e prolongando a vida útil dos equipamentos.
                </p>
                <Button variant="secondary" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
}