import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent {
  @Output()
  private sidenavToggle = new EventEmitter<void>();

  constructor() {}

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
