# Acropolis Email Signature Generator (Sign-ATE)

A React-based web application designed to standardize and generate professional email signatures for the staff and students of the **Acropolis Group of Institutions**.

## Features

- **Standardized Templates:** Automatically generates clean, branded email signatures compliant with Acropolis guidelines.
- **Dynamic Institution Selection:** Select your specific college (AITR, AIMSR, AIPER, AIL, etc.) to automatically fetch and embed the correct logo and website link.
- **Rich Text Editor:** Built-in `react-quill` editor allows users to easily format additional information (like quotes, disclaimers, or specific announcements) with bold, italic, and underline styling.
- **One-Click Copy:** Easily copy the generated HTML signature directly to your clipboard, ready to be pasted into Gmail, Outlook, or any other email client while retaining all images and formatting.

## Technology Stack

- **Frontend:** React 18
- **Styling:** React Bootstrap & vanilla CSS
- **Rich Text Editor:** React Quill
- **Routing:** React Router

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WarPigC/Sign-ate-2.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Sign-ate-2
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm start
```
This will launch the app in your default web browser at `http://localhost:3000`. The page will reload if you make edits to the code.

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This builds the app for production to the `build` folder, bundling React in production mode and optimizing the build for the best performance.
