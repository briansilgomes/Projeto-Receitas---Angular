import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentmaster } from 'src/app/class/commentmaster';
import { Comments } from 'src/app/class/comments';
import { ServiceCommentsService } from 'src/app/services/service-comments.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comment: Comments[] = [];
  addcomment = new Commentmaster(0, environment.iduser, 0, '', new Date(), 0);

  menssage: string = '';
  addmenssage: string = '';
  classification: number = 0;
  idrecipe: number = 0;
  user: boolean = false;

  constructor(
    private serviceComment: ServiceCommentsService,
    private ativateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ativateRoute.params.subscribe((params) => {
      this.idrecipe = params['id'];
      this.getComments(this.idrecipe);
    });
    this.userlogin();
  }

  //Lista Comentários para a Receita
  getComments(id: number) {
    this.serviceComment.getComments(id).subscribe(
      (response) => {
        if (response.length == 0) {
          return (this.menssage = 'Ainda não existem comentários.');
        }
        return (this.comment = response);
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  //UserLogado
  userlogin() {
    if (localStorage.getItem('user') != null) {
      return (this.user = true);
    }
    return (this.user = false);
  }

  //Adicionar Comentário
  onSubmit() {
    this.addcomment.idrecipe = this.idrecipe;

    this.serviceComment.addComment(this.addcomment).subscribe(
      (response) => {
        this.addmenssage = 'Comentário adicionado com sucesso!';

        setTimeout(() => {
          this.onCancel();
          this.addmenssage = '';
          this.getComments(this.idrecipe);
        }, 2000);
      },

      (error) => {
        this.menssage = error;
      }
    );
  }

  onCancel() {
    this.addcomment.commentrecipe = '';
    this.addcomment.classificationrecipe = 0;
    window.scrollTo(0, 0);
  }
}
