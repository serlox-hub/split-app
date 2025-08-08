# SplitApp

**SplitApp** is a super-fast, no-login web app for splitting expenses with friends. It's designed to be as simple and frictionless as possible—just create a group, add people, and start tracking who paid and who owes what. No authentication, no accounts—just clean and intuitive expense tracking.

Built with **Next.js**, **React**, and **Supabase**.

## 🚀 How It Works

SplitApp lets you:

- Create a group for your trip, event, or shared expenses
- Add people to the group
- Log expenses by indicating who paid and who participated
- Automatically calculate what each person owes

No sign-up, no login, no fuss.

## 🧱 Tech Stack

- **Next.js** – React-based framework for building fast web apps
- **Supabase** – Postgres database with real-time and REST APIs
- **Chakra UI components** – For fast and modern UI styling

## 🛠️ Local Development

### 1. Prerequisites

Before getting started, make sure you have:

- [Node.js](https://nodejs.org/) installed
- The [Supabase CLI](https://supabase.com/docs/guides/cli) installed globally or locally

### 2. Clone the Repository

```bash
git clone https://github.com/serlox-hub/split-app.git
cd split-app
```

### 3. Start Supabase Locally

Supabase is used as the backend and database. To start it locally:

```bash
npx supabase start
```

This spins up a local Supabase instance with Postgres and the REST API running.

Once it's up, you'll have:

- A local Postgres database
- Supabase Studio (web UI) at http://localhost:54323
- API and DB running at http://localhost:54321

To apply the schema (tables, relationships), run:

```bash
npx supabase db reset
```

⚠️ This will drop and recreate your database. Use with caution.

You can edit the schema in supabase/migrations/ or use Supabase Studio.

#### 3.1 Create a database migration

First, create a migration file:

```bash
npx supabase migration new <migration_name>
```

Then fill it with schema changes needed.

Finally, push the changes:

```bash
npx supabase db push
```

### 4. Configure Environment Variables

Create a .env.local file based on .env.example:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
```

Get the local anon key by running:

```bash
npx supabase status
```

Look under anon key in the output.

### 5. Start the App

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to see SplitApp in action.

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

Then start it with:

```bash
npm start
```

The optimized app will be served from the .next folder.

## 🚀 Deployment

SplitApp can be deployed to any Node.js-compatible platform like Vercel, Netlify, or AWS.

Make sure to configure your environment variables in your deployment platform:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

For production, you can connect to your hosted Supabase project instead of running it locally.

## 🤝 Contributing

Contributions are welcome! To contribute:

Fork the repository

Create a new branch

Make your changes

Submit a pull request

## 📄 License

This project is licensed under the MIT License.
