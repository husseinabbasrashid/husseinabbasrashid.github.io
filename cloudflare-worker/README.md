# Separate image uploads for the chat

Chat text stays in Firebase Firestore. This Cloudflare Worker sends image uploads to ImgBB and returns the hosted image URL; the ImgBB API key stays in a Worker secret, outside the public website files.

## Setup

1. Create an ImgBB account and copy its API key from [api.imgbb.com](https://api.imgbb.com/). Keep the key private. If it has already been shared, revoke it and create a new one.
2. In the Cloudflare dashboard, create a Worker and deploy the code from `image-upload.js`.
3. In the Worker settings, add a secret named `IMGBB_API_KEY` and paste the ImgBB key there. Never add the key to `chat.html` or publish it in GitHub.
4. Copy the Worker URL. In `chat.html`, replace `https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/upload` with that URL plus `/upload`.
5. Publish the updated `chat.html` to GitHub Pages.

The endpoint currently accepts image files up to 5 MiB and only allows browser requests from `https://husseinabbasrashid.github.io`.
