// spec: specs/update-personal-info-test-plan.md
// seed: tests/e2e/seed.spec.ts

import { test } from '../fixtures/testFixtures';

test.describe('Сценарий 1: Просмотр экрана "My Profile & Settings"', () => {
  test('Просмотр экрана "My Profile & Settings"', async ({ app }) => {
    await app.screens.login.navigate();
    await app.screens.login.login('vasyalibaba@gmail.com', 'Lr~7opKJ8');
    await app.screens.main.footer.clickMenuBtn();

    // 1. В боковом меню найти и кликнуть на опцию "My Profile & Settings" (иконка профиля)
    await app.screens.main.sideMenu.clickSettings();
    await app.screens.main.sideMenu.openMyProfileSeetings();

    // 2. Дождаться загрузки экрана "My Profile & Settings"
    await app.waitForDomReady();

    // 3. Проверить наличие заголовка "MY PROFILE & SETTINGS" в верхней части экрана
    await app.screens.profileSettings.verifyTitle();

    // 4. Проверить наличие кнопки закрытия (X) в правом верхнем углу
    await app.screens.profileSettings.verifyCloseButton();

    // 5. Проверить наличие секции "PERSONAL DETAILS"
    await app.screens.profileSettings.verifyPersonalDetailsSection();

    // 6. Проверить наличие секции "PLATFORM SETTINGS"
    await app.screens.profileSettings.verifyPlatformSettingsSection();

    // Общая проверка: все элементы отображаются корректно
    await app.screens.profileSettings.shouldBeVisible();
  });
});
