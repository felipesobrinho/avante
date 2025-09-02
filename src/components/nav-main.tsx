"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
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
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="flex flex-col">
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <Link href={item.url} className="cursor-pointer">
                  {item.title}
                </Link>
              </SidebarMenuButton>

              {item.submenu && item.children && (
                <div className="ml-6 flex flex-col gap-1 mt-1">
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
                </div>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
