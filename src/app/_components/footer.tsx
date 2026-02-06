import Image from "next/image";

export default function Footer() {

    return (
        <footer className="py-12 px-6 bg-sidebar-background text-sidebar-foreground">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src={'/logoavante.png'} width={50} height={50} alt="Avante Borrachas e Vedações" className="h-14 w-auto mb-4" />
              <p className="text-sidebar-muted text-sm">
                Líder em peças de vedação industrial para o setor de mineração.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sidebar-muted text-sm">
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Retentores</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Anéis O-Ring</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Gaxetas</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Buchas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sidebar-muted text-sm">
                <li><a href="#sobre" className="hover:text-sidebar-foreground transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Certificações</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Trabalhe Conosco</a></li>
                <li><a href="#contato" className="hover:text-sidebar-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sidebar-muted text-sm">
                <li>Seg - Sex: 08h às 18h</li>
                <li>Sáb: 08h às 12h</li>
                <li className="pt-2">(31) 3333-4444</li>
                <li>contato@avantevedacoes.com.br</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border pt-8 text-center text-sidebar-muted text-sm">
            <p>© 2024 Avante Borrachas e Vedações. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    )
}