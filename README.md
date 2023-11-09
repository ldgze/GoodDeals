# GoodDeals

## Project Objective

GoodDeals is an online platform designed for shoppers to discover, share, and discuss the best deals available across various categories. Users can post their found deals, comment on others, and rank them. With a focus on community interaction and ease of use, GoodDeals not only promotes savings but also facilitates a space for shoppers to interact and help each other find the best discounts around.

Link to GoodDeals Web Application: (https://gooddeals.onrender.com)

## Design Document

[View Design Document](https://docs.google.com/document/d/1L9pRUgOllCcjh4FPXOf4n7vzCFfgaMXvKw62Ob7jRd0/edit?usp=sharing)

## Features

- **Post Deal:** Users can share new deals by posting links and relevant information
- **Edit Deal:** Users can modify their previously posted deals to update details
- **Delete Deal:** Allows users to remove their deals
- **View Deal:** Users and view deals based on different categories
- **Comment:** Users can comment on posted deals
- **Delete Comment:** Users have the option to remove their comments
- **Like:** Users can show appreciation for a deal or a comment by liking it
- **Deals Ranking:** A dynamic ranking system that ranks deals based on user likes
- **Deals Display:** Deals are organized and displayed on their respective category pages

## Screenshot

Home Page:
![Home page screenshot1](https://github.com/Yushicui/GoodDeals/blob/main/screenshot/Homepage.jpg)
![Home page screenshot2](https://github.com/Yushicui/GoodDeals/blob/main/screenshot/HomePage2.jpg)

Create Deal Page:
![Create Deal page screenshot](https://github.com/Yushicui/GoodDeals/blob/main/screenshot/CreateDealPage.jpg)

Deal Detail Page:
![Deal Detail screenshot](https://github.com/Yushicui/GoodDeals/blob/main/screenshot/DealDetailPage.jpg)

## Tech Stack

**Front End**

- React
- HTML5
- CSS3
- ES6+
- Bootstrap5
- JavaScript XML

**Backend**

- Node.js
- Express.js
- JavaScript

**Database**

- MongoDB

## Tech Requirements
- React: v18.2.0 or above
- Node.js: v20.6.1 or above
- MongoDB: v6.1.0 or above
- Express.js: v4.18.2 or above

## How to Install/Use

**1. Clone the repository:** <br>

`git clone https://github.com/Yushicui/GoodDeals.git`

**2. Navigate to the project directory:** <br>
`cd GoodDeals`

**3. Install dependencies:** <br>
`npm install`

**4. Connect Database:** <br>
Configured in the `MONGODB_URI` environment variable or have a MongoDB server running on `localhost:27017` to connect database.

**5. Import Data(Optional):** <br>
`npm run initDB` to initializing the database with the 1000 deals data.

**6. Navigate to the frontend directory:** <br>
`cd front`

**7. Install dependencies:** <br>
`npm install`

**8. Build the frontend:** <br>
`npm run build`

**9. Start the backend server:** <br>
In the project directory: `npm start`

Then, open your browser and navigate to http://localhost:3000/ to start using GoodDeals.

## Authors

**Yushi Cui**<br>
Link to Homepage:[Yushi's Homepage](https://yushicui.github.io/MyHomePage/)<br>

**Zexi Gong**<br>
Link to Homepage:[Zexi's Homepage](https://zexigong-ne.github.io/)<br>

## Reference to the Class

This project was created as a part of the Web Development class in Computer Science Master’s program at Northeastern University. [More about the class](https://johnguerra.co/classes/webDevelopment_fall_2023/)

## Link to the Google slides

View the presentation of the project in this [google slides](https://docs.google.com/presentation/d/1Co03Snc30ntdBwIYP4DPWdYoVIXBXR4g2RQfKjlzYpU/edit?usp=sharing)

## Link to the Video Demonstration

Watch a detailed walkthrough of the project in this [video demonstration](https://youtu.be/bLCbPwpOJ14)

## License

License: This project is licensed under the MIT License - see the [LICENSE](https://github.com/Yushicui/GoodDeals/blob/main/LICENSE) for details.
