import { IUser } from './user';

export interface IChatMessage {
  created_at: Date;
  editable: boolean;
  id: string;
  sender: string;
  text: string;
  users: IUser;
}
