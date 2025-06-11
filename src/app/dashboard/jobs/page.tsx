import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { JobList } from "@/components/jobs/job-list"
import { CreateJobButton } from "@/components/jobs/create-job-button"

export default async function JobsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user || user.role !== "HIRER") {
    redirect("/dashboard")
  }

  const jobs = await prisma.jobPosting.findMany({
    where: {
      hirerId: user.id,
    },
    include: {
      applications: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Jobs"
        text="Manage your job postings and applications."
      >
        <CreateJobButton />
      </DashboardHeader>
      <div className="grid gap-8">
        <JobList jobs={jobs} />
      </div>
    </DashboardShell>
  )
} 