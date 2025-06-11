import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const talentNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
  },
  {
    title: "Events",
    href: "/dashboard/events",
  },
]

const hirerNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Jobs",
    href: "/dashboard/jobs",
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
  },
  {
    title: "Events",
    href: "/dashboard/events",
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const isHirer = pathname.includes("/dashboard/jobs")

  const navItems = isHirer ? hirerNavItems : talentNavItems

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 