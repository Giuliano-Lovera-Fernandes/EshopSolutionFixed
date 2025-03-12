import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
