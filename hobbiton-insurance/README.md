# InsureFlow - Modern Insurance Quote Calculator

![InsureFlow Logo](./src/assets/hobbiton-logo.png)

A modern, interactive motor insurance quote calculator built with cutting-edge web technologies. This project showcases a beautiful user interface, smooth animations, and a seamless user experience.

## 🚀 Tech Stack

### Frontend Framework
- **React 18** - Latest version of React with improved rendering and state management
- **TypeScript** - For type safety and better developer experience
- **Vite** - Next-generation frontend tooling for faster development and builds

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready animation library
- **Headless UI** - Unstyled, accessible UI components
- **React Icons** - Comprehensive icon library

### State Management & Data Persistence
- **Firebase**
  - Authentication (Anonymous auth)
  - Firestore (Quote storage)
- **Local Storage** - For form persistence and demo mode

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## ✨ Features

### Modern UI/UX
- **Glassmorphism Design** - Contemporary glass-like UI elements
- **Smooth Animations** - Page transitions and micro-interactions
- **Responsive Layout** - Mobile-first design approach
- **Dark Theme** - Eye-friendly dark mode with gradient accents
- **Interactive Components** - Rich interactive elements

### Core Functionality
1. **Multi-step Quote Process**
   - Vehicle Information
   - Driver Details
   - Coverage Options
   - Quote Summary

2. **Smart Vehicle Search**
   - Auto-complete functionality
   - Real-time search results
   - Vehicle details validation

3. **Coverage Options**
   - Comprehensive
   - Third Party, Fire & Theft
   - Third Party Only
   - Customizable excess amounts

4. **Quote Management**
   - Save quotes for later
   - View quote history
   - Compare different quotes
   - Load previous quotes

### Data Persistence
- **Firebase Integration**
  - Secure data storage
  - Real-time updates
  - User session management
- **Local Storage Fallback**
  - Works in demo mode
  - Form state persistence
  - Quote history

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets and images
├── components/      # React components
│   ├── steps/      # Quote step components
│   └── ...         # Other components
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── App.tsx         # Main application component
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd hobbiton-insurance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a .env file:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- **Secondary**: Pink (#EC4899) accents
- **Background**: Dark gradient with glass effects
- **Text**: White and gray shades for contrast

### Typography
- **Headings**: Inter font, bold weight
- **Body**: System font stack
- **Gradients**: Used for important text and buttons

### Components
- **Cards**: Glass effect with hover states
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Dark theme with focus states
- **Icons**: React Icons library with consistent styling

## 🔒 Security

- **Anonymous Authentication**: Secure user sessions without registration
- **Data Validation**: Client and server-side validation
- **Environment Variables**: Secure configuration management
- **Firebase Security Rules**: Proper data access control

## 🌟 Future Enhancements

1. **User Accounts**
   - Email/password authentication
   - Social login options
   - Profile management

2. **Advanced Features**
   - Real-time premium calculation
   - Document upload capability
   - Payment integration
   - Policy generation

3. **Analytics & Reporting**
   - Usage analytics
   - Quote conversion tracking
   - User behavior analysis

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
