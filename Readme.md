# Weather Pipe

## Description
This project is a web application designed to provide users with interactive maps displaying various weather-related data. It includes features such as user authentication, dashboard customization, and real-time weather updates.

## Getting Started
To run the project locally, follow these steps:
1. Clone the repository.
2. Install Meteor if you haven't already.
3. Install dependencies 
4. Start the frontend and backend servers.
5. Access the application via the provided URL.
6. Set the environment variable METEOR_SETTINGS with your Open Weather API key. For example:
```
METEOR_SETTINGS='{ "OW_API_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxx" }' npm start
```
   
## Technologies Used

### Frontend
- SolidJS: Main frontend technology for building the UI.
- Park-UI and Flowbite: Component libraries for UI design and development.
- solidjs-router: Routing solution for navigation within the application.
- OpenLayers: Mapping engine for displaying interactive maps.
- OpenStreetMap and OpenWeatherMap: Map providers for weather-related data.

### Backend
- MeteorJS: Backend framework for handling server-side logic.
- aldeed:collection2: Package for defining collection schemas and performing document checks.
- reywood:publish-composite: Package for reactive data publishing with collection relationships.
- meteortesting:mocha: Testing framework for unit and integration tests.

## Project Architecture

### Frontend Architecture
- Utilizes SolidJS for building the frontend application.
- Implements guard routes in AppLayout and HomeLayout to control access to specific routes.
- Includes a 404 route for handling invalid URLs.
- Features a user-friendly login page with comprehensive validation and messaging.
- Dashboard functionality allows users to create and manage locations on interactive maps.

### Backend Architecture
- Built using the MeteorJS stack.
- Utilizes collections to store user data and preferences.
- Implements publications for reactive handling of user locations and preferences.
- Includes methods for creating, deleting, and reordering user preferences.
- Implements a proxy for weather map data to secure access keys.
- Utilizes a timer for updating user locations on the dashboard.

## Future Improvements
- Implement caching mechanisms to improve performance and reduce API requests.
- Enhance error handling and messaging for a more user-friendly experience.
- Explore additional features such as geolocation services for enhanced user interaction.


## Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the project.

## License
This project is licensed under the MIT License
