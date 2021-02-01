# bb-bot

# Install nodeJS
https://nodejs.org/en/download/


Download repo and unzip files.
Use CMD/Terminal to cd into folder.
Run "npm install" to download/update missing dependencies

Create a .env file based on the .env-template file.
(Timeout shouldn't be too low or best buy might block your IP. Don't know how low it can go.)
Go to the "pageScraper.js" file and change "url" to desired best buy url
Near the bottom of "pageScraper.js" I have the "placeOrder" function call commented for safety. You should uncomment when ready to use.

In CMD, run "npm run start" to start running the script.
