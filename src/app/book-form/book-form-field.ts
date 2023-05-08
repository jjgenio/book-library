import { ValidatorFn } from "@angular/forms";
import { Book } from "../book-list/book.model";

export interface BookFormField {
    name: keyof Book,
    label: string,
    validators?: Array<ValidatorFn>
}