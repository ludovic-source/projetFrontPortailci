import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-parametrage',
  templateUrl: './section-parametrage.component.html',
  styleUrls: ['./section-parametrage.component.css']
})
export class SectionParametrageComponent implements OnInit {

  typeParametrage = '';

  //constructor(private route: ActivatedRoute) { }
  constructor() {}

  ngOnInit(): void {
  }

  setTypeParametrage(typeParametrage: string) {
      this.typeParametrage = typeParametrage;
  }

}
