import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TalentProfileForm } from "@/components/profile/talent-profile-form"
import { HirerProfileForm } from "@/components/profile/hirer-profile-form"

export default async function ProfilePage() {
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

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile information and preferences."
      />
      <div className="grid gap-8">
        {user.role === "TALENT" ? (
          <TalentProfileForm profile={user.talentProfile} />
        ) : (
          <HirerProfileForm profile={user.hirerProfile} />
        )}
      </div>
    </DashboardShell>
  )
} 