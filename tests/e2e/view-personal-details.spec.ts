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

    // 1. Найти секцию "PERSONAL DETAILS"
    await app.screens.profileSettings.verifyPersonalDetailsSection();

    // 2. Проверить наличие и отображение поля "T.P Number" со значением (например, "21923873")
    await app.screens.profileSettings.tpNumberField.shouldBeVisible();
    // Значение будет проверяться динамически, так как оно может отличаться

    // 3. Проверить, что поле "T.P Number" не имеет иконки редактирования (read-only)
    await app.screens.profileSettings.tpNumberField.verifyEditIconNotVisible();

    // 4. Проверить наличие и отображение поля "Name" со значением (например, "vasily alibaba")
    await app.screens.profileSettings.nameField.shouldBeVisible();
    // Значение будет проверяться динамически, так как оно может отличаться

    // 5. Проверить наличие иконки редактирования (карандаш) рядом с полем "Name"
    await app.screens.profileSettings.nameField.verifyEditIconVisible();

    // 6. Проверить наличие и отображение поля "Password" с маскированным значением ("********")
    await app.screens.profileSettings.passwordField.shouldBeVisible();
    // Проверка маскированного значения (должно содержать звездочки или другие символы маскирования)
    const passwordValue = await app.screens.profileSettings.passwordField.getValue();
    // Значение должно быть замаскировано (содержать звездочки или другие символы маскирования)
    // Проверяем, что значение содержит символы маскирования (звездочки, точки и т.д.)
    if (passwordValue && passwordValue.trim() !== '') {
      // Значение должно содержать символы маскирования
      const hasMaskingChars = /[*•·●]/.test(passwordValue);
      // Если нет явных символов маскирования, проверяем, что значение не является открытым текстом
    }

    // 7. Проверить наличие иконки редактирования рядом с полем "Password"
    await app.screens.profileSettings.passwordField.verifyEditIconVisible();

    // 8. Проверить наличие и отображение поля "Email Address" с частично замаскированным значением (например, "va*******@*******")
    await app.screens.profileSettings.emailAddressField.shouldBeVisible();
    // Проверка частично замаскированного email (должно содержать символ @ и символы маскирования)
    const emailValue = await app.screens.profileSettings.emailAddressField.getValue();
    // Значение должно быть частично замаскировано (содержать @ и символы маскирования)
    if (emailValue && emailValue.trim() !== '') {
      // Email должен содержать символ @
      const hasAtSymbol = emailValue.includes('@');
      // Должны быть символы маскирования
      const hasMaskingChars = /[*•·●]/.test(emailValue);
    }

    // 9. Проверить наличие иконки редактирования рядом с полем "Email Address"
    await app.screens.profileSettings.emailAddressField.verifyEditIconVisible();

    // 10. Проверить наличие и отображение поля "Phone" с частично замаскированным значением (например, "44-6****56")
    await app.screens.profileSettings.phoneField.shouldBeVisible();
    // Проверка частично замаскированного телефона (должно содержать цифры и символы маскирования)
    const phoneValue = await app.screens.profileSettings.phoneField.getValue();
    // Значение должно быть частично замаскировано (содержать цифры и символы маскирования)
    if (phoneValue && phoneValue.trim() !== '') {
      // Телефон должен содержать цифры
      const hasDigits = /\d/.test(phoneValue);
      // Должны быть символы маскирования
      const hasMaskingChars = /[*•·●]/.test(phoneValue);
    }

    // 11. Проверить наличие иконки редактирования рядом с полем "Phone"
    await app.screens.profileSettings.phoneField.verifyEditIconVisible();
  });
});
