This is the complete web application developed using MERN stack.

Frontend is developed using Vite for ReactJS. The interactive graphs are created using ChartJS.
Backend is developed using NodeJS and Express for REST API.
Postgres Database is setup in the container itself.

 

1. To run the application, you need to install Docker on your system and use the following command 

  **docker-compose up --build**

 
   The front end of the application will run on 
   
   **localhost:8080**

   There we will have a bar chart with initial data i.e.the countries and their traffic count based upon the db records. On clicking any bar, the Pie chart will appear with that country's vehical data(the vehicle type and the count)

2. In Docker compose nginx service is run for load balancing. This will initiate x instances of backend by running

   **docker-compose up --build --scale backend=x(x is the number of instances you want to create)**

   Now **nginx** based upon the header, payload and request will route to the backend container which has less load. This will ensure that when the request per second (RPS) will scale from 5 to 50 to 500, the app will not be choked.

Rest APIs will work on localhost:3000 as per the docker setup.

1. http://localhost:3000/traffic-countries (For getting a list of traffic vehicle density in countries)
2. http://localhost:3000/vehicle-distribution/:id (The vehicle distribution in a specific country. ID is the id returned in above API call)

Dockerfiles are present in frontend and backend.

Unit test files are created in both the backend and frontend.

To run the tests, move to the backend and frontend folder and run the following command

**npm test**




