import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ChevronRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function NavLanding() {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={'/logoavante.png'} width={64} height={64} alt="Avante Borrachas e Vedações" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            <a href="#produtos" className="text-muted-foreground hover:text-foreground transition-colors">Produtos</a>
            <a href="#diferenciais" className="text-muted-foreground hover:text-foreground transition-colors">Diferenciais</a>
            <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline">Portal do Cliente</Button>
            </Link>
            <Link href={"https://wa.me/9999999?text=Olá, tudo bem? Vim pelo site de vocês, gostaria de solicitar um orçamento!"}>
              <Button className="hidden sm:flex">
                Solicitar Orçamento
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    )
}