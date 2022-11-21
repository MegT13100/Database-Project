1. Describe what data is stored in the database. (Where is the data from, what attributes and information would be stored?)
- Our group is planning an airbnb style database with additional features. Most of our data can be pulled from [this dataset](https://www.kaggle.com/datasets/kritikseth/us-airbnb-open-data) from kaggle, attached below as well. At the moment we are planning on three tables: Property information, User, and Rental Periods. We expect to have more tables once we begin working on the project and see the need for others.
The Property Information table will include the property ID, address, city, state, user who owns it, number of bathrooms, minimum nights to book, date of last review, reviews per month, price, and number of available days throughout the year. The User table will include the user  ID, user type (renter or rentee), number of reviews left, and name. The rental periods table will include property ID, rental start date, rental end date, user ID of the renter, user ID of the rentee.
- The Property Information table will include the property ID, address, city, state, user who owns it, number of bathrooms, minimum nights to book, date of last review, reviews per month, price, and number of available days throughout the year. The User table will include the user  ID, user type (renter or rentee), number of reviews left, and name. The rental periods table will include property ID, rental start date, rental end date, user ID of the renter, user ID of the rentee.

2. What are the basic functions of your web application? (What can users of this website do? Which simple and complex features are there?)
- The web application will include text boxes with titles for city, state, minimum price and maximum price, rental dates and minimum number of bathrooms. This will output a list of possible properties that fall within the user’s restrictions. This will also output a popularity scatterplot that shows the average rating vs. price of each property and a line y = x to separate properties that are better than average.
- With these capabilities, the user will be able to find properties that fit their needs and decide on those properties based on average ratings. Also, the application will allow users to only input some information and recommend properties. For example, if the user doesn’t know which city they want to be in, they can leave it blank and allow the application to provide locations in all cities that fit the remaining criteria. 
- Finally, our group plans on creating several visualizations like the scatterplot and giving the user a choice of which they want to see.

3. What would be a good creative component (function) that can improve the functionality of your application? (What is something cool that you want to include? How are you planning to achieve it?)
- Comparison between hotel prices and airBnB prices in a specific region selected by the user.
- Weather Predictions in a given city
- When selecting a specific property, stats on that property should show up like an overall rating based on reviews, a graph showing when the property is most popular, how the property price has changed over time etc.

4. Project Table
- GroundBnB

5. Project Summary
- Our group is planning an Airbnb style database with additional features. These features include a popularity scatterplot with different viewing options depending on the most important features to the viewer. Additionally, we would introduce color coding to show the viewers which properties fit their criteria best. This will all be deployed on a website similar to Airbnb where the users will be able to look around and find the information that they wish to receive based on their needs. Because we plan to target both users and hosts, we will need to distinguish between both (Users can't be hosts but hosts can be users). They can also try logging in to our app using their own Airbnb accounts. If they aren't already previous users/account owners then we will prompt them to a Sign-up modal and then we will add them into our database based on the input given.
- We will be using a dataset from Kaggle that includes all the reviews, listing information, and calendar information for listings on Airbnb. The dataset includes the listing id, the listing name, the listing price, the number of people the listing can accommodate, the number of bedrooms, the number of bathrooms, the number of beds, the minimum number of nights required to stay at the listing, the number of reviews the listing has, the listing's latitude and longitude coordinates, the room type of the listing, the property type of the listing, the cancellation policy of the listing, whether or not the listing allows pets, the cleaning fee of the listing, the extra people fee of the listing, the security deposit of the listing, the host id of the listing, the host name of the listing. This data will then be filtered to achieve our new and improved groundBnB.

6. Description of an application of your choice. State as clearly as possible what you want to do. What problem do you want to solve, etc.?
- Thinking about Airbnb and how useful it is, our team wanted to fix some small inherent problems that come with the application. We will improve the filtering process for rental properties using information that each property has and filtering through it in our database. This will be filtered based on user input and needs.  Additionally we will add more features to the original application like a popularity vs price scatter plot that will tell the users of cheaper but popular properties all the way up to expensive and popular properties. Giving our users the freedom to choose between a cheaper option that's just as good as other more expensive options. Colors will be used to helped the users know which properties are within their input budget and needs. All of this will be deployed under a web interface similar to airbnb which will display the new features we implemented.

7. Usefulness. Explain as clearly as possible why your chosen application is useful.  Make sure to answer the following questions: Are there any similar websites/applications out there?  If so, what are they, and how is yours different?
- The application we are developing will be similar to Airbnb. What our application would improve upon is the filtering of rental properties. Our application would introduce features like a popularity scatterplot and different viewing options depending on what features are most important to the viewer. Additionally, we would introduce color coding to show the viewers which properties fit their criteria best. Look at question 3 for more. 

8. Realness. Describe what your data is and where you will get it.
- [This dataset](https://www.kaggle.com/datasets/kritikseth/us-airbnb-open-data) from kaggle contains most of our data, but we can also use [this data](http://insideairbnb.com/get-the-data) from Inside Airbnb. We can also generate data if needed, or pull actual data from Airbnb. 

9. Description of the functionality that your website offers.
- Since our target users for the website include both rentees and hosts, we will first let users decide on if they are hosts or rentees. Then we will ask users if they have already been a user on airbnb. If they are not the existing users on Airbnb, we will offer them the INSERT new records to our databases with their own information. If they are the existing user, they will be allowed to UPDATE or DELETE their personal information. For example, the hosts are able to update their property information and the rentees are able to change their rental period information. And the SEARCH function can be provided for both existing or non-existing users. All the users can choose the filters that they need to get the desired information. For instance, a host can choose their city and state to look at the information about their competitors.

10. A low fidelity UI mockup:
- ![CS411-4](https://user-images.githubusercontent.com/56858205/192400433-83ccf4ea-d3a7-485c-b0a9-e7c09e1226ec.jpg)
- For the property listings we have multiple filters that can be selected on the left side of the main page.
- There will be a choice of visual display on the right side of the page. This could be a scatterplot, a map with prices or various stats etc. 
- When a property is pressed, there will be additional visuals that show stats about the specified property, such as when it's most popular and how the price has changed.

11. Project work distribution: Who would be responsible for each of the tasks or subtasks?

Frontend:
- Connect database to front end: Alan
- Create web application: Meghan
- Visualizations: Meghan

Backend:
- Parse database: Jacob
- Connecting dataset into database: Jacob
- Database design: Jacob, Jolene
- Connecting backend to frontend: Jolene
- SQL:  SEARCH/UPDATE/DELETE/INSERT: Everyone
- SQL: TRIGGER/STORED PROCEDURE: Everyone
