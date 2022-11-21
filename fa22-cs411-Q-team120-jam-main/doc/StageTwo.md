**UML Diagram:**  
[UML Diagram.pdf](https://github.com/cs411-alawini/fa22-cs411-Q-team120-jam/files/9738197/UML.Diagram.pdf)


**Relational Schema:**  

Property_Information(  
	PropertyID VARCHAR(30) [PK],  
	OwnerID VARCHAR(30) [FK to User_Information.userID],  
	RenterID VARCHAR(30),  
	Number_of_beds REAL,  
	Number_of_bathroos REAL);  


User_Information(  
	userID VARCHAR(30) [PK],  
	FirstName VARCHAR(255),  
	LastName VARCHAR(255),   
	user_type VARCHAR(255),   
	number_properties_owned REAL);


Rental_Period(  
	PropertyID VARCHAR(30) [PK],  
	Date_last_booked VARCHAR(255),  
	price_per_day REAL,  
	Max_days REAL,  
	Min_days REAL,  
	Next_available_day VARCHAR(255));  
	

Location(  
	PropertyID VARCHAR(30) [PK],  
	Address VARCHAR(255),  
	City VARCHAR(255),  
	State VARCHAR(255),  
	Country VARCHAR(255));  
	

Review(  
	ReviewID VARCHAR(255) [PK],  
	PropertyID VARCHAR(255) [FK to Property_Information.PropertyID],  
	UserID: VARCHAR(255) [FK to User_Information.UserID.PropertyID]);  
	

Amenities(  
	PropertyID: VARCHAR(30) [PK],  
	Electricity VARCHAR(255),  
	Wifi INT,  
	Pool INT,  
	Type_of_beds VARCHAR(255),  
	Parking INT,  
	AC INT,  
	TV INT);
