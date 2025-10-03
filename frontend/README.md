# FreelanceHub Frontend

A modern, responsive React.js frontend for the FreelanceHub platform with beautiful UI and seamless backend integration.

## Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds and smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔐 **Authentication**: JWT-based authentication with secure token management
- 👥 **Role-based Access**: Separate registration flows for Freelancers and Recruiters
- 🚀 **Fast Performance**: Optimized React components with lazy loading
- 🎯 **User Experience**: Intuitive navigation and smooth transitions

## Pages

- **Home**: Landing page with hero section, features, and call-to-action
- **About**: Company information and values
- **Register**: Role selection and registration forms
- **Login**: Secure authentication
- **Profile**: User dashboard with role-specific content

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Django backend running on http://localhost:8000

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd Freelancing-Application/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to http://localhost:3000

### Backend Integration

The frontend is configured to work with the Django backend:

- **API Base URL**: http://localhost:8000
- **Proxy Configuration**: Requests are automatically proxied to the backend
- **CORS**: Backend is configured to allow requests from localhost:3000

### API Endpoints Used

- `POST /api/v1/accounts/register/` - User registration
- `POST /api/v1/accounts/login/` - User login
- `GET /api/v1/accounts/profile/` - Get user profile
- `POST /api/v1/accounts/passwordchange/` - Change password
- `POST /api/v1/accounts/passwordreset/` - Send reset email

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Home.js & Home.css
│   │   ├── About.js & About.css
│   │   ├── Register.js & Register.css
│   │   ├── Login.js & Login.css
│   │   └── Profile.js & Profile.css
│   ├── App.js & App.css
│   ├── index.js & index.css
│   └── README.md
├── package.json
└── README.md
```

## Key Features

### Authentication System
- JWT token management
- Automatic token refresh
- Protected routes
- Role-based access control

### Registration Flow
1. Role selection (Freelancer/Recruiter)
2. Form validation
3. Backend integration
4. Automatic login after registration

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Styling
- CSS Grid and Flexbox
- Smooth animations
- Gradient backgrounds
- Modern color scheme

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the FreelanceHub platform.










