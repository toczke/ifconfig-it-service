# IT Service Management System

A monorepo containing a Discord bot and React frontend for managing IT service requests.

## Project Structure

```
it-service-monorepo/
├── packages/
│   ├── frontend/     # React frontend application
│   └── bot/          # Discord bot service
├── docker-compose.yml
├── package.json
└── .env.example
```

## Prerequisites

- Node.js 20.x or higher
- Docker and Docker Compose
- Discord Bot Token
- Discord Server with configured channels

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/it-service-monorepo.git
cd it-service-monorepo
```

2. Copy the environment variables file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token
CHANNELS_NEW_REQUESTS=your_new_requests_channel_id
CHANNELS_IN_PROGRESS=your_in_progress_channel_id
CHANNELS_DONE=your_done_channel_id
CHANNELS_REJECTED=your_rejected_channel_id
FRONTEND_URL=http://localhost:4173

# Frontend Configuration
VITE_BOT_API_URL=http://localhost:3001
```

## Development

### Using Docker (Recommended)

1. Start all services:
```bash
npm run dev
```

2. Stop all services:
```bash
npm run stop
```

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start frontend development server:
```bash
npm run frontend:dev
```

3. Start bot development server:
```bash
npm run bot:dev
```

## Features

### Discord Bot
- Handles IT service requests through Discord
- Manages request status (New, In Progress, Done, Rejected)
- Supports file attachments
- Creates threads for ongoing support
- Adds service notes to requests

### Frontend
- Modern React application with TypeScript
- Contact form for service requests
- File upload support
- Real-time status updates
- Responsive design

## Contributing

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 