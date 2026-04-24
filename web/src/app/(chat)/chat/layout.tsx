import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import ChatSidebar from "./components/chat-sidebar/chat-sidebar";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
      <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <main>
          <div className="sticky top-0 z-10">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
