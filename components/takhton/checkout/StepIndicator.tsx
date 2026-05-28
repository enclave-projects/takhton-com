/**
 * Step indicator component for checkout flow
 * @module components/takhton/checkout/StepIndicator
 */

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface Step {
  step: number
  title: string
  description: string
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Checkout progress">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.step
          const isCurrent = currentStep === step.step
          const isPending = currentStep < step.step

          return (
            <div key={step.step} className="flex items-center flex-1">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={cn(
                    'h-[2px] flex-1',
                    isCompleted || isCurrent ? 'bg-black' : 'bg-gray-200'
                  )}
                />
              )}

              {/* Step node */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'border-2 transition-colors duration-200',
                    isCompleted && 'bg-black border-black text-white',
                    isCurrent && 'bg-white border-black text-black',
                    isPending && 'bg-white border-gray-300 text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.step}</span>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-400'
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-xs',
                      isCurrent ? 'text-gray-600' : 'text-gray-400'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-[2px] flex-1',
                    isCompleted ? 'bg-black' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
