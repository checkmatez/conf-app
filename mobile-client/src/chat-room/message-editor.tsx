import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { InputAccessoryView, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Box } from '../components/box'
import { TextInput } from '../components/text-input'
import { useAddChatMessageMutation } from '../generated/graphql'

interface MessageEditorProps {
  chatRoomId: string
}

export const MessageEditor: React.FC<MessageEditorProps> = ({ chatRoomId }) => {
  const [message, setMessage] = React.useState('')
  const [sendMessage, { loading, data, error }] = useAddChatMessageMutation({
    variables: { text: message, chatRoomId },
    onCompleted: () => {
      setMessage('')
    },
    context: { server: 'chat' },
  })
  console.log('error', error)
  console.log('data', data)

  const handleSend = () => {
    sendMessage()
  }

  return (
    <InputAccessoryView>
      <Box
        flexDirection="row"
        alignItems="center"
        marginVertical="3"
        paddingHorizontal="4"
      >
        <TextInput
          value={message}
          placeholder="Сообщение"
          keyboardType="default"
          returnKeyType="send"
          maxLength={100}
          blurOnSubmit
          underlineColorAndroid="transparent"
          textBreakStrategy="highQuality"
          onChangeText={(value) => setMessage(value)}
          onSubmitEditing={handleSend}
          flex={1}
          backgroundColor="primaryBackground"
          fontSize={20}
          borderRadius="2"
          paddingVertical="3"
          paddingLeft="3"
        />
        <BorderlessButton
          onPress={loading ? undefined : handleSend}
          style={styles.sendButton}
        >
          <FontAwesome name="send" color="white" size={26} />
        </BorderlessButton>
      </Box>
    </InputAccessoryView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  messageInput: {
    flex: 1,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
