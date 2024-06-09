import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Home Page', () => {
  test('featured links are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    await homePage.assertFeaturedLinksAreVisible();
  });

  test('users can search for care', { tag:'@smoke' }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    const searchDoctorPage = await homePage.clickSearchForCare();
    const findADoctorText = await searchDoctorPage.getFindADoctorText();
    expect(findADoctorText).toContain('Find a Doctor');
    await searchDoctorPage.assertContinueAsGuestIsVisible();
  });
});
