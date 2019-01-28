import { SortBooksByNamePipe } from './sort-books-by-name.pipe';

describe('SortBooksByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SortBooksByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
