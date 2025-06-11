import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { ConversationList } from "@/components/messages/conversation-list"

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      participants: true,
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Messages"
        text="Manage your conversations."
      />
      <div className="grid gap-8">
        <ConversationList conversations={conversations} />
      </div>
    </DashboardShell>
  )
} 