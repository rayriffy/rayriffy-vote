import { User } from 'firebase'

export interface IVoteProps {
  user: User
  onLogout(): void
}
