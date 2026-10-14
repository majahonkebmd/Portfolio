# Majah Portfolio

Personal portfolio website for **Majahonke Dlamini**, a Computer Science and Information Engineering student at National Dong Hwa University. The site presents academic background, skills, selected projects, interests, and contact details.

## Featured projects

| Project | Focus |
| --- | --- |
| [Majah Front-End Portfolio](project-one.html) | This responsive portfolio website, built with HTML, CSS, and JavaScript. |
| [Piano IQ](project-two.html) | Award-winning undergraduate capstone: pedal-aware music transcription, MIDI performance analysis, and AI tutor feedback. |
| [AutoRecon+](project-three.html) | An in-progress cybersecurity research prototype that brings together reconnaissance, traffic monitoring, anomaly detection, and reporting. |

## Project structure

```text
.
├── index.html                 # Home and featured projects
├── about.html                 # Background, skills, and education
├── portfolio.html             # Project showcase
├── project-one.html           # Portfolio project details
├── project-two.html           # Piano IQ project details
├── project-three.html         # AutoRecon+ project details
├── hobbies.html               # Interests and image carousels
├── contact.html               # Contact links and email form
├── styles/
│   ├── tokens.css              # Colors, spacing, type, radii, and shadows
│   ├── global.css              # Reset, shared layout, and components
│   └── pages/
│       ├── about.css
│       ├── contact.css
│       ├── hobbies.css
│       ├── index.css
│       └── project.css         # Shared by all three project pages
├── scripts/
│   ├── main.js                 # Navigation and footer year
│   ├── carousel.js             # Hobbies image carousels
│   └── contact-form.js         # Mailto forms
├── images/
│   ├── archive/                # Unreferenced original images
│   ├── hobbies/
│   ├── icons/
│   ├── profile/
│   └── projects/
├── .gitattributes
├── .editorconfig
├── favicon.svg
└── .nojekyll
```

## Preview locally

Open `index.html` directly, or use VS Code Live Server. A local Python server also works without installing dependencies:

```powershell
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Conventions

- The site uses plain HTML, CSS, and JavaScript. There is no build step, framework, package manager, or Jekyll/Liquid dependency.
- Load `styles/tokens.css` before `styles/global.css`; page styles follow the shared styles. Use design tokens for colors, spacing, typography, borders, radii, and motion.
- Responsive layouts use the shared 900px and 560px breakpoints. Motion follows the user's reduced-motion preference.
- Keep one descriptive `h1` per page, semantic landmarks, meaningful image alt text, intrinsic image dimensions, and visible keyboard focus styles.
- Header and footer markup stay the same across pages, with `aria-current="page"` on the active navigation link.
- Scripts use `defer` and load only where needed. The contact forms open a prefilled message in the visitor's email application.
- Keep local asset paths lowercase and kebab-case, and update references whenever an asset is renamed.

## GitHub Pages

Publish the repository root with GitHub Pages. The `.nojekyll` file keeps the site as a collection of static files.

## Contact

- GitHub: [@majahonkebmd](https://github.com/majahonkebmd)
- LinkedIn: [Dlamini Majahonke Banele](https://www.linkedin.com/in/dlamini-majahonkebanele-180a1a245/)
