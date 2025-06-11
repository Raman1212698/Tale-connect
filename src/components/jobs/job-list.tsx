import Link from "next/link"
import { JobPosting } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JobListProps {
  jobs: (JobPosting & {
    applications: { id: string }[]
  })[]
}

export function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No jobs posted</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            You haven&apos;t posted any jobs yet. Start by creating a new job posting.
          </p>
          <Button asChild>
            <Link href="/dashboard/jobs/new">Create job</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>
              {job.location} • {job.jobType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {job.description.length > 150
                ? `${job.description.slice(0, 150)}...`
                : job.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {job.applications.length} applications
            </div>
            <Button asChild variant="outline">
              <Link href={`/dashboard/jobs/${job.id}`}>View details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 