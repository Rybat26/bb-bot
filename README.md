# bb-bot

# Install nodeJS
https://nodejs.org/en/download/

# Install necessary files
* Download repo and unzip files.
* Use CMD/Terminal to cd into folder.
* Run "npm install" to download/update missing dependencies

# Necessary file changes
* Create a .env file based on the .env-template file.
* (Timeout shouldn't be too low or best buy might block your IP. Don't know how low it can go.)
* Go to the "pageScraper.js" file and change "url" to desired best buy url
* Near the bottom of "pageScraper.js" I have the "placeOrder" function call commented for safety. You should uncomment when ready to use.

# Run Script
* After all changes are made, run "npm run start" in root directory to start running the script.

# Notes
* You should have a best buy account with payment info, shipping address, etc all filled before running script
* Once script is running, browser window should be left visible on computer. You can have other programs running next to it but it must be visible or best buy blocks it
