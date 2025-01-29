# React and PHP Project

This read me file contains all the necessary information such as installations and set up a web application built using React for the frontend and PHP for the backend. 

To start the E-commerce site to work, first start the XAMPP and run a php file of your choice from the backend. Then, open terminal and type 
	cd frontend
	npm install
	npm run dev
Before running those commend it is require to install node in your PC. Follow the guide below to set up the project and resolve common issues.

## Table of Contents

1. [React Setup](#react-setup)
   - [Prerequisites](#prerequisites)
   - [Step-by-Step Installation Guide](#step-by-step-installation-guide)
   - [Fixing Get-ExecutionPolicy Error](#fixing-get-executionpolicy-error)
2. [PHP Setup](#php-setup)
   - [Prerequisites](#php-prerequisites)
   - [Setting up the PHP Backend](#setting-up-the-php-backend)
3. [Testing Data] (#testing-data)


---

## React Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Step-by-Step Installation Guide

1. Clone the repository:
   ```bash
   git clone https://github.com/MinKhantKyawSwar/Ecommerce-Travel-Website-with-React-My-SQL-and-Php.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Fixing Get-ExecutionPolicy Error

If you encounter an error related to `Get-ExecutionPolicy`, follow these steps:

1. Open PowerShell as Administrator.

2. Run the following command to check the current execution policy:
   ```powershell
   Get-ExecutionPolicy
   ```

3. If the policy is restrictive (e.g., `Restricted`), change it temporarily by running:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

4. Retry the command that previously failed (e.g., `npm start`).

5. Once done, you can revert the execution policy to its original state:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Restricted
   ```
---

## PHP Setup

### Prerequisites

Make sure you have the following installed:

- [PHP](https://www.php.net/) (version 7.4 or later)
- A web server like [Apache](https://httpd.apache.org/) or [Nginx](https://nginx.org/)

### Setting up the PHP Backend

1. Navigate to the backend directory:
   ```bash
   install vs code extension called PHP server
   click on any backend php file and click run server
   ```
### Database
There will be sql file called trailblaze_tour_ecommerce
First, in the xampp sql admin page, create trailblaze_tour_ecommerce database,
after that import given file

----
## Testing Data

### Customers

1. customer 1
   email - frostwosix@gmail.com
   password - Frost123

2. customer 2
   email - minkhantkyawswar@gmail.com
   password - Mkks123

### Admin

1. admin 1
   email - admin@gmail.com
   password - Admin123