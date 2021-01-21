import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  private sidenavToggle = new EventEmitter<void>();

  constructor() {}

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
