# 💸 Expense Tracker (Frontend-Only)

A fully frontend-based **Expense Tracker** built with React — simulating authentication, offline-first support, auto session expiry, and **user-scoped data persistence** — all **without a backend**.

---

## 🚀 Features

- 🔐 Simulated **Login/Logout** system (each user gets their own expense data)
- ⌛ **Auto Session Expiry** after inactivity
- 📊 **User-specific Dashboard Data** saved locally
- 📴 Works **offline** and syncs when online
- 🎉 **Welcome Pop-up** on login
- 💾 Uses **localStorage/sessionStorage** to mimic real backend behavior

---

## 🛠️ Tech Stack

- React (Vite)
- JavaScript
- HTML + CSS
- LocalStorage + SessionStorage

---

## 📁 Folder Structure

```yaml
src/
  assets/           # Icons and media
  components/      # Dashboard, Home,Login ,Signup,SyncLoader
  components/expenses
  # expensesForm,item etc.
  hooks/            # for syncing purpose
  pages/            #  Expense Dashboard
  redux/            # slices or helper function for global state management
  sections/     # Hero,Navbar
  App.jsx
  main.jsx

  ```

# Getting Started
  ```yaml

  # 1. Clone the repository
git clone https://github.com/your-username/client-web-type.git

# 2. Navigate into the project directory
cd client-web-type

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# App will run on http://localhost:5173

```

# 🌟 Why This Project?
``` yaml
This project can teach you the complex concept of frontend which never taught in tutorials normally 
```

# How to simulate auth flows without a backend

1.Managing local/session storage cleanly

2.Building offline-friendly apps

3.Creating multi-user experiences in frontend-only setups

# 🤝 Contributions
PRs are welcome! Found a bug? Got an idea? Fork and go brrrr 🛠️
Don't forget to star the repo if you like it! ⭐

# 📄 License
MIT License

# 👨‍💻 Author
Made with ⚡ by Sarvesh Baranwal


