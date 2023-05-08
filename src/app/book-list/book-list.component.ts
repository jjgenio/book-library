import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from './book.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() remove = new EventEmitter<string>();
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  removeBook(title: string) {
    this.remove.emit(title);
  }

}
