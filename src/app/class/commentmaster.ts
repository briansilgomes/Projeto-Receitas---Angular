export class Commentmaster {
  constructor(
    public idcomment: number,
    public iduser: number,
    public idrecipe: number,
    public commentrecipe: string,
    public datecomment: Date,
    public classificationrecipe: number
  ) {}
}
