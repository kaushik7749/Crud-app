# Preview
![image](https://github.com/user-attachments/assets/1689c472-b845-4fde-8bce-f6789544371e)
![image](https://github.com/user-attachments/assets/dbd8f575-ac10-4051-b2ec-d66ce2895ea8)
![image](https://github.com/user-attachments/assets/fc317abf-69d4-4d2f-9f30-351fecae684f)
![image](https://github.com/user-attachments/assets/9f30e4b1-57e1-478d-ba7d-00a6e451be02)
![image](https://github.com/user-attachments/assets/1f3a74b2-dab4-4c77-a8bc-86d93357627c)


# CRUD App Setup Guide

A complete full-stack CRUD application with React frontend, Node.js backend, MongoDB database, and JWT authentication.

## 🚀 Features

- **Authentication**: Register, login, logout with JWT tokens
- **CRUD Operations**: Create, Read, Update, Delete items
- **User-specific Data**: Each user can only see their own items
- **Modern UI**: Responsive design with Tailwind CSS
- **Secure**: Password hashing, protected routes, input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone or Create Project Structure

Create the following folder structure:
```
crud-app/
├── backend/
├── frontend/
└── README.md
```

### 2. Backend Setup

#### Navigate to backend folder:
```bash
cd backend
```

#### Install dependencies:
```bash
npm init -y
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install -D nodemon
```

#### Create environment file (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crudapp
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
```

**Important**: Replace `JWT_SECRET` with a strong, random string in production.

#### For MongoDB Atlas (cloud database):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crudapp?retryWrites=true&w=majority
```

#### Copy the server.js code from the backend artifact above

#### Update package.json scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 3. Frontend Setup

#### Navigate to frontend folder:
```bash
cd ../frontend
```

#### Create React app:
```bash
npx create-react-app .
```

#### Install additional dependencies:
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
```

#### Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

#### Update tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Update src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Replace src/App.js with the React component code from the frontend artifact above

#### Update package.json to add proxy:
```json
{
  "proxy": "http://localhost:5000"
}
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `.env` file
4. Whitelist your IP address

## 🚀 Running the Application

### Start Backend Server:
```bash
cd backend
npm run dev
```
Server will run on http://localhost:5000

### Start Frontend (in a new terminal):
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## 🔧 Configuration

### Environment Variables (backend/.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crudapp
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### Frontend API Configuration:
The frontend is configured to make API calls to `http://localhost:5000/api`. If you change the backend port, update the `API_BASE` constant in `App.js`.

## 📡 API Endpoints

### Authentication:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Items:
- `GET /api/items` - Get all user items (protected)
- `POST /api/items` - Create new item (protected)
- `GET /api/items/:id` - Get specific item (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- User-specific data access
- Input validation
- CORS configuration

## 🎨 UI Features

- Responsive design
- Modern Tailwind CSS styling
- Loading states
- Error handling
- Form validation
- Modal dialogs
- Smooth animations

## 🛠️ Customization

### Adding New Fields:
1. Update the Item schema in `server.js`
2. Update the form in the React component
3. Update the display cards

### Styling:
The app uses Tailwind CSS. Modify classes in the React component to customize the appearance.

### Database:
The app uses MongoDB with Mongoose. You can easily switch to other databases by updating the connection and schemas.

## 🚀 Production Deployment

### Backend:
1. Set production environment variables
2. Use services like Heroku, DigitalOcean, or AWS
3. Configure MongoDB Atlas for production

### Frontend:
1. Build the React app: `npm run build`
2. Deploy to services like Netlify, Vercel, or serve from Express

### Security Checklist:
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Implement rate limiting
- [ ] Add input sanitization

## 📝 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Check if MongoDB is running
   - Verify connection string in .env
   - Check network connectivity for Atlas

2. **CORS Errors**:
   - Ensure backend CORS is configured
   - Check if frontend proxy is set correctly

3. **Authentication Issues**:
   - Verify JWT secret is consistent
   - Check token storage in localStorage
   - Ensure middleware is applied correctly

4. **Port Conflicts**:
   - Make sure ports 3000 and 5000 are available
   - Update PORT environment variable if needed

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
