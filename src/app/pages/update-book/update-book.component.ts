import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  public books: Book[];
 

  constructor(public apiService: BooksService, 
              private router: Router,
              private toastr: ToastrService){ }

  modificarLibro(bookId:string, title:string, type:string, author:string, price:number, photo:string){
    let updatedBook = new Book(parseFloat(bookId), title, type, author, price, photo);
    console.log(updatedBook);
    this.apiService.edit(updatedBook).subscribe((resp:Respuesta) =>{
      console.log(resp);
      if (resp.error)
      {
        this.toastr.warning('El libro no existe.', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.irBooks();
        this.apiService.books = resp.data;
        this.toastr.success('Libro modificado satisfactoriamente.', 'Success',
        {timeOut:2000, positionClass:'toast-top-center'});
    });
  }
    
  irBooks(){
    this.router.navigate(["/books"]);
}

ngOnInit():void{ }

}
