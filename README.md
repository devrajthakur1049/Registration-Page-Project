# Week 1 Assignment - Introduction to React
## React Registration Form with Validation

### 📁 Project Structure
```
src/
├── App.js              # Router setup (2 routes)
├── App.css             # Global styles
├── index.js            # Entry point
└── pages/
    ├── RegistrationForm.js   # Main form with validation
    ├── RegistrationForm.css
    ├── FormDetails.js        # Details page after submit
    └── FormDetails.css
```

### 🚀 How to Run

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start development server
npm start

# Opens at http://localhost:3000
```

### ✅ Features Implemented

| Feature | Done |
|---------|------|
| First Name, Last Name | ✅ |
| Username validation | ✅ |
| Email validation | ✅ |
| Password with Show/Hide toggle | ✅ |
| Phone + Country Code dropdown | ✅ |
| Country dropdown | ✅ |
| City field | ✅ |
| PAN validation (ABCDE1234F format) | ✅ |
| Aadhaar validation (12 digits) | ✅ |
| useState for input tracking | ✅ |
| Error messages (conditional rendering) | ✅ |
| Submit disabled until valid | ✅ |
| React Router redirect on submit | ✅ |
| Details page showing form data | ✅ |
| Responsive design | ✅ |

### 🔐 Validation Rules

- **First/Last Name**: Letters only, min 2 chars
- **Username**: Letters, numbers, underscore; min 3 chars
- **Email**: Valid email format
- **Password**: Min 8 chars, 1 uppercase, 1 number, 1 special char
- **Phone**: Exactly 10 digits
- **Country**: Required selection
- **City**: Letters only
- **PAN**: Format ABCDE1234F (5 letters + 4 digits + 1 letter)
- **Aadhaar**: Exactly 12 digits

### 📦 Dependencies

- react
- react-dom
- react-router-dom
- react-scripts
