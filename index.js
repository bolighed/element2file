const puppeteer = require('puppeteer');
const CONFIG = require('./config');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

async function processElements(CONFIG) {
    // Create an instance of the chrome browser
    const browser = await puppeteer.launch({
        headless: true,
        handleSIGINT: true,
        args: CONFIG.browser_args
    });

    for (const component of CONFIG.components) {
        // Create a new page
        const page = await browser.newPage();

        // Set some dimensions to the screen
        page.setViewport(component.viewport);

        // Navigate to url
        console.log("fetching url:", component.url)
        try {
            await page.goto(component.url);
        } catch (error) {
            console.log(`The URL ${component.url} can’t be reached`);
            throw error;
        }

        try {
            await page.waitForSelector(component.selector)
        } catch (error) {
            console.log(`It seems that the selector ${component.selector} is not present in url ${component.url}`);
            throw error;
        }

        const element = await page.evaluate((component) => {
            return document.querySelectorAll(component.selector)[0].outerHTML;
        }, component)

        const output_file_path = path.resolve(CONFIG.base_path, component.file_path);

        try {
            await writeFile(output_file_path, element)
            console.log(`${output_file_path} generated!`);
        } catch (error) {
            console.log(`there were issues writing ${output_file_path}`);
            throw error;
        }

    }

    // Close Browser
    browser.close();
};

module.exports = (CONFIG) => {
    processElements(CONFIG)
        .then(() => {
            console.log("DONE!");
        })
        .catch((error) => {
            console.log(error)
            process.exit(1);
        });
}
