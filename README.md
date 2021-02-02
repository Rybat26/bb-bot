# bb-bot

A bot that checks if item is in stock on Best Buy's website. If it is, then it will attempt to purchase. Otherwise, it tries again after a short delay.

# Install NodeJS

This bot uses Node to handle packages. Use the following link to download Node for your operating system.
https://nodejs.org/en/download/

# Install necessary files

* Download repo and unzip files.
* Use CMD/Terminal to cd into folder.
* Run "npm install" to download/update missing dependencies.

# Necessary file changes

* Create a .env file based on the .env-template file.
  * (Timeout shouldn't be too low or best buy might block your IP. Don't know how low it can go. Have been testing with TIMEOUT=5000 and seems to work.)
* Go to the "pageScraper.js" file and change "url" to desired Best Buy item url
* Near the bottom of "pageScraper.js" I have the "placeOrder" function call commented for to prevent accidental purchases during testing. You should uncomment this line when ready to use.

# Run Script

* After all necessary file changes are made, run "npm run start" in root directory to start running the script.

# Testing

* Comment out the purchaseOrder function call to prevent purchases from being placed. 
* Change the url on lines 9 and 10 of "pageScraper.js" to use "this.testURL".
  * You can also change the testURL but the current one is fine for testing.
* Run "npm run start". The script should run through entire purchase process but should not place order.

# Notes

* You should have a best buy account with payment info, shipping address, etc all filled before running script
* Once script is running, browser window should be left visible on computer. You can have other programs running next to it but it must be visible or best buy blocks it.
* Check the code. I am not responsible for unwanted purchases.
