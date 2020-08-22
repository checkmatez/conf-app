import * as React from 'react'
import { SHOW_ONBOARDING_KEY } from '../config/constants'
import { useItemFromAsyncStorage } from '../utils/async-storage'
import { createContext } from '../utils/create-context'

interface OnboardingValue {
  showOnboarding: boolean
  setShowOnboarding: (value: boolean) => void
}

const [OnboardingContextProvider, useOnboarding] = createContext<
  OnboardingValue
>()

export { useOnboarding }

export const OnboardingProvider: React.FC = ({ children }) => {
  const [isLoading, showFromStorage] = useItemFromAsyncStorage(
    SHOW_ONBOARDING_KEY,
  )
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(false)
  React.useEffect(() => {
    setShowOnboarding(showFromStorage === null)
  }, [showFromStorage])

  if (isLoading) {
    return null
  }

  return (
    <OnboardingContextProvider value={{ showOnboarding, setShowOnboarding }}>
      {children}
    </OnboardingContextProvider>
  )
}
