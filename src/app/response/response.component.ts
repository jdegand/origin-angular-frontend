import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {

  responseState: any = window.history.state.data;
 
}

