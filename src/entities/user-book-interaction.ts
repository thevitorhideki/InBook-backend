import { Book } from './book';
import { User } from './user';

export class UserBookInteraction {
  id: number;
  book: Book;
  user: User;
  interactionType: string;
  createdAt: Date;
  updatedAt: Date;
}
