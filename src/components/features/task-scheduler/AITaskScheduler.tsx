'use client'

import { useState, useEffect } from 'react'
import { Brain, Calendar, Clock, Battery, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAIScheduler } from '@/hooks/useAIScheduler'
import { Task } from '@prisma/client'

export function AITaskScheduler() {
  const { tasks, insights, scheduleTask, optimizeSchedule } = useAIScheduler()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    // Load initial AI predictions and optimize schedule
    optimizeSchedule()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <span>AI Task Scheduler</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-purple-500 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{task.scheduledStart} - {task.scheduledEnd}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className={`w-4 h-4 ${
                  task.energyLevel === 'HIGH' ? 'text-green-500' :
                  task.energyLevel === 'MEDIUM' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className="text-sm">{task.aiScore}% Match</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {insights.map((insight, index) => (
            <Alert key={index} variant={insight.type === 'warning' ? 'destructive' : 'default'}>
              <AlertDescription>
                <div className="flex items-center">
                  {insight.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 mr-2" />
                  ) : (
                    <Brain className="w-4 h-4 mr-2" />
                  )}
                  <span>{insight.message}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export type AIInsight = {
  type: 'warning' | 'suggestion'
  message: string
  score: number
}

export type TaskWithAIData = Task & {
  aiScore: number
  energyLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  scheduledStart: string
  scheduledEnd: string
}