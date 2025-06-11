import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { EventList } from "@/components/events/event-list"
import { CreateEventButton } from "@/components/events/create-event-button"

export default async function EventsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const events = await prisma.event.findMany({
    where: {
      OR: [
        {
          organizerId: session.user.id,
        },
        {
          participants: {
            some: {
              id: session.user.id,
            },
          },
        },
      ],
    },
    include: {
      organizer: true,
      participants: true,
    },
    orderBy: {
      startDate: "asc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Events"
        text="Manage your community events."
      >
        <CreateEventButton />
      </DashboardHeader>
      <div className="grid gap-8">
        <EventList events={events} />
      </div>
    </DashboardShell>
  )
} 