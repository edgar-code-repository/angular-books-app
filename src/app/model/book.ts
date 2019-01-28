import { Category } from './category';
import { Author } from './author';

export class Book {
    bookId: number;
    name: string;
    isbn: string;
    imageName: string;
    description: string;
    category: Category;
    authors: Author[];
}
