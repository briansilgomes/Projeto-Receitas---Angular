import { Recipes } from './recipes';

export class Favorite {
  constructor(
    public idrecipe: number,
    public idfavorite: number,
    public iduser: number,
    public imagerecipe: string,
    public categoryname: string,
    public namerecipe: string
  ) {}
}
