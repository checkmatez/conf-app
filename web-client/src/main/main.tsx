import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useCurrentUserQuery } from '../generated/graphql'

export const Main: React.FC = () => {
  const { data } = useCurrentUserQuery()

  return (
    <Flex minHeight="100vh" minWidth="100vw" flexDirection="column">
      <Flex
        flexDirection="row"
        alignItems="center"
        width="100%"
        paddingX={4}
        height="60px"
        backgroundColor="blue.100"
      >
        <Flex marginLeft="auto" alignItems="center">
          <Text fontWeight="semibold" fontSize={20} marginX={4}>
            {data?.currentUser.username}
          </Text>
          <Avatar
            name={data?.currentUser.username}
            src={data?.currentUser.avatarUrl ?? undefined}
          >
            <AvatarBadge size="1.3rem" bg="green.500" />
          </Avatar>
        </Flex>
      </Flex>
      <Flex flex={1} flexDirection="column" marginX={2} marginTop={2}>
        <Outlet />
      </Flex>
    </Flex>
  )
}
