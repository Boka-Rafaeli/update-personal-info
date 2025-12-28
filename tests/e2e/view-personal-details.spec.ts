// spec: specs/update-personal-info-test-plan.md
// seed: tests/e2e/seed.spec.ts

import { test } from '../fixtures/testFixtures';

test.describe('Сценарий 2: Просмотр персональных данных (PERSONAL DETAILS)', () => {
  test('Просмотр персональных данных (PERSONAL DETAILS)', async ({ app }) => {
    await app.screens.login.navigate();
    await app.screens.login.login('vasyalibaba@gmail.com', 'Lr~7opKJ8');
    await app.screens.main.footer.clickMenuBtn();
    await app.screens.main.sideMenu.clickSettings();
    await app.screens.main.sideMenu.openMyProfileSeetings();
    await app.waitForDomReady();
  });
});
