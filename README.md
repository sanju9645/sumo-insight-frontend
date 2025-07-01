# sumo-insight-frontend
Turning raw API data into actionable intelligence. Visualizing intelligence — clean UI to explore and interact with API-driven insights.

## 🔐 Authentication

This project uses **Auth0** for user authentication


### 🔑 Setting Up Auth0

To enable secure login functionality using Auth0, follow these steps:

1. **Create an Auth0 Account**

   * Go to [https://auth0.com](https://auth0.com) and sign up or log in.

2. **Create an Auth0 Application**

   * Navigate to the **Applications → Applications** section in the Auth0 dashboard.
   * Click **Create Application**.
   * Choose a name (e.g., `sumo-insight-client`) and select the **Single Page Web Applications** type.
   * Click **Create**.

3. **Configure Allowed URLs**

   * Under the application settings:

     * **Allowed Callback URLs**:
       `http://localhost:5173`
     * **Allowed Logout URLs**:
       `http://localhost:5173`
     * **Allowed Web Origins**:
       `http://localhost:5173`

4. **Create an API in Auth0**

   * Navigate to **Applications → APIs**.
   * Click **Create API**.
   * Choose a name like `sumo-insight-api`.
   * Set an identifier, e.g., `sumo-insight`.
   * Leave signing algorithm as **RS256** and click **Create**.

### ⚙️ Required Environment Variables

In your `.env` file (placed in the root of your Docker setup), set the following:

#### For Frontend (Vite)

```env
VITE_API_BASE_URL=http://localhost:3000

VITE_AUTH0_DOMAIN=<your-auth0-domain>
VITE_AUTH0_CLIENT_ID=<your-auth0-client-id>
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_AUTH0_AUDIENCE=sumo-insight
```

* **VITE\_AUTH0\_DOMAIN**: Found in your Auth0 tenant settings (e.g., `dev-xxxxx.us.auth0.com`).
* **VITE\_AUTH0\_CLIENT\_ID**: Found in the Application Settings.
* **VITE\_AUTH0\_CALLBACK\_URL**: Must match the value configured in Auth0 → Application.
* **VITE\_AUTH0\_AUDIENCE**: Should be the API identifier (e.g., `sumo-insight`).




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


## 🖥️ Run Image Anywhere

```bash
docker pull your-dockerhub-username/sumo-insight-frontend:latest

docker run -it --rm -p 5173:5173 --env-file .env sanju9645/sumo-insight-frontend:latest
```
