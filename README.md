# Exam Solution Admin Panel

A modern, scalable admin panel built with Next.js 16, Mantine UI, and TypeScript for managing exam solutions.

## Features

- 🎨 **Modern UI** - Built with Mantine UI components
- 🔒 **Secure** - Request signing for API authentication
- 📊 **Data Management** - Full CRUD operations for all entities
- 🔄 **Real-time Updates** - React Query for efficient data fetching
- 📱 **Responsive** - Mobile-friendly admin interface
- 🎯 **Type-Safe** - Full TypeScript coverage
- 🚀 **Scalable** - Industry-standard architecture

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Mantine UI v8
- **State Management**: TanStack React Query
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Styling**: CSS Modules + Mantine

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd exam_solution_client
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Configure environment variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_REQUEST_SIGNATURE_SECRET=your-secret-key-here
```

5. Run development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture documentation.

### Key Directories

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components
- `src/services/` - API service layer
- `src/hooks/` - Custom React hooks
- `src/lib/` - Core libraries and utilities
- `src/types/` - TypeScript type definitions
- `src/config/` - Configuration files

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The project is configured to work with the Exam Solution API. See [API_DOC.md](./API_DOC.md) for complete API documentation.

### Request Signing

For write operations (POST, PATCH, PUT, DELETE), the API client automatically signs requests when `NEXT_PUBLIC_REQUEST_SIGNATURE_SECRET` is configured.

## Features Overview

### Admin Dashboard
- Overview of all system entities
- Quick navigation to different sections

### Classes Management
- Create, read, update, delete classes
- View class subjects
- Pagination support

### Subjects Management
- Full CRUD operations
- Chapter management
- Subject-class relationships

### Questions Management
- Support for MCQ, SQ, and CQ question types
- Filtering and search
- Bulk operations

### Question Sets
- Create question sets
- Manage set contents
- Export functionality

### Exam Histories
- Track exam history
- View past exams
- Analytics and reports

## Development Guidelines

### Adding a New Feature

1. **Create Service** (`src/services/`)
   - Define API methods
   - Handle request/response

2. **Create Hooks** (`src/hooks/`)
   - Use React Query for data fetching
   - Handle mutations and cache invalidation

3. **Create Components** (`src/components/`)
   - Build reusable UI components
   - Follow Mantine patterns

4. **Create Page** (`src/app/(admin)/`)
   - Use Next.js App Router
   - Integrate hooks and components

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed examples.

### Code Style

- Use TypeScript for all files
- Follow Next.js App Router conventions
- Use Mantine components for UI
- Implement proper error handling
- Add loading states
- Use React Query for data fetching

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | Yes |
| `NEXT_PUBLIC_REQUEST_SIGNATURE_SECRET` | Secret for request signing | Optional |

## Contributing

1. Follow the project structure
2. Maintain TypeScript types
3. Write reusable components
4. Add proper error handling
5. Test your changes

## License

ISC
