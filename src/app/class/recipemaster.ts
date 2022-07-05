export class Recipemaster {
  constructor(
    public idrecipe: number,
    public namerecipe: string,
    public preparationrecipe: string,
    public durationrecipe: number,

    public idcategory: number,
    public iduser: number,
    public idstate: number,
    public iddifficulty: number,

    public imagerecipe: string,
    public daterecipe: Date
  ) {}
}
