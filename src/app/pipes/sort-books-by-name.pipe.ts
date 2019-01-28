import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../model/book';

@Pipe({
  name: 'sortBooksByName'
})
export class SortBooksByNamePipe implements PipeTransform {

  transform(array: Array<Book>, args?: any): any {
    //console.log("[SortBooksByNamePipe][START]");

    if (array) {
    
        array.sort((a:Book,b:Book) => 
          {
            if (a.name < b.name) {
              return -1;
            }
            else if (a.name > b.name) {
              return 1;
            }
            else {
              return 0;
            }

          }

        );

    }

    //console.log("[SortBooksByNamePipe][END]");
    return array;
  }

}
