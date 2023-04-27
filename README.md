# PersonaScope

Bloomtech data analysis tool

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-blue)](https://personascopeauth.onrender.com/login)

## Features

- Next.js for SSG React apps
- Tailwind CSS for styling
- DaisyUI for a beautiful and functional UI
- TypeScript for type safety
- Chart.js for data visualization
- Supabase for authentication and storage

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/ts-nextjs-tailwind-starter.git
```

2. Install dependencies

   ```bash
   cd PersonaScopeAuth
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server

```bash
        npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app

## Endpoint Usage

To use the endpoint, make a GET request to /api/data with the format query parameter set to either json or csv to receive the data in the respective format.

For example:

```bash
GET /api/data?format=json
```

or

```bash
GET /api/data?format=csv
```

## Deployment

The app is currently deployed on [Render](https://render.com/). Visit the live demo here: [https://personascopeauth.onrender.com/login](https://personascopeauth.onrender.com/login)

## Optimization Recommendations

To fully optimize the app, consider the following changes:

1. Switch to a hosting platform that supports server-side rendering (SSR) for Next.js apps
2. Sync the free API used in the project with a database (e.g., once per day with scheduled functions) and use this database to query data for more efficient data fetching

## License

[MIT](https://choosealicense.com/licenses/mit/)
