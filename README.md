# Discuss App

Blog Application for topics, posts using NextJS v15 and React v19 using App Router, Tailwind Auth.js, HeroUI and Prisma Client as backend!

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Topics

We implemented several new topics and major changes on NextJS v15 + React v19 like:

- [Server Actions](#server-actions)
- [Server Components](#server-components)
- [Client Components](#client-components)
- [NextJS Caching System](#page-caching-system)
- [Static vs. Dynamic Pages](#static-vs.-dynamic-pages)
- [Data fetching Architecture](#data-fetching-architecture)

### Server Actions

```
'use server';
```

| ![image](/doc/screenshots/server_actions.png) | ![image](/doc/screenshots/server_actions_deep.png) |
| :-------------------------------------------: | :------------------------------------------------: |

### Server Components

| ![image](/doc/screenshots/server_components.png) | ![image](/doc/screenshots/server_components_deep.png) |
| :----------------------------------------------: | :---------------------------------------------------: |

### NextJS Caching System

![image](/doc/screenshots/nextjs_caching.png)

### Static vs. Dynamic Pages

![image](/doc/screenshots/dynamic_pages.png)

### Data Fetching Architecture

There are 2 ways to fetch data in a page:

- **Option #1**: Page component gets data and passes it to child.
  _Prons_:

  - Easy to see what daya a route needs to be displayed.
  - Easier to make the child component reusable.
  - Easier to avoid 'n+1' query issues.

  _Cons_:

  - Can lead to overfetching data.
  - Can lead to duplicate code in other pages using the child components.
  - Sometimes annoying to write the interface for complex query data.

- **Option #2**: Page component gets data and passes it to child.
  _Prons_:
  - Easier to build skeletons.
  _Cons_:
  - Child components implementation is locked in.

![image](/doc/screenshots/data_fetching_arch.png)

#### What is the best option?

**Define in Parent -> Fetch in child**

![image](/doc/screenshots/option1.5.png)
