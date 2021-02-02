const scraperObject = {
  url:
    "https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-vision-oc-10g-gddr6x-pci-express-4-0-graphics-card-white/6436219.p?skuId=6436219",
  testURL:
    "https://www.bestbuy.com/site/sandisk-cruzer-16gb-usb-2-0-flash-drive-black/9226875.p?skuId=9226875",
  attempts: 1,
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    const session = await page.target().createCDPSession();
    await session.send("Page.enable");
    await session.send("Page.setWebLifecycleState", { state: "active" });

    const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
    const chromeUserAgent = headlessUserAgent.replace(
      "HeadlessChrome",
      "Chrome"
    );
    await page.setUserAgent(chromeUserAgent);
    await page.setExtraHTTPHeaders({
      "accept-language": "en-US,en;q=0.8",
    });

    const sleep = (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let closeBrowser = false;
    let addToCartExists = false;
    try {
      await page.$eval(
        ".btn.btn-primary.btn-lg.btn-block.btn-leading-ficon.add-to-cart-button",
        (node) => node.innerHTML
      );
      addToCartExists = true;
      console.log("Add to cart button does exist.");
    } catch (err) {
      addToCartExists = false;
      console.log("Add to cart button does NOT exist.");
    }
    if (addToCartExists) {
      const addToCart = async () => {
        await page.click("main");
        await page.click(".add-to-cart-button");
        await sleep(getRndInteger(1200, 2000));
        await Promise.all([
          page.waitForNavigation(),
          page.click(".btn.btn-secondary.btn-sm.btn-block"),
        ]);
      };

      const checkout = async () => {
        await sleep(getRndInteger(1200, 3000));
        await Promise.all([
          page.waitForNavigation(),
          page.click(".btn.btn-lg.btn-block.btn-primary"),
        ]);
      };

      const login = async () => {
        await page.type("#fld-e", process.env.USER_EMAIL, {
          delay: getRndInteger(30, 70),
        });
        await page.type("#fld-p1", process.env.USER_PASSWORD, {
          delay: getRndInteger(20, 80),
        });
        await Promise.all([
          page.waitForNavigation(),
          page.waitForSelector(
            ".btn.btn-secondary.btn-lg.btn-block.btn-leading-ficon.c-button-icon.c-button-icon-leading.cia-form__controls__submit"
          ),
          page.click(
            ".btn.btn-secondary.btn-lg.btn-block.btn-leading-ficon.c-button-icon.c-button-icon-leading.cia-form__controls__submit"
          ),
        ]);
      };

      const fillAddress = async () => {
        await page.waitForSelector(
          "#consolidatedAddresses.ui_address_5.firstName"
        );
        const idBeginning = "#consolidatedAddresses.ui_address_5.";
        await page.type(`${idBeginning}firstname`, process.env.USER_EMAIL, {
          delay: 20,
        });
        await page.type(`${idBeginning}lastname`, process.env.USER_EMAIL, {
          delay: 20,
        });
        await page.type(`${idBeginning}street`, process.env.USER_EMAIL, {
          delay: 20,
        });
        await page.type(`${idBeginning}city`, process.env.USER_EMAIL, {
          delay: 20,
        });
        await page.select(`${idBeginning}state`, "CA");
        await page.type(`${idBeginning}zipcode`, process.env.USER_EMAIL, {
          delay: 20,
        });
      };

      const fillCCV = async () => {
        await page.type(`#credit-card-cvv`, process.env.USER_CCV, {
          delay: getRndInteger(10, 30),
        });
      };

      const placeOrder = async () => {
        await Promise.all([
          setTimeout(() => {
            page.waitForNavigation({ timeout: 0 });
            page.click(".btn.btn-lg.btn-block.btn-primary.button__fast-track");
          }, 1000),
        ]);
      };
      await addToCart();
      await sleep(getRndInteger(700, 2000));
      await checkout();
      await sleep(getRndInteger(1500, 3000));
      await login();
      await sleep(getRndInteger(1200, 2200));
      await fillCCV();
      // await placeOrder();
      closeBrowser = true;
      console.log("Item purchased.");
    } else {
      console.log("Attempt number: ", this.attempts++);
      await sleep(parseInt(process.env.TIMEOUT) + getRndInteger(1000, 10000));
      page.close();
      this.scraper(browser);
    }
    return closeBrowser;
  },
};

module.exports = scraperObject;
