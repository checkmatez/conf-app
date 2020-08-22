import { FontAwesome } from '@expo/vector-icons'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as React from 'react'
import { Image } from 'react-native'

const cacheImages = (images: (string | number)[]): Promise<void>[] =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })

const cacheFonts = (
  fonts: {
    [x: number]: Font.FontSource
  }[],
): Promise<void>[] => fonts.map((font) => Font.loadAsync(font))

export const useAssetsPreloading = (): boolean => {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    const cacheAssets = async (): Promise<void> => {
      // TODO: cache what is needed
      const imageAssets = cacheImages([
        // require('./assets/images/circle.jpg'),
      ])
      const fontAssets = cacheFonts([FontAwesome.font])

      await Promise.all([...imageAssets, ...fontAssets])
      setIsReady(true)
    }
    cacheAssets()
  }, [])

  return isReady
}
