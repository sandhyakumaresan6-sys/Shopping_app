# Shopora 🛍️

A polished, responsive online shopping storefront built with **HTML, CSS, and vanilla JavaScript**. Designed as a portfolio-ready beginner project that is easy to run, customize, and publish on GitHub Pages.

## ✨ Features

- Responsive layout for desktop, tablet, and mobile
- Modern storefront hero, category cards, deal banner, and newsletter section
- Product grid with categories, prices, ratings, and sale labels
- Live product search and category filtering
- Wishlist toggle
- Interactive shopping cart drawer with quantity controls, remove action, and subtotal
- Toast notifications and subtle animations
- Keyboard Escape support for closing the cart
- Reduced-motion accessibility support
- No build tools or dependencies required

## 🧰 Built with

- HTML5
- CSS3 (Grid, Flexbox, animations, responsive media queries)
- Vanilla JavaScript
- Google Fonts (DM Sans and Manrope)

## 🚀 Run locally

1. Download and unzip the project.
2. Open the `Shopora` folder.
3. Double-click `index.html` to open it in your browser.

Recommended: use the **Live Server** extension in Visual Studio Code for a local development server.

## 📁 Folder structure

```text
Shopora/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore
```

## 🌐 Publish on GitHub

### Option A — GitHub website

1. Sign in to GitHub and create a new **public** repository named `shopora-store`.
2. Open the repository and choose **Add file → Upload files**.
3. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and `.gitignore` (upload the files inside the folder, not just the ZIP).
4. Commit the files.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main`, folder `/ (root)`, and click **Save**.
8. Wait a minute or two. Your site URL will be shown in the Pages section.

### Option B — Git commands

Install Git, open a terminal inside the extracted `Shopora` folder, and run:

```bash
git init
git add .
git commit -m "Initial commit: Shopora shopping app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/shopora-store.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If the repository already has a remote, check it with `git remote -v` before adding another.

Then enable GitHub Pages using the steps above.

## 🛒 Demo notes

This is a front-end demo. Products and prices are sample data. Cart state is held in memory and resets on refresh. The checkout button intentionally does not collect payment or personal data. Newsletter signup is a UI demonstration and does not send emails.

## 💡 Ideas to extend

- Save cart and wishlist using `localStorage`
- Add product detail pages
- Connect a backend/API and database
- Add authentication and order history
- Integrate a trusted payment provider in test mode
- Add real product images and inventory management

## License

MIT — see `LICENSE`.
