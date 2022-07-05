import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  estaAutenticado():boolean{
    let user = localStorage.getItem("user");
    if (user == null){return false;}
    return true;
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("perm");
    localStorage.removeItem("tarefa");
  }


}
