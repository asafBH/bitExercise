import { Component, OnInit } from '@angular/core';
import { SiblingComunicService } from 'src/app/services/sibling-comunic.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sibCom: SiblingComunicService) { }

  ngOnInit() {
  }

}
