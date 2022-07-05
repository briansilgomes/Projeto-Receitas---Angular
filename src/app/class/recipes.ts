export class Recipes {
  constructor(
    public idrecipe: number,
    public namerecipe: string,
    public preparationrecipe: string,
    public durationrecipe: string,
    public imagerecipe: string,

    public categoryname: string,
    public nameuser: string,
    public namestate: string,
    public namedifficulty: string,

    public classificationrecipe: number,

    public favorite: number,

    public daterecipe: Date,

    public highlight: number
  ) {}
}
