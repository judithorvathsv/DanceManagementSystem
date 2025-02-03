# Dance Classes App

This is a web application for managing dance classes and lessons, with user and admin roles, designed for a physical dance school. Built with **React** and **TypeScript** for the frontend, **.NET** for the backend, and uses **OpenAPI**, **Tanstack Router**, **Redux**, **TailwindCSS**, and **DaisyUI** for styling and UI components.

---

## Features

### User Features:
- **Login**: Users can log in (fake login implemented using Redux for demo purposes).
- **View Dance Classes**: Users can view a list of available dance classes.
- **View Lessons**: Users can view lessons associated with a class. Each lesson has:
  - Name
  - Description
  - Link to the lesson video
  - Link to the preparation video

### Admin Features:
- **Login**: Admin users can log in to access the management section (fake login via Redux).
- **Class Management**: Admins can:
  - Add a new dance class
  - Edit existing classes
  - Delete classes
- **Lection Management**: Admins can:
  - Add a new lesson to a class
  - Edit lesson details
  - Delete lessons

### Technologies Used:
- **Frontend**: 
  - React with TypeScript
  - TailwindCSS (for UI styling)
  - DaisyUI (for modal components)
  - Tanstack Router (for routing)
- **Backend**: 
  - .NET (for handling the API and database interactions)
  - OpenAPI (for API definition)
- **State Management**:
  - Redux (to manage user login state and session)

---

## Installation

### Prerequisites

- **Node.js** (for frontend)
- **.NET Core SDK** (for backend)

### Steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/dance-classes-app.git
cd dance-classes-app
```

2. **Frontend Installation**:
   - Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

   - Install the necessary npm packages:

   ```bash
   npm install
   ```

   - Run the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

3. **Backend Installation**:
   - Navigate to the backend directory:

   ```bash
   cd backend
   ```

   - Build and run the backend using .NET:

   ```bash
   dotnet build
   dotnet run
   ```





