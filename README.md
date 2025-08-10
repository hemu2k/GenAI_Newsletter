# Newsletter Starter

## 1) Setup

```bash
pnpm i # or npm install or yarn
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

Visit http://localhost:3000

## 2) Subscribe flow
- Enter your email on the home page
- Check console for a dev confirm link (if RESEND_API_KEY is not set)
- Click the link to confirm

## 3) Create an issue
- Open `/issues/new` (browser will prompt for Basic Auth; use ADMIN_USER/PASS from .env)
- Enter a title + HTML body and save; note the returned slug and id

## 4) Send the issue
- Go to `/admin`, paste the issue id, click **Send**

## 5) Production notes
- Switch to Postgres by updating `datasource db` in `schema.prisma` and `DATABASE_URL`
- Set `RESEND_API_KEY` and `FROM_EMAIL`
- Consider adding rate limiting and webhooks for bounces/unsubscribes
- Add `/unsubscribe` and a footer link in the email HTML for compliance
