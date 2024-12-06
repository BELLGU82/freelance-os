import { Metadata } from 'next'
import { AITaskScheduler } from '@/components/features/task-scheduler/AITaskScheduler'
import { FinanceOverview } from '@/components/features/finance/FinanceOverview'
import { ProjectTimeline } from '@/components/features/project/ProjectTimeline'
import { AIInsights } from '@/components/features/ai/AIInsights'

export const metadata: Metadata = {
  title: 'FreelanceOS - AI-Powered Freelance Management',
  description: 'Next-generation freelance management platform powered by AI',
}

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AITaskScheduler />
        <FinanceOverview />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <ProjectTimeline />
        </div>
        <AIInsights />
      </div>
    </main>
  )
}