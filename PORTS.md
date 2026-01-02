# Local Development Ports

This document tracks all port assignments for local development to prevent conflicts when running multiple projects simultaneously.

## Project A — Multi-Tenant SaaS Chatbot

- **Frontend**: 8080
- **Backend**: 8000
- **Postgres**: 5433
- **MongoDB**: 27017
- **MinIO**: 9000 / 9001
- **pgAdmin**: 5050

## Project B — Thindi Potha (Cloud Kitchen Ordering Platform)

- **Frontend (Next.js)**: 8081
- **Backend**: 8001 (if applicable)
- **MongoDB**: 27017 (shared with Project A or separate instance)
- **Mongo Express**: 8083

## Port Usage Summary

| Port | Service | Project |
|------|---------|---------|
| 8000 | Backend API | Project A |
| 8001 | Backend API | Project B |
| 8080 | Frontend | Project A |
| 8081 | Frontend (Next.js) | Project B |
| 8083 | Mongo Express UI | Project B |
| 27017 | MongoDB | Shared/Project B |
| 5433 | PostgreSQL | Project A |
| 9000 | MinIO API | Project A |
| 9001 | MinIO Console | Project A |
| 5050 | pgAdmin | Project A |

## Configuration Details

### Thindi Potha Frontend (Next.js)
- **Port**: 8081 (locked, no auto-switch)
- **Configuration**: `package.json` dev script uses `-p 8081` flag
- **Start Command**: `npm run dev`
- **URL**: http://localhost:8081

### Thindi Potha Backend
- **Port**: 8001 (reserved for future backend implementation)
- **Status**: No separate backend exists - Next.js API routes handle backend functionality
- **API Routes**: Available at http://localhost:8081/api/*

### Docker Services
- **MongoDB**: Port 27017 (standard MongoDB port)
- **Mongo Express**: Port 8083 (mapped from container port 8081)
- **No conflicts** with Project A ports

## Verification

To verify port usage, run:

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E "8000|8001|8080|8081|5433|9000|9001|5050|8083|27017"
```

## Notes

- Ports are **strictly enforced** - no auto-switching
- If a port is in use, the application will fail to start rather than switching ports
- Always check this document before assigning new ports
- Update this document when adding new services

