# personal-footprint-calculator
 Small full-stack application built in Node/Express and React to calculate any person's personal carbon footprint.
 
 The code should be self explanatory and contains comments where is needed.
 
 # How to use/install
 1. Clone the repo
   ```sh
   git clone https://github.com/FSchieber/personal-footprint-calculator.git
   ```
 2. Install back-end NPM packages
   ```sh
   \personal-footprint-calculator> npm install
   ```
 3. Start back-end server (runs on localhost:4000 by default)
   ```sh
   \personal-footprint-calculator> npm start
   ```
 4. Open a new cmd at the /client/ path
 5. Install front-end NPM packages
   ```sh
   \personal-footprint-calculator\client> npm install
   ```
 6. Start front-end (runs on localhost:3000 by default)
   ```sh
   \personal-footprint-calculator\client> npm start
   ```
 7. Go to localhost:3000 in your browser and have fun

# Creation process
This was my first React application, so I spent the first two days experimenting with React, reading the documentation and Googling a lot. The next two days were spent coding the application - mostly the front-end, since the back-end was way faster as I'm already familiar with Node/Express and APIs.

# Missing pieces and what to improve
At the moment, the project's code doesn't have emission factors for all emission types, so a "1 unit of emission" is acting as a placeholder. Useful automated tests are missing as well, since I still need to practice more with React's testing libraries.

User's experience could be improved in many different ways. Right now, most of the inputs require that the user provides information in units that can be complicated to obtain, so the APIs could use functions to accept user inputs in different and more convenient formats. More emission categories could also be implemented to allow users to obtain more information about their carbon footprint, not just on travel and housing.

With enough data and time, it is possible to include more user friendly forms. For example, by knowing the average quantity of waste produced by a person, we can ask the user how much waste does he thinks he produces in comparison with his neighbors and estimate a value from this, instead of asking the exact kg of waste produced per week, which probably nobody keeps track of.
