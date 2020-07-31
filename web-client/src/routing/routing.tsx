import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/login-page'
import { ChatRoomsList } from '../chat-room/chat-rooms-list'
import { Main } from '../main/main'
import { NotFoundPage } from './not-found-page'
import { PrivateRoute } from './private-route'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <PrivateRoute path="/" element={<Main />}>
        <PrivateRoute path="/chat-rooms" element={<ChatRoomsList />} />
      </PrivateRoute>
      <PrivateRoute path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
