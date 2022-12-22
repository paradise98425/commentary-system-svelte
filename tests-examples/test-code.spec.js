import { expect, test } from '@playwright/test';

test('Read more link', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	// Click the get started link.
	await page.getByRole('link', { name: 'Read more' }).click();
	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.black-and-white/);
});

test('like button test', async ({ page }) => {
	// goes to the home page
	await page.goto('http://localhost:5173/');
	// clicks on the heart button
	await page.getByRole('button', { name: 'Icon for like- an outlined heart' }).click();
});

test('Leave your comment test', async ({ page }) => {
	// goes to the home page
	await page.goto('http://localhost:5173/');
	// focus on the inputfield to add comment
	await page.getByPlaceholder('Leave your comment').click();
	// enables to write comment
	await page.getByPlaceholder('Leave your comment').fill('Test comment from playwright');
	// submits the comment
	await page.getByPlaceholder('Leave your comment').press('Enter');
});

test('click the reply button', async ({ page }) => {
	// goes to the home page
	await page.goto('http://localhost:5173/');
	//since the Reply button is displayed only on hover, gotta hover first before selecting the button
	await page.getByText('Mayanna Jill Luxury in design! Amazing. Reply').hover();
	// finds and clicks the button for reply
	await page.getByRole('button', { name: 'Reply' }).click();
});

test('Leave your comment in reply thread', async ({ page }) => {
	// goes to the home page
	await page.goto('http://localhost:5173/');
	// focus on the  inputfield for reply thread
	await page.getByPlaceholder('Leave your comment').first().click();
	// enables to write the thread comment
	await page.getByPlaceholder('Leave your comment').first().fill('Testing thread reply.');
	// submits the thread comment
	await page.getByPlaceholder('Leave your comment').first().press('Enter');
});
