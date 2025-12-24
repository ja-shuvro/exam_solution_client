# Project Structure

This document outlines the architecture and structure of the Exam Solution Admin Panel.

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin route group
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── classes/              # Classes feature
│   │   ├── subjects/             # Subjects feature
│   │   ├── questions/            # Questions feature
│   │   ├── question-sets/        # Question sets feature
│   │   ├── exam-histories/       # Exam histories feature
│   │   └── settings/             # Settings page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # Reusable components
│   ├── common/                   # Common UI components
│   │   ├── data-table.tsx       # Reusable data table
│   │   ├── form-modal.tsx       # Form modal wrapper
│   │   ├── confirm-dialog.tsx   # Confirmation dialog
│   │   └── index.ts
│   └── layout/                   # Layout components
│       ├── admin-navbar.tsx     # Admin sidebar navigation
│       ├── admin-header.tsx     # Admin header
│       └── index.ts
│
├── config/                       # Configuration files
│   ├── constants.ts             # App constants
│   └── env.ts                   # Environment variables
│
├── hooks/                        # Custom React hooks
│   ├── use-classes.ts           # Classes data hooks
│   └── index.ts
│
├── lib/                          # Core libraries
│   ├── api-client.ts            # Axios client with request signing
│   └── react-query.tsx          # React Query provider
│
├── services/                     # API service layer
│   ├── classes.service.ts       # Classes API service
│   ├── subjects.service.ts      # Subjects API service
│   ├── chapters.service.ts      # Chapters API service
│   ├── questions.service.ts     # Questions API service
│   └── index.ts
│
├── types/                        # TypeScript type definitions
│   ├── api.ts                   # API response types
│   ├── common.ts                # Common types
│   ├── entities.ts              # Entity types
│   └── index.ts
│
└── utils/                        # Utility functions
    ├── format.ts                # Formatting utilities
    ├── validation.ts            # Validation utilities
    └── index.ts
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Services**: Handle all API communication
- **Hooks**: Manage data fetching and state
- **Components**: Focus on UI rendering
- **Utils**: Provide reusable helper functions

### 2. **DRY (Don't Repeat Yourself)**
- Reusable components (`DataTable`, `FormModal`, `ConfirmDialog`)
- Shared hooks for common operations
- Centralized API client configuration
- Common type definitions

### 3. **Scalability**
- Feature-based folder structure
- Modular service layer
- Query key factories for React Query
- Easy to add new features

### 4. **Type Safety**
- Full TypeScript coverage
- Strongly typed API responses
- Entity type definitions
- Type-safe hooks and services

## Key Features

### API Client
- Automatic request signing for write operations
- Centralized error handling
- Request/response interceptors
- Type-safe API calls

### React Query Integration
- Optimistic updates
- Automatic cache invalidation
- Loading and error states
- Query key management

### Component Library
- Reusable data table with pagination
- Form modals
- Confirmation dialogs
- Consistent UI patterns

### Admin Layout
- Responsive sidebar navigation
- Header with actions
- Consistent page structure
- Route-based active states

## Adding New Features

### 1. Create Service
```typescript
// src/services/new-feature.service.ts
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';

export const newFeatureService = {
  getAll: async (params) => apiClient.get(API_ENDPOINTS.NEW_FEATURE, { params }),
  // ... other methods
};
```

### 2. Create Hooks
```typescript
// src/hooks/use-new-feature.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { newFeatureService } from '@/services';

export function useNewFeature() {
  return useQuery({
    queryKey: ['new-feature'],
    queryFn: () => newFeatureService.getAll(),
  });
}
```

### 3. Create Page
```typescript
// src/app/(admin)/new-feature/page.tsx
'use client';
import { useNewFeature } from '@/hooks';

export default function NewFeaturePage() {
  const { data, isLoading } = useNewFeature();
  // ... component logic
}
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_REQUEST_SIGNATURE_SECRET=your-secret-key
```

## Best Practices

1. **Always use TypeScript** - No `any` types
2. **Use React Query** - For all data fetching
3. **Follow naming conventions** - kebab-case for files, PascalCase for components
4. **Keep components small** - Single responsibility
5. **Reuse components** - Use common components library
6. **Handle errors** - Show user-friendly error messages
7. **Loading states** - Always show loading indicators
8. **Type everything** - Define types for all data structures

