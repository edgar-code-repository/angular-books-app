import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../model/book';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(array: Array<Book>, args?: any): any {
    //console.log("[FilterByCategoryPipe][START]");

    let filteredArray: Array<Book>;
    let categorySelected = args[0];
    //console.log("[FilterByCategoryPipe][categorySelected: " + categorySelected + "]");

    if (array && categorySelected != undefined && categorySelected != -1) {
      filteredArray = array.filter((book: Book) => book.category.categoryId == categorySelected);
    }    
    else {
      filteredArray = array
    }

    //console.log("[FilterByCategoryPipe][END]");
    return filteredArray;

  }

}
