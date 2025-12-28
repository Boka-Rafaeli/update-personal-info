import { Page } from '@playwright/test';

export class NavBarComponent {
  constructor(private page: Page) {}

  async verifyTitle(): Promise<void> {}
}
