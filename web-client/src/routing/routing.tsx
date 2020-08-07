import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/login-page'
import { Main } from '../main/main'
import { MessagesByChat } from '../messages-by-chat/messages-by-chat'
import { NotFoundPage } from './not-found-page'
import { PrivateRoute } from './private-route'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <PrivateRoute path="/" element={<Main />}>
        <PrivateRoute path="/" element={<MessagesByChat />} />
      </PrivateRoute>
      <PrivateRoute path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
