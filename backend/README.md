# Backend

## Admin seeder

Creates a default admin user for logging in.

- Default credentials (override with env vars):
  - username: `admin`
  - email: `admin@example.com`
  - password: `Admin@12345`

Environment variables you can set before running:
- `MONGODB_URI` — MongoDB connection string (defaults to `mongodb://localhost:27017/portfolio`)
- `ADMIN_USERNAME` — Admin username (defaults to `admin`)
- `ADMIN_EMAIL` — Admin email (defaults to `admin@example.com`)
- `ADMIN_PASSWORD` — Admin password (defaults to `Admin@12345`)

### Run

From the `backend` folder:

```powershell
# Optionally set env vars for this shell session
$env:MONGODB_URI="mongodb://localhost:27017/portfolio"; $env:ADMIN_USERNAME="admin"; $env:ADMIN_EMAIL="admin@example.com"; $env:ADMIN_PASSWORD="ChangeMe123!";

# Seed the admin
npm run seed:admin
```

If an admin already exists (matched by email or username), the seeder will print the existing admin and do nothing.

### Security tip
- Change the default password immediately in production.
- Prefer setting `ADMIN_PASSWORD` via environment variables rather than committing secrets.
