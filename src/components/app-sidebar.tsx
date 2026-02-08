"use client"

import * as React from "react"
import {
  IconCategory,
  IconChartBar,
  IconDashboard,
  IconListDetails,
  IconPackage,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Painel de Controle",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: IconChartBar,
    },
    {
      title: "Clientes",
      url: "/dashboard/clientes",
      icon: IconUsers,
    },
    {
      title: "Estoque",
      url: "/dashboard/estoque",
      icon: IconListDetails,
      submenu: true,
      children: [
        {
          title: "Produtos",
          url: "/dashboard/estoque/produtos",
          icon: IconPackage,
        },
        {
          title: "Categorias",
          url: "/dashboard/estoque/categorias",
          icon: IconCategory,
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Configurações",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="flex items-center justify-center h-fit"
            >
              <a href="/dashboard">
                <Image src="/logoavante.png" alt="Logo" width={120} height={120} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
