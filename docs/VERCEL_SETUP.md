# Setting Up Your Site on Vercel

Follow these steps to deploy your site for free on Vercel with a production-ready database.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

## Step 1: Push Code to GitHub
If you haven't already:
1.  Create a new repository on GitHub (e.g., `wedding-site`).
2.  Push your local code to it.

## Step 2: Import Project to Vercel
1.  Go to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the `wedding-site` repository you just created.
4.  **Do NOT click Deploy yet.** We need to set up the database first.

## Step 3: Add the Database (Postgres)
1.  In the Vercel project configuration screen (or the Storage tab if you already clicked deploy), go to **Storage**.
2.  Click **"Connect Store"** -> **"Create New"** -> **"Postgres"**.
3.  Give it a name (e.g., `wedding-db`) and select a region (e.g., `London` / `eu-west-2` since your wedding is in the UK).
4.  Click **Create**.
5.  Vercel will automatically add the necessary environment variables (`POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.) to your project.
    > **Important**: Ensure the variable `DATABASE_URL` is set to the value of `POSTGRES_PRISMA_URL` in your **Project Settings > Environment Variables** if it isn't automatically linked. Prisma looks for `DATABASE_URL`.

## Step 4: Deploy
1.  Navigate back to the **Project** page and click **Deploy**.
2.  Vercel will:
    *   Install dependencies.
    *   Run `prisma generate` (creates the database client).
    *   Run `prisma db push` (creates the tables in your new Postgres database).
    *   Build the site.
3.  Once green, your site is live!

## Step 5: Add Custom Domain
1.  Go to **Settings > Domains**.
2.  Enter your domain (e.g., `sambecwedding.com`).
3.  Follow the instructions to copy the **A Record** or **CNAME** to your domain provider (GoDaddy, Namecheap, etc.).

## Troubleshooting
*   **Database Error**: If the build fails saying it can't connect, ensure `DATABASE_URL` is defined in the environment variables.
*   **Local Development**: To run the site locally now, you can link your local environment to the cloud database:
    `npm i -g vercel`
    `vercel env pull .env.development.local`
