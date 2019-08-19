# Drixit-exercise
 Simple app that renders data in a multi bar chart. It uses Express js to serve data and React to render it,
 ### Packages used
 * concurrently
 * nodemon
 * react-vis
 * react-chart

# Section I - Installation
## Getting Started

These instructions will get you a copy of this exercise up and running on your local machine for development purposes.

### Prerequisites

Node js version 8^.

### Installing

Clone repository, then install dependencies in both paths **./** and **/client**.
```
npm i //or use yarn instead
cd client
npm i //or use yarn instead
```
You can run both the server and the client applications at the same time with the following script. Be sure to execute it in the project root directory.
```
npm run dev
```
To run server and watch for changes run:
```
npm run server
```
# Section II - Log
Here is a detail log of the development process. Specifies how the exercise was addressed, the problems and decisions that were taken to solve them.

## (wednesday 14/08/2019)
### Installed tools, prepared dev environment and setup express server. 
I just moved to another country so didn't have the computer were I used to work. Was planning to build another one next saturday but for now I needed to use a laptop I brought which didn't had node, git or Vs code.

After installing tools, I developed a small express server with a GET /statistics endpoint that returned an array of Objects. Any other route would just respond with the **index.html** file that React creates after build. Made the server trying to use best practices, latest ES available and modular data delivery depending on env variables.

Time used: 1h aprox

## (thursday 15/08/2019)
### Created client
I create the client using **create-react-app** package module to save boilerplate.
Started browsing the web to see if I could use another Chart library instead of ChartJs that I already knew.

Ended up giving a try to **react-vis** library from **Uber** to see how it performed.

Time used: 1h aprox (was all day outside doing formalities)

## (friday 16/08/2019)
### Created the chart component
Fetched data from API, processed it and render it using react-vis. 
Created three bars (array type) to store corresponding data from each record as the library renders a BarSeries component with the data in the form of `{x: value, y: value}` objects.
This is handled by the prepareData() function. Had trouble rendering data numbers in chart (labels) because of how the library worked. Ended up using a event helper on hover to render bellow the numbers of the entry.

Started formatting this docs in mark down. Read the required docs to create the chart.

Time used: 2h aprox (was all day outside purchasing a new chair for a new setup)

## (saturday 17/08/2019)
### Created the table
Installed react-table package module for custom event handling with checkBoxes.
Planned how the filter would be like based on how react-vis works. 
Made the filterBars() function that filters specific records from the bars.
Was planning on using different components for the chart and the table, however ended up using a single class component because I did not have the time to setup a state handler like Redux to enable component state sharing.

Time used: 1h aprox (had plans to hang out with friends and build the new setup at home)

## (sunday 18/08/2019)
### Implemented the filter and reset chart functionality
Finished the functional requirements of the exercise.
Wanted to have a dynamic event handler to filter when selecting rows. 
However I did not had the time to do it because I needed to study for an upcoming test.
Ended up making two buttons to address this requirement. One to filter after selection and another to reset chart with all bars again.
Finished the exercise, exported everything and deployed to heroku for online visualization.

Time used: 1h aprox (had plans to hang out with friends and build the new setup at home)

# Section III Considerations
As mentioned in the log, the functional requirements were addressed first in order to complete the exercise. But there are several considerations that could have been implemented for optimal, desirable and sustainable development; however due to development time issues, these were considered quality requirements that can be addressed later. These considerations are:

* Using a state management like **React Context API** (redux may be overkill here) to separate the ***chart*** and ***table*** components to filter the data stored in a shared state. 
* Using **Chart js** library as it provides a more extensive api that could help achieve the desired result.
* Making a custom event handler that filters selected rows on the fly. This can easily be done by copying the ***filterBars*** and ***reset*** functions logic and constantly updating the state. Another approach would be to add ***visible*** property to the objects that renders in the chart if set to true. This way all objects would be true by default and then after selection would set others property to false except of those who are selected. This last would be the inverse of the filtering method approach and perhaps a more clean solution.

