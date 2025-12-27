import { Page, Locator, expect } from '@playwright/test';
import { BaseBrowserElement } from '../../core/browser-elements/BaseBrowserElement';
import { step } from '../../helpers/decorators';

/**
 * Personal Details Field Component
 * Represents a field in the Personal Details section with its value and edit icon
 *
 * Rules:
 * - Uses ONLY ID selectors (locator('#id'))
 * - Handles field value and edit icon visibility
 */
export class PersonalDetailsField extends BaseBrowserElement {
  private readonly fieldValueLocator: Locator;
  private readonly editIconLocator: Locator;
  private readonly fieldId: string;

  constructor(page: Page, fieldId: string, editIconId?: string, editIconClass?: string) {
    super(page);
    this.fieldId = fieldId;

    // Using ID selectors only - locator('#id')
    this.fieldValueLocator = this.locator(`#${fieldId}`);

    // Edit icon: use ID if provided, otherwise use class in the same container as field
    if (editIconId) {
      this.editIconLocator = this.locator(`#${editIconId}`);
    } else if (editIconClass) {
      // Find edit icon by class: locate field first, then find icon in the parent container
      // Class selector: "newIcons edit settingsEdit" becomes ".newIcons.edit.settingsEdit"
      const classSelector = editIconClass
        .split(' ')
        .map(cls => `.${cls}`)
        .join('');
      // Find the parent container of the field and locate icon within it
      // Use filter to ensure we get the icon that's in the same row as the field
      const fieldElement = this.page.locator(`#${fieldId}`);
      // Get parent and find icon with class - use filter to get the one closest to our field
      this.editIconLocator = fieldElement
        .locator('..')
        .locator(classSelector)
        .filter({ has: fieldElement })
        .or(fieldElement.locator('..').locator(classSelector))
        .first();
    } else {
      // Fallback: try fieldId-edit-icon pattern
      this.editIconLocator = this.locator(`#${fieldId}-edit-icon`);
    }
  }

  @step('Verify field is visible')
  async shouldBeVisible(): Promise<void> {
    await expect(this.fieldValueLocator).toBeVisible();
  }

  @step('Verify field contains value')
  async shouldContainValue(value: string | RegExp): Promise<void> {
    await this.shouldBeVisible();
    await expect(this.fieldValueLocator).toContainText(value);
  }

  @step('Verify field has exact value')
  async shouldHaveValue(value: string | RegExp): Promise<void> {
    await this.shouldBeVisible();
    await expect(this.fieldValueLocator).toHaveText(value);
  }

  @step('Get field value')
  async getValue(): Promise<string> {
    return (await this.fieldValueLocator.textContent()) || '';
  }

  @step('Verify edit icon is visible')
  async verifyEditIconVisible(): Promise<void> {
    await expect(this.editIconLocator).toBeVisible();
  }

  @step('Verify edit icon is not visible')
  async verifyEditIconNotVisible(): Promise<void> {
    await expect(this.editIconLocator).not.toBeVisible();
  }

  @step('Click edit icon')
  async clickEditIcon(): Promise<void> {
    await this.editIconLocator.click();
  }
}
