import { Page } from '@playwright/test';
import { Button } from '../../core/browser-elements';
import { step } from '../../helpers/decorators';

/**
 * Side Menu Component
 * Contains locators and interactions for the side menu
 */
export class SideMenuComponent {
  private readonly profileSettingsBtn: Button;

  constructor(private page: Page) {
    // Селектор для кнопки "My Profile & Settings" (иконка профиля) в боковом меню
    this.profileSettingsBtn = new Button(page, undefined, '#supportMenuItem');
  }

  @step('Click on My Profile & Settings')
  async clickSettings(): Promise<void> {
    await this.profileSettingsBtn.shouldBeVisible({ timeout: 10_000 });
    await this.profileSettingsBtn.click();
  }

  @step('Open My Profile Settings')
  async openMyProfileSeetings(): Promise<void> {
    // TODO: Нужен селектор для элемента "My Profile Settings" внутри открытого меню Settings
    const myProfileSettingsBtn = new Button(this.page, undefined, '#profileAndSettings');
    await myProfileSettingsBtn.shouldBeVisible({ timeout: 10_000 });
    await myProfileSettingsBtn.click();
  }
}
