import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { ApplicationList } from "@/components/applications/application-list"

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) {
    redirect("/auth/login")
  }

  const applications = await prisma.application.findMany({
    where: {
      OR: [
        {
          talentId: user.id,
        },
        {
          job: {
            hirerId: user.id,
          },
        },
      ],
    },
    include: {
      job: true,
      talent: {
        include: {
          talentProfile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Applications"
        text="Manage your job applications."
      />
      <div className="grid gap-8">
        <ApplicationList
          applications={applications}
          userRole={user.role}
        />
      </div>
    </DashboardShell>
  )
} 