export enum UserRole {
  Admin = 'admin',
  Attendee = 'Attendee',
}

export interface AccessTokenPayload {
  userId: string
  role: UserRole
}
