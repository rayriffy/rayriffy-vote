import { User } from 'firebase'

export interface IProps {
  user: User
  onLogout(): void
}
