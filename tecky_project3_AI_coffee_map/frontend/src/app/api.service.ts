import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//original API
export class ApiService {
  origin = 'http://localhost:8080';
  constructor() {}

  //method 1: updated by Beeno
  // async get(url: string, query: object) {
  //   //Eg. Object.entries 把object 變 key value pair
  //   //Eg. Object.entries({id:1,name:'alice'}) => [ [ 'id', 1 ], [ 'name', 'alice' ] ]
  //   let params = new URLSearchParams(Object.entries(query));
  //   let res = await fetch(this.origin + url + '?' + params);
  //   let json = await res.json();
  //   console.log('get', { url, query, json });
  //   return json;
  // }

  //method 2
  async get(url: string, query: object) {
    let result = await fetch(
      this.origin + url + '?' + new URLSearchParams(Object.entries(query))
    );
    let json = result.json();
    return json;
  }
}
