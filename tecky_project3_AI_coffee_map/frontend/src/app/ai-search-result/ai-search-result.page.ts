import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-ai-search-result',
  templateUrl: './ai-search-result.page.html',
  styleUrls: ['./ai-search-result.page.scss'],
})
export class AiSearchResultPage implements OnInit {
  id$ = this.activatedRoute.params.pipe(map((params) => +params['id']));

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
  ) { }

  ngOnInit() {
  }
  CafeSSS = [
    {
      id: 1,
      name: 'ABC Cafe',
      address: [22, 33],
      bean: 'illy',
    },
    {
      id: 2,
      name: 'DEF Cafe',
      address: [33, 44],
      bean: 'UCC',
    },
    {
      id: 3,
      name: 'GG Cafe',
      address: [44, 55],
      bean: 'Lavazza',
    },
  ];
}
async function getCafe() {

  const response = await fetch(`http://localhost:8080/cafe`);
  const result = await response.json();
  console.log(result)
}
getCafe()