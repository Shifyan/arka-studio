# 📸 Arka Studio - Photo Studio Booking System

> **Modern web application for photo studio booking management built with Next.js and PostgreSQL**

## 📋 Project Overview

Arka Studio is a sophisticated photo studio booking system that provides an intuitive interface for customers to book photography sessions. The application features a multi-step booking process, package management, and session scheduling with intelligent consecutive slot selection.

### 🎯 Key Features

- **Smart Booking System**: Multi-step booking flow with data validation
- **Package Management**: Flexible photography package system
- **Session Scheduling**: Intelligent consecutive time slot selection
- **Invoice Generation**: Automatic invoice numbering system
- **Status Tracking**: Complete booking lifecycle management
- **Desktop-First Design**: Optimized for desktop experience with mobile blocking

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN/UI with Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-day-picker

### Backend

- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma 6.11.1
- **API**: Next.js API Routes

### Development Tools

- **Linting**: ESLint
- **Package Manager**: NPM
- **Development**: Turbopack (Next.js dev server)

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── booking/       # Booking CRUD operations
│   │   ├── packages/      # Package management
│   │   └── getInvoice/    # Invoice generation
│   ├── booking/           # Booking page
│   ├── services/          # Services showcase
│   ├── about/             # About page
│   ├── portofolio/        # Portfolio gallery
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── hero.jsx          # Landing hero section
│   ├── header.jsx        # Navigation
│   ├── footer.jsx        # Footer
│   ├── feature.jsx       # Features showcase
│   ├── counter.jsx       # Statistics counter
│   ├── gallery.jsx       # Image gallery
│   └── deviceBlocker.jsx # Mobile device blocker
├── lib/                  # Utilities and configuration
│   ├── store.js          # Zustand state management
│   └── utils.js          # Helper functions
└── generated/            # Prisma generated client
    └── prisma/
```

## 📊 Database Schema

### Core Models

```sql
-- Booking Management
model Booking {
  id             String        @id @default(cuid())
  invoiceNumber  String        @unique
  name           String
  email          String
  phone          String
  packageId      String
  package        Package       @relation(fields: [packageId], references: [id])
  date           DateTime
  sessionNumbers Int[]         # Array of selected time slots
  notes          String?
  status         BookingStatus @default(PENDING)
  paymentMethod  String?
  paymentStatus  String?
  paidAt         DateTime?
  canceledAt     DateTime?
  createdAt      DateTime      @default(now())
}

-- Package System
model Package {
  id          String    @id @default(cuid())
  name        String
  description String?
  price       Int       # Price in IDR
  duration    Int       # Duration in minutes
  image       String?
  bookings    Booking[]
  createdAt   DateTime  @default(now())
  order       Int       # Display order
}

-- Booking Status Enum
enum BookingStatus {
  PENDING
  PAID
  CANCELED
  COMPLETED
}
```

## 📈 Performance Metrics

### Current Performance

- **Build Time**: ~30s (with Turbopack)
- **Bundle Size**: Optimized with Next.js
- **Database Queries**: Efficient with Prisma
- **Loading Speed**: Fast with SSR/SSG

### Optimization Opportunities

- Image optimization (next/image)
- Code splitting (dynamic imports)
- Database query optimization
- CDN implementation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shifyan** - [@a.shif_yan](https://www.instagram.com/a.shif_yan/)

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Prisma team for the amazing ORM
- ShadCN for the beautiful UI components
- Tailwind CSS for the utility-first approach

---

## 📊 Project Statistics

- **Lines of Code**: ~2,000+
- **Components**: 15+
- **API Endpoints**: 8+
- **Database Tables**: 3
- **Dependencies**: 25+
- **Development Time**: Estimated 2-3 months
