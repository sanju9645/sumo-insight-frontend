
# 🎨 Frontend Setup Guide

This guide outlines the steps to **set up, configure, and deploy** the frontend for your project.

---

## 🚀 Project Initialization

Follow the [ShadCN UI Installation Guide](https://ui.shadcn.com/docs/installation/) to set up the project.

### 🛠️ Steps:

1. Use **`frontend`** as the project name during installation.
2. After installation, open `frontend/package.json` and **remove** the following line:

   ```json
   "type": "module",
   ```

---

## 🗂️ Folder Structure

* **`components/ui`** — ShadCN UI components
* **`components`** — Your custom components

---

## 📦 Dependencies

### ✅ Production Dependencies

```bash
npm i @auth0/auth0-react @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @tanstack/react-table class-variance-authority clsx date-fns lucide-react next-themes quill react-colorful react-day-picker react-hook-form react-query react-quill react-router-dom recharts sonner tailwind-merge tailwindcss-animate zod
```

### 🧪 Development Dependencies

```bash
npm i tailwindcss postcss eslint autoprefixer @types/node --save-dev
```

---

## ➕ Adding ShadCN Components

Use the following commands to add UI components:

```bash
npx shadcn@latest add sheet
npx shadcn@latest add separator
npx shadcn@latest add calendar
```

---

## 🔐 Environment Configuration

Create a `.env` file in the root of your project and add the following:

<details>
<summary>📄 <code>.env</code> Example</summary>

```env
VITE_API_BASE_URL=http://localhost:3000

VITE_AUTH0_DOMAIN=<vite_auth0_domain>
VITE_AUTH0_CLIENT_ID=<vite_auth0_client_id>
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_AUTH0_AUDIENCE=sumo-insight
```

</details>

> 💡 After setting up your `.env`, run the development server:
>
> ```bash
> npm run dev
> ```

> ✅ Confirm the server is up by visiting: [http://localhost:3000/health](http://localhost:3000/health)


Here's your **Deployment** guide formatted for inclusion in a `README.md` file using proper Markdown:

---

## 🚀 Deployment (Frontend on Render)

### 1. Go to [Render](https://render.com)

### 2. Select **Static Site**

### 3. Connect Source Code

Connect your GitHub repository to Render.

### 4. Fill in the deployment fields:

| Field             | Value                   |
| ----------------- | ----------------------- |
| **Name**          | `sumo-insight-frontend` |
| **Project**       | `Sumo Insight`          |
| **Build Command** | `npm run build`         |
| **Branch**        | `production`            |
| **Publish Dir**   | `./dist`                |

---

### 5. Add Environment Variables

| Variable Name             | Value                                                                |
| ------------------------- | -------------------------------------------------------------------- |
| `VITE_API_BASE_URL`       | `https://sumo-insight-backend.onrender.com` *(Render backend URL)*   |
| `VITE_AUTH0_CALLBACK_URL` | `https://sumo-insight-frontend.onrender.com` *(Render frontend URL)* |

> ⚠️ **Note:** Do **not** use `localhost` for these values in production.

---

### 6. Configure Auth0 Settings

Before deploying, update your Auth0 application's settings:

#### Allowed Callback URLs:

```
http://localhost:5173,https://sumo-insight-frontend.onrender.com
```

#### Allowed Logout URLs:

```
http://localhost:5173,https://sumo-insight-frontend.onrender.com
```

#### Allowed Web Origins:

```
http://localhost:5173,https://sumo-insight-frontend.onrender.com
```



## 🚀 Converting to PWA

To convert this Vite + React app into a Progressive Web App (PWA), follow the steps below:

### 1. Install the PWA Plugin

```bash
npm install vite-plugin-pwa --save-dev
```

### 2. Follow
```bash
https://www.saurabhmisra.dev/setup-react-pwa-using-vite/
```

### 2. Run
```bash
npm run build
npm run preview
```




**Dockerizing your Vite-based React frontend** for both **development** and **production**, and **publishing it to Docker Hub**.

---

## 🐳 Step 1: `.dockerignore`

```dockerignore
node_modules
dist
.git
.vscode
.env
```

---

## 🐳 Step 2: `Dockerfile`

```Dockerfile
# Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]


```

---

## 🐳 Step 4: `docker-compose.yml`

```yaml
# docker-compose.yml

version: '3.9'
services:
  app:
    container_name: sumo-insight-frontend
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    env_file:
      - .env
```

---


## 🧪 Step 7: Update vite config

```bash
server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
```

---

## 🧪 Step 9: Build & run:


```bash
docker compose up --build -d
```

---

## 📦 Step 10: Build Production Image

```bash
docker build -t your-dockerhub-username/sumo-insight-frontend:latest .
```

---

## 🚀 Step 11: Push to Docker Hub

```bash
docker login
docker push your-dockerhub-username/sumo-insight-frontend:latest
```
---

## 🖥️ Step 12: Run Image Anywhere

```bash
docker pull your-dockerhub-username/sumo-insight-frontend:latest

docker run -it --rm -p 5173:5173 --env-file .env sanju9645/sumo-insight-frontend:latest
```

---

## 📄 README / DockerHub Overview Example

````markdown
## 🧭 Getting Started with `sumo-insight-frontend`

### ✅ Development

1. Clone the repo  
2. Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_AUTH0_AUDIENCE=sumo-insight
````

3. Run with Docker Compose

```bash
docker compose up
```

App runs on: [http://localhost:5173](http://localhost:5173)

---

### 🚀 Production

```bash
docker pull your-dockerhub-username/sumo-insight-frontend:latest
docker run -d -p 5173:5173 your-dockerhub-username/sumo-insight-frontend:latest
```

The app will be available at: [http://localhost](http://localhost)

```

---

