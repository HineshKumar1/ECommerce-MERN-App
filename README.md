# Order Good E-commerce App

This is a MERN (MongoDB, Express.js, React.js, Node.js) E-commerce application for managing orders and products.

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/order-good.git
    ```

2. Navigate to the client directory:
    ```bash
    cd order-good/client
    ```

3. Install client-side dependencies:
    ```bash
    npm install
    ```

4. Run the frontend server:
    ```bash
    npm run start
    ```

5. Open another terminal and navigate to the server directory:
    ```bash
    cd ../server
    ```

6. Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    ```

   Replace `your_mongodb_uri` with your actual MongoDB connection URI.

7. Install server-side dependencies:
    ```bash
    npm install
    ```

8. Run the backend server:
    ```bash
    npm start
    ```

## Usage

Once both the frontend and backend servers are running, you can access the application in your web browser at http://localhost:3000. You can then proceed to use the E-commerce app to manage orders and products.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).
