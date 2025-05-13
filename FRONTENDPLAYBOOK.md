
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
