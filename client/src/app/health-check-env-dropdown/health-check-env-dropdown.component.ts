import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-health-check-env-dropdown',
  templateUrl: './health-check-env-dropdown.component.html',
  styleUrls: ['./health-check-env-dropdown.component.css']
})
export class HealthCheckEnvDropdownComponent implements OnInit {
  @Input() public environments: string[];
  @Input() public selectedEnvironment: string;
  @Output() environmentChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeEnvironment(newEnvironment) {
    this.environmentChanged.emit(newEnvironment);
  }

}
