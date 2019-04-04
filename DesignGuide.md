# Design Guide


## Welcome
Welcome and thanks for coming to check out my project! This project was created as one of the last major assignments for the BA degree in **Front-End Web Development** at **Open Classrooms**. Below is a breif description on the structure, technologies and features of this project.

*For dependancies and download instructions please see* `README.md`


## Goals of Project
The purpose of this project was to familiarize students with APIs and JS frameworks in creating a SPA (*Single Page Application*). In particular for this assignment, GoogleMaps API, ReactJS and the concept of local state. 

Specific requirements outlined for this project include:

* Use of ReactJS as a framework
* Interaction with GoogleMaps API
* Geolocate user and place marker on map
* Have local restaurants show
	* on list on page
	* as markers on map
* When list item is clicked
	* show details for restaurant
	* show streetview for restaurant
	* show reviews for reataurant
* Users can add reviews to a restaurant
* Users can add a new restaurant by clicking location on map
* Users can filter restaurants based on ratings


## Technologies Used
The main technologies used for this project were:

* HTML/CSS
* ReactJS
* GoogleMaps API
* moment.js


## Features
This project has some great features in it that by creating, really expanded my knowledge of ReactJS, vanilla JS and APIs. A few of the features that I found most interesting and useful are listed below.

* The styling of the app is consistent, down to the style object passed to the GoogleMaps API to syle the map
* The app is fully responsive, moving the `<SidePanel />` to the bottom of screen when the screen becomes vertical
* Returned restaurants are determined by the bounds of the map visibile, as opposed to a radius around the user. This allows the user to scan the map in other areas than their current location, to get data
* The filter allows users to display only restaurants that meet their desired rating
* When hovering on a restuarant listing, the corresponding map marker highlights
* Users can add new reviews to an existing resraurant
* `moment.js` is used to determine the relative time since each review was left
* Users can add a new restaurant to the array of existing restaurants


## Components and Dataflow
Below is a brief listing of the major components,  and main functions of the project. Not all components or functions are listed, but enough to give an idea of the structure of the project.

`<MainPanel />`
* `initMap()` to make initial call to API to load map and geolocation
* `userMarker` shows location of user
* `state: mapBounds` visible area of map used as reference for restaurant data
* `state: placesData` array stores all restaurants data from API and passes down

`<MarkersArray />`
* an array of map marker objects created by GoogleMaps
* an `infoWindow` is attached to each marker and displays on hover
	
`<SidePanel />`
* all data is stored here
* `this.props.restaurants` is the original array returned from the API
* `state: modifiedRestaurants` is the array created if a new restaurant or review is added by the user
* `state: filteredRestaurants` is the array created if the filter activated by the user
* `this.passArray()` passes the appropriate array of data down
* `filterRestaurants()` takes the input value from user and only displays restaurants that meet that value
* when *add new restaurant* is clicked, the `<NewRestaurant />` component displays

`<RestaurantPanel />`
* displays either the list of restaurants, or the details of one selected restaurant
* when a listing is clicked, `placesDetailsReq()` pulls from GoogleMaps places library
* the view then switches to details

`<RestaurantDetails />`
* displays details, a streetView image and recent reviews
* Allows for addition of new reviews via `<NewReview />`

`<NewReview />`
* Takes inputs for user name, rating and comments
* Pushes back up to `state: modifiedRestaurants`

`<NewRestaurant />`
* Takes inputs for the name of restaurant and coordinates
* Coordinates are determined via a button triggering the `getCoordinates()` function
* this function takes input from clicking a location on the map and returning a physical address


## Sticking Points
Although the other students in my program have chosen to use the third-party framework `google-maps-react`, I felt that this did not allow for an in-depth learning of the GoogleMaps API or ReactJS in the same way that doing the project without a third-party framework would. While this made the project very difficult to navigate at times as no online support exists for this situation, I ultimately am happy with the decision and feel that I have learned a tremendous amount from taking this path.

A few issues that I ran into:
* I would like to have the loading screen display for a *minimum* amount of time so that it isn't confusing to users when it loads very briefly
* every now and then an error message loads stating `Cannot read property 'maps' of undefined`
* I think this is due to the code parsing faster than the API returns a map object from Google
* When adding a new review, the overall rating and number of reviews does not immediatetly update. The details panel must be closed and remounted for the new data to take effect
* This would not be an issue if this were a real app as data would be going to the database that results are pulled from via the API. But it still bothers me that I haven't managed to make it happen in the project.
* On the filter, I would like the stars up to the hovered star to become active to show the user a response. I acheived this in a trial vanilla JS version of the project by using `prevAll()` but wasn't able to use the same structure in the React version.


## Closing Thoughts
Although there were a few unfulfilled wishes, I feel that I acheived quite a bit for a first project with React or APIs. I'm grateful for this challenging assignment, and glad that I forged my own path through it.

Now that I have a solid understanding of the React framework, I am looking forward to making to fun experimental projects with the technology.

Thanks for taking the time to view my project! 
