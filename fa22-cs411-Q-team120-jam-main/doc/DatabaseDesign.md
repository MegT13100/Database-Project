TABLES IN GOOGLE CLOUD DATABASE:  

<img width="705" alt="Screen Shot 2022-10-21 at 5 15 35 PM" src="https://user-images.githubusercontent.com/56858205/197296608-34efef57-daee-42d4-88ec-0314622d626b.png">


COMMANDS USED TO CREATE TABLES IN GOOGLE CLOUD:
```
CREATE TABLE Property_Information ( 
  property_id VARCHAR(100) PRIMARY KEY,
  owner_id VARCHAR(100),
  renter_id VARCHAR(100),
  number_of_beds REAL,
  number_of_baths REAL,
  FOREIGN KEY (owner_id) REFERENCES User_Information(user_id)
  );
 ```
 ```
CREATE TABLE Property_Location (
   property_id VARCHAR(100) PRIMARY KEY,
   neighbourhood VARCHAR(255),
   city VARCHAR(255),
   state VARCHAR(255),
   country VARCHAR(255)
   );
 ```
 ```
 CREATE TABLE Rental_Period (
    property_id VARCHAR(100) PRIMARY KEY,
    price_per_day REAL,
    min_days REAL,
    max_days REAL,
    date_last_booked REAL,
    next_available_day REAL,
    rental_period_id VARCHAR(100)
    );
```
```
CREATE TABLE Reviews (
   property_id VARCHAR(100) PRIMARY KEY,
   review_id VARCHAR(100),
   user_id VARCHAR(100),
   FOREIGN KEY (property_id) REFERENCES Property_Information(property_id),
   FOREIGH+N KEY (user_id) REFERENCES User_Inforamtion(user_id);
   );
```
```
CREATE TABLE User_Information (
   user_id VARCHAR(100) PRIMARY KEY,
   number_properties_owned,
   first_name VARCHAR(255),
   last_name VARCHAR(255),
   user_type VARCHAR(255)
   );
```
PROOF OF 1000+ ROWS EACH:  
<img width="470" alt="Screen Shot 2022-10-21 at 5 21 32 PM" src="https://user-images.githubusercontent.com/56858205/197297093-2bd510db-9d64-4afc-ae7f-ed06d91e7919.png">  

<img width="404" alt="Screen Shot 2022-10-21 at 5 22 19 PM" src="https://user-images.githubusercontent.com/56858205/197297101-b0523609-f7f9-485d-94f5-3798eb09e66e.png">



SQL QUERIES:
1. SELECT property_id, next_available_day, AVG(price_per_day) FROM Property_Information NATURAL JOIN Property_Location JOIN Rental_Period USING (property_id) WHERE (city LIKE "Chicago" AND neighbourhood LIKE "Lake View") GROUP BY property_id HAVING AVG(price_per_day) BETWEEN 50 AND 100 ORDER BY next_available_day;  
    - Uses multiple joins
    - Uses HAVING and ORDER BY
