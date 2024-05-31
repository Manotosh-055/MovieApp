# 🎬 Movie Library Application

This is a MERN stack application for managing a movie watchlist. Users can search for movies, add them to their watchlist or watched section. This project includes user authentication and leverages The Movie Database (TMDb) API for movie information.

## 🚀 Features

- User Authentication (Login/Signup)
- Search for Movies
- Add Movies to Watchlist
- View and Manage Watchlist

## 🛠️ Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** The Movie Database (TMDb) API
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS

## 📋 Getting Started

### Prerequisites

- Node.js
- MongoDB
- TMDb API Key

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Manotosh-055/MovieApp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd movie-watchlist
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your TMDb API key:
    ```env
    REACT_APP_TMDB_KEY=your_tmdb_api_key
    ```

4. Start the frontend server:
    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_uri
    ```

4. Start the backend server:
    ```bash
    npm start
    ```


## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
