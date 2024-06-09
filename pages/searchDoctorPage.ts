import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { escape } from 'querystring';

export class SearchDoctorPage extends BasePage {
  readonly path: string;
  readonly findADoctor: Locator;
  readonly continueAsGuest: Locator;

  constructor(page) {
    super(page);

    this.path = this.baseUrl + '/careers/';
    this.findADoctor = this.page.locator('h1.h1-margin');
    this.page.getByRole('link', { name: 'Search For Care' });
    this.continueAsGuest = this.page.getByRole('link', { name: 'Continue as Guest' });

  }

  async getFindADoctorText(): Promise<string> {
    return await this.findADoctor.innerText();
  }

  async expectedCondition() {
    await expect(this.page).toHaveTitle(/CareFirst Member/);
  }

  async assertContinueAsGuestIsVisible() {
    await expect(this.continueAsGuest).toBeVisible({ timeout: 5000});
  }

}