const puppeteer = require('puppeteer');
const CONFIG = require('./config');
const fs = require('fs');
const path = require('path');

async function processElements(CONFIG) {
    // Create an instance of the chrome browser
    const browser = await puppeteer.launch();

    for (const component of CONFIG.components) {
        // Create a new page
        const page = await browser.newPage();
    
        // Set some dimensions to the screen
        page.setViewport(component.viewport);
    
        // Navigate to url
        await page.goto(component.url);
    
        await page.waitForSelector(component.selector)

        await page.evaluate((component) => {
            const t = document.querySelectorAll(component.selector)[0].outerHTML;
            return t;
        }, component)
        .then((element) => {
            const output_file_path = path.resolve(CONFIG.base_path, component.file_path);
            fs.writeFile(output_file_path, element, (err) => {
                if (err) throw err;
                console.log(`${output_file_path} generated!`);
            });
        });
    }

    // Close Browser
    browser.close();
};

module.exports = (CONFIG) => {
    processElements(CONFIG);
}
