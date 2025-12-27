import { FooterComponent, SideMenuComponent } from '../../app/components';
import { Page } from '@playwright/test';

export class MainScreen {
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
  }
}
