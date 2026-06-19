# Deploy DevTrack Pro on Render

## 1. Push the project to GitHub

Create a GitHub repository and push this folder. Do not upload `.env`.

## 2. Create a Render Web Service

In Render:

- New > Web Service
- Connect your GitHub repository
- Language: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

The app requires Node.js `20.19.0` or newer. This is already declared in `package.json`.

## 3. Add environment variables

In Render > Environment, add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=use_a_long_random_secret
NODE_ENV=production
```

Do not add `PORT`; Render provides it automatically.

## 4. MongoDB Atlas network access

In MongoDB Atlas, allow Render to connect:

- Atlas > Network Access > Add IP Address
- For a quick student/demo deployment, allow access from anywhere with `0.0.0.0/0`
- For production, restrict this to trusted outbound IPs if your hosting plan provides them

If Render logs show `querySrv`, `ECONNREFUSED`, `ENOTFOUND`, or authentication errors, re-check the `MONGO_URI`, Atlas database user password, and Network Access settings.

## 5. Deploy

Click Create Web Service. Render will build the app and give you a public `onrender.com` URL.
