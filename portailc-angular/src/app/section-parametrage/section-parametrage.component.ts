import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-parametrage',
  templateUrl: './section-parametrage.component.html',
  styleUrls: ['./section-parametrage.component.css']
})
export class SectionParametrageComponent implements OnInit {

  typeParametrage = 'utilisateur';

  constructor() {}

  ngOnInit(): void {   
  }

  setTypeParametrage(typeParametrage: string) {
      this.typeParametrage = typeParametrage;
  }

}
