import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  iconuser: SafeHtml;
  iconuserhtml: string =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>  Login';
  btname: string = 'Login';

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    this.iconuser = this.sanitizer.bypassSecurityTrustHtml(this.iconuserhtml);
    this.name();
  }

  ngOnInit(): void {
    this.logado();
    this.name();
  }

  login() {
    if (localStorage.getItem('utilizador') == null) {
      return this.router.navigate(['login']);
    }
    return this.router.navigate(['usermenu']);
  }

  logado() {
    if (localStorage.getItem('id') == null) {
      return this.btname == 'Login';
    }
    return this.btname == localStorage.getItem('id');
  }

  name() {
    if (localStorage.getItem('id') == null) this.btname == 'Login';
    if (localStorage.getItem('id') != null)
      this.btname == localStorage.getItem('id');
  }
}
