# Deploying the Mubingym admin panel

The compose project `mubingym-admin` runs one container, `web`: nginx serving the built Vue app on
`127.0.0.1:8082`. The host nginx terminates HTTPS for `admin.mubingym.com` and proxies to it. The API is a separate
project (`abdurazzoq9050/fitness`, its own `deploy/README.md`).

Only `master` (this client's branch) is deployed, by hand: an operator pushes `master` and runs `deploy/deploy.sh`
on the server. `main` and `missfitness` are never deployed here.

## Deploy

```bash
cd /var/www/mubingym-admin && deploy/deploy.sh
```

The API address is compiled into the bundle and into the page's Content-Security-Policy at build time, from
`VITE_API_URL` in `.env`. Changing it needs a deploy, not a restart.

## Rollback

- **Normal:** `git revert <bad commit>` on `master`, push, run `deploy/deploy.sh`.
- **Urgent:** on the server `git reset --hard <good commit>`, then
  `docker compose build --pull && docker compose up -d --wait`. The next `deploy/deploy.sh` returns to `master`.

## First launch

1. Checkout and `.env` (as the operator user, in the docker group):
   ```bash
   git clone -b master https://github.com/TajSoft-Group/Fitness_Front.git /var/www/mubingym-admin
   cd /var/www/mubingym-admin
   cp .env.example .env      # VITE_API_URL=https://api.mubingym.com, PORT=8082
   deploy/deploy.sh
   curl -sI http://127.0.0.1:8082/
   ```
2. Host nginx and HTTPS, after `admin.mubingym.com` points to this server:
   ```bash
   sudo cp deploy/mubingym-admin.conf /etc/nginx/sites-available/mubingym-admin.conf
   sudo ln -s /etc/nginx/sites-available/mubingym-admin.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx --cert-name admin.mubingym.com -d admin.mubingym.com --redirect --hsts
   ```
   The server keeps a **copy** of `deploy/mubingym-admin.conf`, never a link into this checkout: certbot writes HTTPS
   into it, and a deploy would wipe that. When the repo file changes, copy it again and run
   `sudo certbot --nginx --cert-name admin.mubingym.com -d admin.mubingym.com --reinstall --redirect --hsts`.
3. The API must allow the new origin: its CORS config currently allows every origin (`nelmio_cors.yaml`).

## Notes

- The page may load only from itself, the API (`VITE_API_URL`), Google Fonts and jsDelivr (Chart.js in `index.html`).
  A new external script, font or image host must be added to the CSP in `docker/nginx.conf`, or the browser blocks it.
- Logs: `docker compose logs -f web`.
