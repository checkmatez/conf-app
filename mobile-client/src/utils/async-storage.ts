import * as React from 'react'
import { AsyncStorage } from 'react-native'

export const useItemFromAsyncStorage = (
  key: string,
): [boolean, string | null] => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [value, setValue] = React.useState<string | null>(null)
  React.useEffect(() => {
    const getItem = async (): Promise<void> => {
      setValue(null)
      setIsLoading(true)
      const val = await AsyncStorage.getItem(key)
      setValue(val)
      setIsLoading(false)
    }
    getItem()
  }, [key])

  return [isLoading, value]
}
