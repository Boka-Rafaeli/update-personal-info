import { NavBarComponent } from '@/app/components/profile-and-settings/nav-bar';
import { PersonalDetailsComponent } from '@/app/components/profile-and-settings/personal-details';
import { PlatformSettingsComponent } from '@/app/components/profile-and-settings/platform-settings';
import { Page } from '@playwright/test';

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
  readonly personalDetails: PersonalDetailsComponent;
  readonly platformSettings: PlatformSettingsComponent;
  readonly navBar: NavBarComponent;

  constructor(private page: Page) {
    this.personalDetails = new PersonalDetailsComponent(page);
    this.platformSettings = new PlatformSettingsComponent(page);
    this.navBar = new NavBarComponent(page);
  }
}
