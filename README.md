# sumo-insight-frontend
Turning raw API data into actionable intelligence. Visualizing intelligence — clean UI to explore and interact with API-driven insights.



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
