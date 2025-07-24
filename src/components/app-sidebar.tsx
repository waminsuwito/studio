"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BotMessageSquare,
  Users,
  LogOut,
  Wrench,
} from 'lucide-react';
import type { Operator } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';

const operators: Operator[] = [
  {
    id: 'OP-1',
    name: 'John Doe',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'man face',
  },
  {
    id: 'OP-2',
    name: 'Jane Smith',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'woman face',
  },
  {
    id: 'OP-3',
    name: 'Mike Johnson',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'person face',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Wrench className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-primary-foreground">
            EquipTrack
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton
                isActive={isActive('/')}
                tooltip="Dasbor"
              >
                <LayoutDashboard />
                <span>Dasbor</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/inspection">
              <SidebarMenuButton
                isActive={isActive('/inspection')}
                tooltip="Inspeksi AI"
              >
                <BotMessageSquare />
                <span>Inspeksi AI</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Operator</SidebarGroupLabel>
          <div className="flex flex-col gap-2">
            {operators.map((operator) => (
              <div
                key={operator.id}
                className="flex items-center gap-3 p-2 rounded-md"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={operator.avatar}
                    alt={operator.name}
                    data-ai-hint={operator.avatarHint}
                  />
                  <AvatarFallback>
                    {operator.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
                  {operator.name}
                </span>
              </div>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Button variant="ghost" className="justify-start gap-2">
          <LogOut />
          <span className="group-data-[collapsible=icon]:hidden">Keluar</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
