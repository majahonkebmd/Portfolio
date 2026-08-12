# Portfolio Website

This repository contains a clean, multi-page portfolio website built for GitHub Pages deployment.

## Files and structure

- `index.html` — homepage with introduction, project highlights, and contact section
- `about.html` — about page with background and skills
- `portfolio.html` — project showcase with links to detail pages
- `contact.html` — contact page with email and social links
- `project-one.html`, `project-two.html`, `project-three.html` — dedicated project detail pages
- `styles/global.css` — shared styling for the site
- `scripts/main.js` — mobile navigation toggle and footer year update
- `images/profile-photo.svg` — placeholder profile illustration
- `_includes/` and `data/` — reserved folders for future enhancements

## Preview locally

1. Open `index.html` in your browser.
2. Or serve the site locally using Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize

- Replace the placeholder text and links with your own name, projects, and contact details.
- Add your real profile image to `images/` and update `index.html` if needed.
- Update project descriptions inside `portfolio.html` and the project detail pages.

## Deployment

Push this repository to GitHub and enable GitHub Pages from the repository settings. Use the repository root as the publishing source.
