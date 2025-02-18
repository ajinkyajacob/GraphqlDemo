import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apollo = inject(Apollo)

  register(payload: {username:string; password: string}){
    return this.apollo.watchQuery<{jwt:string}>({
      query: gql `query{
        jwt
      }`,
      context: payload
    }).valueChanges.pipe(tap(({data}) => localStorage.setItem('jwt',data.jwt)))
  }


  login(payload: {username:string; password: string}){
    return this.apollo.watchQuery<{jwt:string}>({
      query: gql `query{
        jwt
      }`,
      context: payload
    }).valueChanges.pipe(tap(({data}) => localStorage.setItem('jwt',data.jwt)))
  }

  logout(){
    localStorage.clear()
  }
}
