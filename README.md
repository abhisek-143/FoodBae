<div align="center">
  <img src="frontend/public/background_image_01.jpg" alt="Pizza and fresh ingredients on a dark table" width="100%" height="260" />
  <br />
  <br />
  <img src="https://img.shields.io/badge/FOODBAE-FRESH%20FOOD%2C%20MADE%20EASY-ff5a36?style=for-the-badge&labelColor=171717" alt="FoodBae — fresh food, made easy" width="300" height="44" />
  <h1>GOOD FOOD. ZERO FUSS.</h1>
  <p>A food ordering app with a React storefront and Django-powered kitchen.</p>
  <p>
    <img src="https://img.shields.io/badge/REACT-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/DJANGO-REST-092E20?style=flat-square&logo=django&logoColor=white" alt="Django REST" />
    <img src="https://img.shields.io/badge/VITE-7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 7" />
    <img src="https://img.shields.io/badge/TAILWIND-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/SQLITE-DATABASE-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>
</div>

---

## 🍽️ ABOUT FOODBAE

FoodBae brings a restaurant menu and an online ordering flow together in one place. Customers can browse dishes, save favourites, build a cart, and keep an eye on their orders. Restaurant staff get a separate set of tools to update the menu and manage orders from the kitchen to delivery.

## ✨ WHAT'S ON THE MENU

| For customers | For restaurant staff |
| --- | --- |
| Create an account and sign in | Add, edit, and remove food categories |
| Browse, search, and filter food items | Add, edit, and remove menu items |
| View item details and choose quantities | View order lists and search by order number |
| Keep a wishlist and shopping cart | Update order status and add tracking remarks |
| Place orders and track their status | Check dashboard totals and sales summaries |

### 🛍️ THE ORDERING FLOW

```text
Browse the menu  →  Pick your favourites  →  Add to cart
        →  Enter delivery details  →  Place your order  →  Follow its progress
```

> **Checkout note:** Orders can be placed with cash on delivery or with the card-entry form. The form is not connected to a payment provider. Do not enter real payment-card details.

## 🎨 A LOOK INSIDE

The storefront uses a dark palette with bright food photography, responsive layouts, and animated page transitions. Menu photos and page artwork are in [`frontend/public/`](frontend/public/).

## 🧰 BUILT WITH

| Part | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router |
| Styling and motion | Tailwind CSS, GSAP |
| Backend and API | Django, Django REST Framework |
| Database | SQLite |
| Image uploads | Django media storage |

## 📁 PROJECT MAP

```text
Food_Delivery/
├── backend/
│   ├── backend/                 # Django settings and root URLs
│   ├── food_ordering/           # Models, serializers, API views, and migrations
│   │   ├── templates/           # Printable order invoice
│   │   └── static/              # Invoice styles
│   ├── media/                   # Food and profile uploads
│   └── manage.py
├── frontend/
│   ├── public/                  # Food photos and page artwork
│   └── src/
│       ├── components/          # Shared layouts and UI components
│       └── pages/               # Customer and staff screens
└── README.md
```

## 🚀 GETTING STARTED

### WHAT YOU'LL NEED

- Python 3.12 or newer
- Node.js 20.19+ or 22.12+
- npm

The backend does not currently include a Python dependency lock file. The commands below install the packages used by the Django app.

### 1. START THE BACKEND

From the repository root, create a virtual environment and install the backend dependencies:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install Django djangorestframework django-cors-headers Pillow
```

Prepare the database and create a staff account:

```powershell
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/`, with app endpoints under `/api/`.

### 2. START THE FRONTEND

Open a second terminal from the repository root:

```powershell
cd frontend
npm install
Set-Content .env.local "VITE_BASE_URL=http://127.0.0.1:8000" -Encoding ascii
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`. `VITE_BASE_URL` tells the frontend where to find the API and uploaded images.

### 3. TRY IT OUT

1. Visit `/login` and sign in with the staff account you created.
2. Add categories and a few dishes so the menu has something to show.
3. Register a customer at `/user-register`, then sign in at `/user-login`.
4. Browse the menu, add a dish to your cart, and try placing an order.

## 🧪 HANDY COMMANDS

| Run from | Command | Purpose |
| --- | --- | --- |
| `backend` | `python manage.py runserver` | Start the Django development server |
| `backend` | `python manage.py migrate` | Apply database migrations |
| `backend` | `python manage.py test` | Run Django tests |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Build the frontend |
| `frontend` | `npm run preview` | Preview the production build |
| `frontend` | `npm run lint` | Run ESLint |

## 👋 THE PERSON BEHIND IT

**Abhisek Jena** · [GitHub](https://github.com/abhisek-143)

## ⚠️ BEFORE DEPLOYING

This project is configured for local development. Before deploying, configure Django's secret key, `DEBUG`, allowed hosts, and CORS for your environment. Review authentication and authorization as well. The current checkout is a demo flow, not a secure payment integration.

<div align="center">
  <sub>Thanks for stopping by. Hope you find something tasty.</sub>
</div>
