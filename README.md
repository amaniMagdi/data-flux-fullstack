# Data Flux
## Overview
The application's goal is to provide in-depth analysis and manipulation of various data types (Tabular data, RGB images), 
bolstered by an engaging reactjs front-end showcasing rich animations and visualizations, alongside a complex back-end developed with Python and Flask.
This project consists of a frontend and a backend:
## Backend  (data_flux)

The backend directory contains the server-side code and related files for the application. Below is an overview of its structure and purpose:

### Directory Structure

-   **`app/`**: This directory contains the core application code.
    
    -   **`routes/`**: Defines the routes and endpoints for the application. This is where you set up the HTTP request handling logic.
    -   **`services/`**: Contains service layer code responsible for business logic and data processing.
    -   **`static/`**: Holds static files such as images used by the application.
	   -   **`config.py`**: Configuration file for application settings, including environment-specific settings and secrets.
	  -   **`extensions.py`**: Contains setup code for third-party extensions and libraries used by the application.
    
	-   **`models.py`**: Defines the data models and schema for the application’s database. This file includes ORM (Object-Relational Mapping) definitions for database tables.
    
	-   **`__init__.py`**: Initializes the `app` package and sets up the application. This file typically contains the app setup and configuration code.
    
-   **`requirements.txt`**: A file listing all the Python dependencies required for the backend application. Use this file to install dependencies using `pip install -r requirements.txt`.
    
-   **`run.py`**: The main entry point for running the application. This script typically initializes the application and starts the server.
- **`projectenv/`**: This directory is used for the virtual environment where dependencies are installed. It is typically managed by `venv`.

## Frontend (data_flux_fe)

The frontend directory contains the client-side code for the application. Below is an overview of its structure and purpose:

### Directory Structure

-   **`node_modules/`**: Contains all the dependencies for the frontend project managed by npm.
    
-   **`public/`**: Holds static assets such as the `index.html` file and any other public resources.
    
-   **`src/`**: Contains the source code for the frontend application, including components, styles, and configuration files.
    
-   **`package-lock.json`**: Locks the versions of the npm packages to ensure consistent installs.
    
-   **`package.json`**: Lists the npm dependencies and scripts for managing the frontend application.
    
-   **`postcss.config.js`**: Configuration file for PostCSS, a tool for transforming CSS with JavaScript plugins.
      
-   **`tailwind.config.js`**: Configuration file for Tailwind CSS, a utility-first CSS framework.

## Video Tutorial

https://github.com/user-attachments/assets/09067513-133a-441c-b571-7d2a9fdf36c9


## Future Enhancements

### Backend

To improve the organization, maintainability, and testability of our codebase, we plan to implement the following changes:

-   **Separate Routes and Services**: We will refactor the code to separate routes from services. Routes will handle the HTTP request and response cycle, while services will contain the business logic and interact with the data layer. This separation will make our codebase more organized and easier to manage.
-   **Handle Textual Data**: Future updates will include the capability to handle textual data effectively, allowing for better data processing and management.

### Frontend

To enhance the user experience and improve the application's responsiveness and interactivity, we plan to:

-   **Enhance Responsive Design**: Further optimize the design for mobile devices to ensure a seamless experience for the majority of users accessing the application on smaller screens.
-   **Apply Animations**: Add animations for transitions between different application states, button clicks, data loading phases, and user interactions. This will improve visual feedback and enhance the overall user experience.
-   **Add Global Interceptor for Error Handling**: Implement a global interceptor to manage 500 error codes and provide a more user-friendly experience in case of server errors.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
