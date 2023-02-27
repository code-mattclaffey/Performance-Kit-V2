// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("Lesson 01 - Fonts", () => {    
    test.beforeEach( async ({page}) => {
      await page.goto("http://localhost:8080/");
      await page.getByRole("link", {name: "I want to work through it"}).click();
      await expect(page).toHaveURL("http://localhost:8080/tutorials/")
    })

    test.describe("Lesson 01", () => {
      test.beforeEach(async ({page}) => {
        await page.getByRole("link", {name: "Part One"}).click();
        await expect(page).toHaveURL("http://localhost:8080/tutorials/01/")
      })

      test("User can view tutorial for lesson 01 and mark it complete", async ({page}) => {
        await expect(page).toHaveTitle("Fonts Part One");
  
        await page.getByRole("button", {name: "Mark lesson complete"}).click();
        await expect(page.getByText("Lesson complete")).toBeTruthy();
      })

      test("User can view exercise for lesson 01", async ({page, context}) => {
        const pagePromise = context.waitForEvent('page');
        await page.getByRole("link", {name: "View exercise"}).click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        await expect(newPage).toHaveURL("http://localhost:8080/exercises/01/")
        await expect(newPage).toHaveTitle("Exercise - Loading Fonts");
      })
    })

    test.describe("Lesson 02", () => {
      test.beforeEach(async ({page}) => {
        await page.getByRole("link", {name: "Part Two"}).click();
        await expect(page).toHaveURL("http://localhost:8080/tutorials/02/")
      })

      test("User can view tutorial for lesson 02 and mark it complete", async ({page}) => {
        await expect(page).toHaveTitle("Fonts Part Two");
  
        await page.getByRole("button", {name: "Mark lesson complete"}).click();
        await expect(page.getByText("Lesson complete")).toBeTruthy();
      })

      test("User can view exercise for lesson 02", async ({page, context}) => {
        const pagePromise = context.waitForEvent('page');
        await page.getByRole("link", {name: "View exercise"}).click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        await expect(newPage).toHaveURL("http://localhost:8080/exercises/02/")
        await expect(newPage).toHaveTitle("Exercise - Loading Fonts");
      })
    })

})