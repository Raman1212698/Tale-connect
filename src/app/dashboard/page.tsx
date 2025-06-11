import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Overview } from "@/components/dashboard/overview"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      talentProfile: true,
      hirerProfile: true,
    },
  })

  if (!user) {
    redirect("/auth/login")
  }

  const stats = {
    applications: await prisma.application.count({
      where: {
        talentId: user.id,
      },
    }),
    jobs: await prisma.jobPosting.count({
      where: {
        hirerId: user.id,
      },
    }),
    messages: await prisma.message.count({
      where: {
        OR: [
          {
            senderId: user.id,
          },
          {
            receiverId: user.id,
          },
        ],
      },
    }),
    events: await prisma.event.count({
      where: {
        participants: {
          some: {
            id: user.id,
          },
        },
      },
    }),
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Here's an overview of your activity."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview stats={stats} role={user.role} />
      </div>
    </DashboardShell>
  )
} 