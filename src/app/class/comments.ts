import { DatePipe } from '@angular/common';

export class Comments {
  constructor(
    public idcomment: number,
    public username: string,
    public userimage: string,
    public commentrecipe: string,
    public datecomment: Date,
    public classificationrecipe: number
  ) {}
}
