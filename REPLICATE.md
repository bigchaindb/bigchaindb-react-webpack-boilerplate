# Replicate /client code from scratch #

#### 1. Requirements ####
To run this you need nodejs installed on your computer. If you don't know if you have it run "node --version" in your terminal/command line

#### 2. Create project ####
"npx create-react-app my-react-app"

#### 3. Start it ####
Go to project directory with "cd my-react-app" and run "yarn start" to start it up. You should see it running on "localhost:3000".

#### 4. Your custom stuff ####
add button with function
Open "App.js" and add "<button onClick={()=>postTransaction()}>Create transaction</button>" and add "import { postTransaction } from './bdb.service';" on top of file that will submit transaction.

#### 5. BigchainDB stuff ####
"yarn add bigchaindb-driver"
create "bdb.service.js" with content

#### 6. Customize from bdb.service with other functions ####
Check https://docs.bigchaindb.com/projects/js-driver/en/latest/usage.html for advanced usage.