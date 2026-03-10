# ForexPro Calculator

A comprehensive forex trading calculator with position sizing, risk management, and trade journaling features.

## Features

### Calculators
- **Position Size Calculator**: Calculate optimal lot sizes based on risk percentage
- **Pip Calculator**: Calculate pip values for any currency pair
- **Risk-Reward Calculator**: Analyze risk-reward ratios
- **Lot Size Calculator**: Calculate lot sizes from risk amounts
- **Margin Calculator**: Calculate required margin for trades

### User Management
- **User Registration**: Create accounts with email and password
- **Secure Login**: Password hashing for security
- **Personal Journals**: User-specific trade journaling
- **Data Persistence**: Local storage with user isolation

### Additional Features
- Support for 50+ currency pairs (majors, crosses, exotics, metals, crypto)
- Real-time calculations with visual feedback
- Trade setup sharing
- Responsive design for mobile and desktop
- SEO optimized pages

## Authentication System

The application includes a client-side authentication system with the following features:

### Security Features
- **Password Hashing**: Simple hash function for password storage
- **Email Validation**: Proper email format validation
- **Password Requirements**: Minimum 6 characters
- **User Isolation**: Each user has separate journal storage

### User Data Storage
- User accounts stored in `localStorage` under `fpro-users`
- User sessions stored under `fpro-user`
- User-specific journals stored under `fpro-journal-{userId}`

### Limitations
This is a client-side implementation for demonstration purposes. In production, authentication should be handled server-side with proper security measures.

## File Structure
```
forex-pro/
├── index.html      # Main calculator page
├── index.css       # Stylesheet
├── app.js          # Main application logic
├── about.html      # About page
├── contact.html    # Contact page
└── privacy.html    # Privacy policy
```

## Usage

1. Open `index.html` in a web browser
2. Sign up for a new account or login
3. Use the various calculators
4. Save trades to your personal journal
5. Access other pages via navigation

## Development

Built with vanilla JavaScript, HTML5, and CSS3. No external dependencies required.

## License

Educational purposes only. Not for production use without proper security implementation.