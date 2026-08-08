# Frontend Agent Guidelines & Implementation Rules

## Overview
This document guides agentic development on the frontend for the **Client Project Tracker**.

## Key Guidelines
- Maintain strict typing in `src/types/project.types.ts`.
- Keep API logic inside `src/services/project.service.ts`.
- Encapsulate data fetching inside custom hooks (`src/hooks/useProjects.ts`).
- Differentiate `isLoading` vs `isFetching` to prevent UI race conditions and jitter during mutations/refetches.
- Use Zod with `react-hook-form` for form validation.
