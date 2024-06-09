import { expect, type Page } from '@playwright/test';
import config from '../playwright.config.ts';

export abstract class BasePage {
    baseUrl: string;
    page: Page;
  
    constructor(page: Page) {
      this.page = page;
      this.baseUrl = config?.use?.baseURL ?? 'https://www.carefirst.com';
      this.expectedCondition();
    }
  
    abstract expectedCondition(): void;

    async navigate(path: string) {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async getTitle() {
      return await this.page.title();
    }

    async switchToNewTabAndCheckURL(expectedURL: string) {
      // Wait for the new tab to open
      const newPagePromise = new Promise<Page>(resolve => this.page.once('popup', resolve));
      const newPage = await newPagePromise;
  
      // Switch to the new tab
      await newPage.bringToFront();
  
      // Check that the URL of the new tab matches the expected URL
      const actualURL = newPage.url();
      expect(actualURL).toBe(expectedURL);
      this.page = newPage;
    }
  };
  