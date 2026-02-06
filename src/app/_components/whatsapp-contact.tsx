import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import Link from "next/link";

export default function WhatsappContact() {
 return (
  <Link
   href={"https://wa.me/9999999?text=Olá, tudo bem? Vim pelo site de vocês, gostaria de solicitar um orçamento!"}
   className="fixed bottom-2 right-4 hover:scale-110 shadow-2xl"
   target="blank"
  >
   <TooltipProvider>
    <Tooltip>
     <TooltipTrigger>
      <Image src="/whatsapp.png" alt={"Whatsapp Logo"} width={48} height={48} />
     </TooltipTrigger>
     <TooltipContent>
      <p className="text-lg">Solicitar orçamento agora!</p>
     </TooltipContent>
    </Tooltip>
   </TooltipProvider>
  </Link>
 );
}
