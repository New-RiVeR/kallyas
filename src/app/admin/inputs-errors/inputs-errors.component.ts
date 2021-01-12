import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs-errors',
  templateUrl: './inputs-errors.component.html',
  styleUrls: ['./inputs-errors.component.scss']
})
export class InputsErrorsComponent implements OnInit {

  @Input() showErrors: any

  constructor() { }

  ngOnInit(): void {
  }

}
