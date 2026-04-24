import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Waypoints,
} from "lucide-react"


// This is sample data.
export const data = {
  user: {
    name: "Devesh Suryawanshi",
    email: "devesh.suryawanshi@outlook.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Acme Inc",
      logo: Waypoints,
      plan: "Codebase",
    },
    {
      name: "Acme Corp.",
      logo: Waypoints,
      plan: "Codebase",
    },
    {
      name: "Evil Corp.",
      logo: Waypoints,
      plan: "Codebase",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  chats: [
    {
      name: "Find bugs in codebase",
      url: "#",
      icon: Frame,
    },
    {
      name: "Find usages of function X",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Find the authentication flow",
      url: "#",
      icon: Map,
    },
  ],
}