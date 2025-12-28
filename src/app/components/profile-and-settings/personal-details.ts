import { Page } from '@playwright/test';

export class PersonalDetailsComponent {
  constructor(private page: Page) {}

  async verifyPersonalDetailsSection(): Promise<void> {}
}
