# Zion Determination Template

A professional web application for creating and managing healthcare determination templates. This tool streamlines the process of generating standardized healthcare determinations with proper formatting and consistent information.

## 🌟 Features

- **Dynamic Form Generation**: Create standardized healthcare determinations with consistent formatting
- **Eligibility Status Management**: Easily select and display different eligibility statuses
- **Medical Expense Cap Calculation**: Automatically calculate and display medical expense caps based on membership year and tobacco use
- **Clipboard Integration**: Copy formatted determinations to clipboard with a single click
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Toggle**: Switch between light and dark themes

## 🧩 Project Structure

The project follows a modular architecture with clear separation of concerns:

### Core Files

- `index.html` - Main application interface
- `style.css` - Application styling
- `README.md` - Project documentation

### JavaScript Modules

- `js/main.js` - Application entry point and initialization
- `js/form/handlers.js` - Core event handlers and form logic
- `js/form/render.js` - UI rendering functions
- `js/form/validation.js` - Form validation utilities
- `js/form/options.js` - Constants and configuration options
- `js/form/theme.js` - Theme management
- `js/form/toggles.js` - Toggle button functionality
- `js/form/eligibility.js` - Eligibility selection handling
- `js/form/member.js` - Member information management

## 📋 Module Descriptions

### main.js
The application entry point that initializes all components and sets up event listeners. It coordinates the different modules and ensures they work together seamlessly.

### handlers.js
Contains core functionality including:
- Membership year calculation
- Anniversary and cap display management
- Clipboard operations
- Content copying with proper formatting

### render.js
Handles all UI updates and rendering operations:
- Membership year display
- Section visibility toggling
- Theme application
- Medical expense cap formatting

### validation.js
Provides utilities for validating form inputs:
- Date validation
- Numeric input validation
- Text formatting helpers

### options.js
Stores application constants and configuration values:
- Medical expense cap amounts
- Minimum valid years
- Other configuration parameters

### theme.js
Manages the application's visual theme:
- Light/dark mode toggle
- Theme persistence
- Visual styling coordination

### toggles.js
Handles toggle button interactions:
- Button state management
- Visual feedback
- Toggle-specific actions

### eligibility.js
Manages eligibility selection and related UI:
- Eligibility status selection
- Conditional field display
- Shareable status management

### member.js
Handles member-specific information:
- Age-based field toggling
- Tobacco use status
- Minor status management

## 🔧 Technical Implementation

The application follows modern JavaScript best practices:

- **Modular Design**: Clear separation of concerns with specialized modules
- **Event Delegation**: Efficient event handling
- **DOM Manipulation**: Clean and performant DOM updates
- **Responsive Layout**: Flexbox-based responsive design
- **Accessibility**: Semantic HTML and keyboard navigation
- **Clean Code**: Well-documented, consistent coding style

## 🚀 Future Enhancements

Potential areas for future development:

- Data persistence with local storage
- Template saving and management
- User authentication
- Export to different formats (PDF, Word)
- Integration with healthcare systems

## 📝 Usage

1. Open `index.html` in a web browser
2. Fill in the required information
3. Select the appropriate eligibility status
4. Click "Copy Now!" to copy the formatted determination to clipboard
5. Paste the determination into your desired application

## 💻 Development

This project demonstrates several important front-end development skills:

- **JavaScript Module Pattern**: Clean organization of code
- **DOM Manipulation**: Efficient updates without frameworks
- **Event Handling**: Proper event delegation and management
- **Form Handling**: Validation and processing
- **CSS Flexbox**: Responsive layout design
- **Clipboard API**: Modern browser API usage

## 🔍 Code Quality

The codebase demonstrates:

- Clear and consistent naming conventions
- Comprehensive documentation
- Separation of concerns
- DRY (Don't Repeat Yourself) principles
- Maintainable and extensible architecture
