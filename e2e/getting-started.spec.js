// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("Getting started", () => {
  test.describe("User can visit the Getting Started page", async () => {
    
    test.beforeEach( async({page}) => {
      await page.goto("http://localhost:8080/");
      await page.getByRole("link", {name: "I want to work through it"}).click();
      await expect(page).toHaveURL("http://localhost:8080/tutorials/")
      await page.getByRole("link", {name: "Getting Started"}).click();
      await expect(page).toHaveURL("http://localhost:8080/tutorials/00/getting-started/")
    })

    test("And mark as complete", async ({page, browser}) => {
      await page.getByRole("button", {name: "Mark lesson complete"}).click();
      await expect(page.getByText("Lesson complete")).toBeTruthy();
    })
    test("And mark as uncomplete", async ({page}) => {
      await page.getByRole("button", {name: "Mark lesson complete"}).click();
      await page.getByText("Lesson complete").click()
      await expect(page.getByText("Mark lesson complete")).toBeTruthy();
    })
  })
})
