import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import React from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

interface MessageBubbleProps {
  id: string
  text: string
  sentAt: Date
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  sentAt,
}) => {
  const slideFromLeft = React.useRef(new Animated.Value(-1)).current

  React.useEffect(() => {
    Animated.spring(slideFromLeft, {
      toValue: 0,
      speed: 7,
      bounciness: 16,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={[
        styles.message,
        {
          transform: [
            {
              translateX: slideFromLeft.interpolate({
                inputRange: [-1, 0],
                outputRange: [-300, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.messageDate}>
        {formatDistanceToNow(new Date(sentAt), { locale: ru, addSuffix: true })}
      </Text>
      <Text style={styles.messageText}>{text}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  message: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgb(12,25,49)',
    flex: 0,
    alignSelf: 'flex-start',
  },
  messageDate: {
    color: 'white',
    fontSize: 12,
  },
  messageText: {
    color: 'white',
    fontSize: 20,
  },
})
