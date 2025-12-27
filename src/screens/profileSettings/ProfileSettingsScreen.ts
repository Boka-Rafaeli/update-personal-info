import { Page } from '@playwright/test';
import { Button, Text } from '../../core/browser-elements';
import { step } from '../../helpers/decorators';
import { PersonalDetailsField } from '../../components/profileSettings/PersonalDetailsField';

/**
 * Profile Settings Screen
 * Composes components and provides screen-level actions
 *
 * Rules:
 * - NO direct locator calls (only via components)
 * - Coordinates multiple components
 * - Provides business-level actions
 */
export class ProfileSettingsScreen {
  private readonly page: Page;
  private readonly title: Text;
  private readonly closeButton: Button;
  private readonly personalDetailsSection: Text;
  private readonly platformSettingsSection: Text;

  // Personal Details fields - using ID selectors only
  public readonly tpNumberField: PersonalDetailsField;
  public readonly nameField: PersonalDetailsField;
  public readonly passwordField: PersonalDetailsField;
  public readonly emailAddressField: PersonalDetailsField;
  public readonly phoneField: PersonalDetailsField;

  constructor(page: Page) {
    this.page = page;

    // TODO: Запросить селекторы у пользователя
    // Заголовок "MY PROFILE & SETTINGS"
    this.title = new Text(page, undefined, 'h1:has-text("MY PROFILE & SETTINGS")'); // Временный селектор

    // Кнопка закрытия (X) в правом верхнем углу
    this.closeButton = new Button(page, undefined, '[data-cmd="close-profile-settings"]'); // Временный селектор

    // Секция "PERSONAL DETAILS"
    this.personalDetailsSection = new Text(page, undefined, 'text="PERSONAL DETAILS"'); // Временный селектор

    // Секция "PLATFORM SETTINGS"
    this.platformSettingsSection = new Text(page, undefined, 'text="PLATFORM SETTINGS"'); // Временный селектор

    // Personal Details fields - using ID selectors (#id)
    // Edit icons: using button IDs or class selectors within field elements
    // T.P Number is read-only, so no edit icon needed
    this.tpNumberField = new PersonalDetailsField(page, 'settingsTpNumber');
    // Name: use #settingsName, then find icon by class within it
    this.nameField = new PersonalDetailsField(
      page,
      'settingsName',
      undefined,
      'newIcons edit settingsEdit'
    );
    // Password: use button ID
    this.passwordField = new PersonalDetailsField(
      page,
      'settingsPassword',
      'settingsPasswordButton'
    );
    // Email: use #settingsEmail field and #settingsEmailButton icon
    this.emailAddressField = new PersonalDetailsField(page, 'settingsEmail', 'settingsEmailButton');
    // Phone: use #settingsPhoneNumberRow, then find icon by class within it
    this.phoneField = new PersonalDetailsField(
      page,
      'settingsPhoneNumberRow',
      undefined,
      'newIcons edit settingsEdit'
    );
  }

  @step('Verify Profile Settings screen is displayed')
  async shouldBeVisible(): Promise<void> {
    await this.title.shouldBeVisible();
    await this.closeButton.shouldBeVisible();
    await this.personalDetailsSection.shouldBeVisible();
    await this.platformSettingsSection.shouldBeVisible();
  }

  @step('Verify title is displayed')
  async verifyTitle(): Promise<void> {
    await this.title.shouldContainText('MY PROFILE & SETTINGS');
  }

  @step('Verify close button is displayed')
  async verifyCloseButton(): Promise<void> {
    await this.closeButton.shouldBeVisible();
  }

  @step('Verify Personal Details section is displayed')
  async verifyPersonalDetailsSection(): Promise<void> {
    await this.personalDetailsSection.shouldBeVisible();
  }

  @step('Verify Platform Settings section is displayed')
  async verifyPlatformSettingsSection(): Promise<void> {
    await this.platformSettingsSection.shouldBeVisible();
  }

  @step('Verify all Personal Details fields are displayed')
  async verifyAllPersonalDetailsFields(): Promise<void> {
    await this.tpNumberField.shouldBeVisible();
    await this.nameField.shouldBeVisible();
    await this.passwordField.shouldBeVisible();
    await this.emailAddressField.shouldBeVisible();
    await this.phoneField.shouldBeVisible();
  }
}
