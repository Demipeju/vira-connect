# 🛍️ **VIRA — Social Commerce Platform**

**Where Commerce Meets Community**

VIRA is a modern social-commerce platform designed for freelancers, creators, and small businesses. It allows sellers to create storefronts, manage orders, and connect with buyers while offering a clean, beautiful, and intuitive shopping experience.

Built with a minimalist and elegant UI inspired by modern SaaS platforms, VIRA focuses on speed, clarity, and user-friendliness.

**URL Lovable**: https://lovable.dev/projects/6c386644-43fb-4bd5-9810-2097b4aaf0a2
---

## 📸 **Preview**

![VIRA Screenshot](https://github.com/Demipeju/vira-connect/refs/heads/main/public/vira.png)

```md
![VIRA Screenshot](https://raw.githubusercontent.com/<your-username>/<repo-name>/main/path-to-image.png)
```

---

* Project Introduction
* Features
* How It Works
* Tech Stack
* Folder Structure
* Installation & Setup
* Screenshots / Images
* Contribution
* License (optional)

## 🚀 **Key Features**

**🔐 Authentication & Access Control**

* Full Sign Up / Sign In flow
* Username stored + shown in profile (“Hi, <username>”)
* Auth state saved in localStorage
* Protects restricted pages (Dashboard, Orders, Marketplace, etc.)
* Non-logged-in users automatically redirected to Sign In

---

### **🛒 Marketplace**

* Realistic marketplace with multiple stores:

  * Nike
  * Phone Shop
  * Bookstore
  * Perfume Shop
  * Wigs & Beauty Store
  * Artisan Pottery Studio
* Each store has:

  * Banner, description, seller name
  * Product listings
  * “Place Order” button
  * LocalStorage-based order saving
* Search + Sort fully functional
* Add stores to favourites (saved in localStorage)

---

### **📦 Orders System**

* Every completed purchase reflects in the Orders page
* Orders persist using localStorage
* Includes product name, store, price, and date
* Clean customer order management view

---

### **📊 Seller Dashboard**

* Monthly revenue analytics chart
* Total revenue capped at `$12,458`
* July is the highest earning month
* Displays:

  * Revenue graph
  * Store statistics
  * Recent store orders

---

### **👤 User Profile**

* Dynamic greeting: “Hi, <username>”
* Placeholder editable fields (prepared for backend integration)
* Shows favourites, orders, and profile details

---

### **💙 Beautiful Landing Page**

* Static light-blue & blue-green gradient
* Modern CTA and minimal design
* “Explore Marketplace” redirects based on login state

---

## 🧱 **Tech Stack**

### **Frontend**

* React + TypeScript
* Vite
* TailwindCSS
* React Router
* Recharts (dashboard analytics)
* LocalStorage (temporary user/session storage)

### **Tools / Build**

* Vite bundler
* ES Modules
* GitHub for version control

---

## 📁 **Project Structure**

```plaintext
src/
│
├── components/       # Reusable UI components
├── pages/            # App pages (Marketplace, Dashboard, Auth, etc.)
├── hooks/            # Custom hooks
├── lib/              # Utils & helpers
├── App.tsx           # App routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

---

## ⚙️ **Installation & Setup**

Clone the repo:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🤝 **Contributing**

Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 **License**

(Optional — choose MIT, Apache, GPL, etc.)

```md
This project is licensed under the MIT License.
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6c386644-43fb-4bd5-9810-2097b4aaf0a2) and click on Share -> Publish.
Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
