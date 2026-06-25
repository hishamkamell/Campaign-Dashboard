# Campaign Dashboard

A React-based dashboard for managing marketing campaigns. The application allows users to create, update, delete, and view campaigns through a simple and responsive interface.

## Project Setup & Installation

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

```bash
git clone <repository-url>
cd campaign-dashboard
npm install
```

### Run the Application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Technologies Used

- React.js
- JavaScript (ES6+)
- Axios
- Tailwind CSS
- Vite

### Structure Overview

- **components/**: Reusable UI components.
- **services/**: API-related functions and mock API logic.
- **App.jsx**: Main application component.
- **main.jsx**: Application entry point.

## Assumptions & Development Decisions

- A mock API layer was implemented to simulate backend operations.
- Axios was used to handle API requests.
- Tailwind CSS was used for styling and responsive layouts.
- Basic form validation was implemented before creating or updating campaigns.
- Component-based architecture was adopted for maintainability and scalability.
- Loading and empty states were added to improve user experience.