<img width="1059" alt="Screen Shot 2022-10-21 at 3 27 04 PM" src="https://user-images.githubusercontent.com/56858205/197283113-1fbddb41-d920-450d-8fcb-2a83d93f90fc.png">

  - EXPLAIN ANALYIZE (Before Indexing)
  - <img width="1150" alt="Screen Shot 2022-10-21 at 4 36 41 PM" src="https://user-images.githubusercontent.com/56858205/197292560-b9b7a273-5401-4e2f-8081-36750fc10b0f.png">
  - EXPLAIN ANALYIZE (After Indexing) + Explanation 
      - Try One: First, we tried creating an index on Property_Information property_id to see if it would improve the analysis in any way since we are grouping by property_id.   
          - <img width="590" alt="Screen Shot 2022-10-21 at 5 33 04 PM" src="https://user-images.githubusercontent.com/56858205/197298163-b4584bdc-7247-4248-9d58-70a85b40ffb7.png">
          - <img width="1151" alt="Screen Shot 2022-10-21 at 5 31 28 PM" src="https://user-images.githubusercontent.com/56858205/197298179-f91a757d-7acd-4d90-ad9a-a358d6618880.png">
          - As you can see there isn't a major difference between the two analysis outputs, in fact this index actually made the time results a bit worse.
      - Try Two: We then tried creating an index on Rental_Period next_available_day since that was the column we were ordering by.
          - <img width="639" alt="Screen Shot 2022-10-21 at 5 36 47 PM" src="https://user-images.githubusercontent.com/56858205/197298676-8597cb64-0a5c-40bf-a1e7-8f6d0201120b.png">
          - <img width="1150" alt="Screen Shot 2022-10-21 at 5 36 59 PM" src="https://user-images.githubusercontent.com/56858205/197298686-91b184cc-0a95-4541-b2d9-c32508fe7bbf.png">
          - Once again there wasn't much of a difference between this analyisis and the initial one. 
      - Try Three: Next, we tried just indexing Rental_Period price_per_day since we are taking the AVG of it.
          - <img width="566" alt="Screen Shot 2022-10-21 at 5 44 01 PM" src="https://user-images.githubusercontent.com/56858205/197299707-aa06b232-5fff-4f14-9bb2-544b3d548f0c.png">
          - <img width="1101" alt="Screen Shot 2022-10-21 at 5 44 55 PM" src="https://user-images.githubusercontent.com/56858205/197299826-7aefe6ce-14b3-4016-8192-2f22581fd927.png">
          - There were some slight improvments with the time, but nothing substantial.  
      - FINAL THOUGHTS: to find the best possible index for this query, we decided to try the price_per_day index with a property_id index on Rental_Property, but that made the time results worse by a bit. Our next thought was to index city and neighbourhood since those columns are used to reguarly extract data, so they should most likely be indexed. After trying many combos (like {idx_price_per_day, idx_city, idx_neighbourhood}) the combo that returned the best time was using idx_city and idx_neighbourhood! As you can see in the results below, the times decreased compared to the initial analisis output! **So our final answer for best index design would be to index both city and neighbourhood in Property_Location!**
      - <img width="1127" alt="Screen Shot 2022-10-21 at 8 55 32 PM" src="https://user-images.githubusercontent.com/56858205/197311502-865db847-fc4e-49d4-a555-d1e2c368018d.png">


2. SELECT ui.first_name, ui.last_name FROM User_Information ui WHERE ui.user_id IN (SELECT owner_id FROM Property_Information NATURAL JOIN Property_Location WHERE city LIKE "Chicago" AND number_of_beds > 3) LIMIT 15;
    - Uses joins
    - Uses subquery
<img width="1246" alt="Screen Shot 2022-10-21 at 9 34 28 PM" src="https://user-images.githubusercontent.com/56858205/197315337-b6f6c22b-13ca-4fb2-b134-4fe0907580ce.png">

  - EXPLAIN ANALYIZE (Before Indexing)
  - <img width="1142" alt="Screen Shot 2022-10-21 at 9 35 45 PM" src="https://user-images.githubusercontent.com/56858205/197315360-087be9b4-7656-471e-925e-b9940a93f8c0.png">
  
  - EXPLAIN ANALYIZE (After Indexing) + Explanation 
      - Try One: We first tried indexing user_id since it is used frequently to extract the data and id also a primary key. 
          - <img width="494" alt="Screen Shot 2022-10-21 at 9 42 58 PM" src="https://user-images.githubusercontent.com/56858205/197315638-61a41ed1-fbfb-45b7-b99e-8b1f606ddc1e.png">
          - <img width="1148" alt="Screen Shot 2022-10-21 at 9 43 09 PM" src="https://user-images.githubusercontent.com/56858205/197315642-3598e2bc-5163-475d-a8f1-c91a460ff466.png">
          - As you can see there were not many changes with the indexing of user_id.
      - Try Two: Next we tried indexing city since it is used in the extracting of data.
          - <img width="445" alt="Screen Shot 2022-10-21 at 9 45 36 PM" src="https://user-images.githubusercontent.com/56858205/197315715-f7580287-bbbf-438c-bb24-c6f3ce277d3b.png">
          - <img width="1146" alt="Screen Shot 2022-10-21 at 9 45 25 PM" src="https://user-images.githubusercontent.com/56858205/197315719-e052d07e-bb10-44d1-beff-c423955cac4a.png">
          - There was a small time improvement when indexing city and user_id.
      - Try Three: Next we tried also indexing number_of_beds along with the first two.
          - <img width="633" alt="Screen Shot 2022-10-21 at 9 49 41 PM" src="https://user-images.githubusercontent.com/56858205/197315826-a88102fe-f224-48dc-b03c-5ef00a8e28b3.png">
          - <img width="1017" alt="Screen Shot 2022-10-21 at 9 49 27 PM" src="https://user-images.githubusercontent.com/56858205/197315843-5bcdbafc-2be6-494e-aac2-6fb368bf635e.png">
          - As you can see there was a significant improvement in the time!!
      - FINAL THOUGHTS: After trying a few more index pairings, we found that the last option we tried gave the best results regarding time! So out final answer for best index design would be to **index city in Property_Location, number_of_beds in Property_Information, and user_id in User_Information!**


