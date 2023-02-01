const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500';
const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
         "title": "C# Fundamentals"
    },
    "8a587ffb-a2d9-4aa7-a6b8-7fec4f683ee0": {
        "title": "new book", 
        "author": "Tsetska Popova",
        "_id": "8a587ffb-a2d9-4aa7-a6b8-7fec4f683ee0"
    }
};

describe('Tests', async function () {
    this.timeout(6000);

    let browser, page;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close()
    });

    beforeEach(async () => {
        page = await browser.newPage()
    });

    this.afterEach(async () => {
        page.close();
    });

    it('loads all books', async () => {
        page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }

            })
        })
        await page.goto(host);
        await page.click('text=Load all books');
        await page.waitForSelector('text= Harry Potter');
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');
    });

    it('create books', async () => {
        await page.goto(host);
        await page.fill('input[name=title]', 'Title');
        await page.fill('input[name=author]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() =='POST'),
            page.click('text=submit')
        ]);

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });
});