import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { SearchDoctorPage } from './searchDoctorPage';

export class HomePage extends BasePage {
  readonly path: string;
  readonly introModalSelector: string = '#introModal';
  readonly closeIntroModalSelector: string = 'button.close';
  readonly searchForCare: Locator;
  readonly featuredLinksDesktop: Locator;

  constructor(page) {
    super(page);

    this.path = this.baseUrl + '/';
    this.searchForCare = this.page.getByRole('link', { name: 'Search For Care' });
    this.featuredLinksDesktop = this.page.locator('section[aria-label*="Desktop"] div.cta-bar .cta-section');
  }

  async expectedCondition() {
    await expect(this.page).toHaveTitle(/CareFirst/);
  }

  async goToHomePage() {
    await this.navigate(this.path);
    await this.closeIntroModal();
  }

  async closeIntroModal() {
    await this.page.click(this.closeIntroModalSelector);
  }

  async assertFeaturedLinksAreVisible() {
    await expect(this.featuredLinksDesktop).toHaveCount(4);
  }

  async clickSearchForCare(): Promise<SearchDoctorPage> {
    await this.searchForCare.click();
    await this.switchToNewTabAndCheckURL('https://member.carefirst.com/mos/#/fadsdpublic/search/home');
    return new SearchDoctorPage(this.page);
  } 
}