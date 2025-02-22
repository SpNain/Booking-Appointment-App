# Booking Appointment App

The Booking Appointment App is a web-based application designed to streamline the process of scheduling and managing appointments.

## Features 📝

- Users can book, reschedule, or cancel appointments.


## Tech Stack ⚒

*   **Backend:** Node.js, Express
*   **Frontend:** HTML, CSS, JavaScript
*   **Database:** MySQL
*   **Packages/Libraries:**
    *   `axios`: For making HTTP requests
    *   `body-parser`: For parsing incoming request bodies
    *   `cors`: For enabling Cross-Origin Resource Sharing
    *   `express`: For creating the web server and handling routing
    *   `mysql2`: For interacting with the MySQL database
    *   `sequelize`: For Object-Relational Mapping (ORM) with the MySQL database

## Installation ⬇️

#### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MySQL

#### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/SpNain/Booking-Appointment-App.git
   cd Booking-Appointment-App
   ```

2. **Install dependencies**:
   ```sh
   npm install
   npm install --save-dev nodemon  # OR npm i -D nodemon
   ```

3. **Set up MySQL database and secrets.js**:
   Create a database in MySQL and a `secrets.js` file in the util directory.
   Add the following in `secrets.js`:
   ```
   DB_NAME : 'mysql_database_name',
   DB_USER : 'mysql_database_user_name',
   DB_PASSWORD : 'mysql_database_password'
   ```

4. **Run the application**:
   ```sh
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.
