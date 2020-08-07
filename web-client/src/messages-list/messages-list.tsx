import { Flex, Stack, StackProps, Text } from '@chakra-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputText } from '../components/input-text'
import {
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables,
  useAddChatMessageMutation,
  useMessagesQuery,
} from '../generated/graphql'
import { chatMessageAddedSubscription } from '../graphql/subscriptions/new-chat-message-subscription'

interface MessagesListProps extends StackProps {
  chatRoomId: string
}

interface FormValues {
  text: string
}

export const MessagesList: React.FC<MessagesListProps> = ({
  chatRoomId,
  ...stackProps
}) => {
  const { data, loading, subscribeToMore } = useMessagesQuery({
    variables: { chatRoomId },
    context: { server: 'chat' },
  })

  React.useEffect(
    () =>
      subscribeToMore<
        MessageAddedSubscription,
        MessageAddedSubscriptionVariables
      >({
        document: chatMessageAddedSubscription,
        variables: { chatRoomId },
        context: { server: 'chat' },
        updateQuery: (prev, { subscriptionData }) => {
          return {
            ...prev,
            messages: {
              ...prev.messages,
              nodes: [
                subscriptionData.data.chatMessageAdded,
                ...prev.messages.nodes,
              ],
            },
          }
        },
      }),
    [chatRoomId],
  )
  const [
    addChatMessage,
    { loading: addMessageLoading },
  ] = useAddChatMessageMutation({ context: { server: 'chat' } })

  const { register, handleSubmit, errors } = useForm<FormValues>()

  const submitHandler = (values: FormValues, e: any) => {
    addChatMessage({ variables: { chatRoomId, text: values.text } })
    e.target.reset()
  }

  return (
    <Stack flexDirection="column" spacing={2} {...stackProps}>
      {data?.messages.nodes.map((message) => (
        <Flex key={message.id}>
          <Text>{message.text}</Text>
        </Flex>
      ))}
      <Flex as="form" onSubmit={handleSubmit(submitHandler)}>
        <InputText
          label=""
          name="text"
          ref={register({ required: true })}
          error={errors.text?.message}
          size="lg"
        />
      </Flex>
    </Stack>
  )
}
