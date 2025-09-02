"use client"

import { type Icon } from "@tabler/icons-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    submenu?: boolean
    children?: {
      title: string
      url: string
      icon?: Icon
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            if (!item.submenu || !item.children) {
              return (
                <SidebarMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    className="flex items-center gap-4"
                  >
                    {item.icon && <item.icon />}
                    {item.title}
                  </Link>
                </SidebarMenuItem>
              )
            } else {
              return (
                <SidebarMenuItem key={item.title}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.title}>
                      <AccordionTrigger className="flex items-center justify-start font-light ">
                        {item.icon && <item.icon />}
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col items-start justify-start ml-10 gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.url}
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
                          >
                            {child.icon && <child.icon className="w-4 h-4" />}
                            {child.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SidebarMenuItem>
              )
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

{/* <SidebarMenu>
  <SidebarMenuItem className="flex items-center gap-2">
    <SidebarMenuButton
      tooltip="Quick Create"
      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
    >
      <IconCirclePlusFilled />
      <span>Quick Create</span>
    </SidebarMenuButton>
    <Button
      size="icon"
      className="size-8 group-data-[collapsible=icon]:opacity-0"
      variant="outline"
    >
      <IconMail />
      <span className="sr-only">Inbox</span>
    </Button>
  </SidebarMenuItem>
</SidebarMenu> */}