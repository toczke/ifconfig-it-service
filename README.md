# IT Service Management Frontend

A modern, responsive web application for managing IT services, built with React, TypeScript, and Mantine UI.

## Features

- 🖥️ **Service Management**
  - Computer repair tracking
  - Custom PC building service
  - Pricing information
  - FAQ section

- 📱 **Job Status Tracking**
  - Real-time status updates
  - Detailed timeline view
  - Cost breakdown
  - Service reports and receipts

- 📬 **Contact System**
  - Contact form with validation
  - Discord webhook integration
  - Emergency contact options
  - Location map integration

- 🌓 **User Experience**
  - Dark/Light theme support
  - Responsive design
  - Mobile-friendly interface
  - Smooth scrolling navigation

## Tech Stack

- **Framework**: React with TypeScript
- **UI Library**: Mantine
- **Routing**: React Router
- **Icons**: Tabler Icons
- **Build Tool**: Vite
- **Package Manager**: npm/yarn (workspace)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/it-service-frontend.git
cd it-service-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
packages/
  └── frontend/
      ├── src/
      │   ├── components/
      │   │   ├── sections/
      │   │   └── ui/
      │   ├── pages/
      │   └── App.tsx
      ├── public/
      └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/it-service-frontend](https://github.com/yourusername/it-service-frontend) 