# Ghost Architecture Explorer

An educational React + Vite companion prototype for studying the architecture of [Ghost](https://ghost.org/), an open-source publishing platform. The project combines a simplified architecture explainer with a working, local-only editorial dashboard.

> **Scope:** This is not Ghost itself and does not connect to a Ghost server or database. Article changes exist only in browser memory and reset on reload. This project is not affiliated with Ghost.

## Project overview

The application has four navigation views: **Overview**, **Published**, **Drafts**, and **Architecture Explorer**. The editorial dashboard supports creating drafts, publishing drafts, deleting articles, searching by title or category, filtering by status, and viewing article counts. The Architecture Explorer explains Ghost's modular-monolith architecture, communication boundaries, persistence layer, and architectural trade-offs with a simplified logical diagram.

## Architecture of the system analyzed: Ghost

**Primary style:** Ghost's core publishing backend can be understood as a **modular monolith with layered web architecture**. Publishing capabilities share a Node.js backend and deployment boundary, while the admin UI and public website expose different user-facing interfaces. Separate APIs do not automatically imply independently deployed microservices.

| Component | Responsibility |
| --- | --- |
| Ghost Admin | Interface for authors and editors to manage content |
| Ghost Core (Node.js) | Server-side application logic, APIs, and site rendering |
| Admin API and Content API | Interfaces for managing and retrieving content, respectively |
| MySQL | Persistent publication data in a typical production installation |
| Themes / public site | Presentation of published content to readers |
| Supporting packages and storage integrations | Shared functionality and media handling, depending on deployment |

**Communication boundaries:** Ghost Admin sends management requests through the Admin API to Ghost Core. Readers request public pages that Ghost Core can render using themes. External clients can retrieve published content through the Content API. Ghost Core reads and writes publication records in MySQL. These are **logical relationships**, not a claim that all requests follow the same linear path.

**Benefits and trade-offs:** A modular core application can simplify development, deployment, and coordination compared with independently deployed services. The trade-off is that core modules share a deployment boundary, which can make independent scaling and releases harder. Production setups may also include reverse proxies, caching, and storage integrations; these are deployment-dependent, not mandatory boxes in this logical diagram.

**Sources for verification:**
- [Ghost official documentation](https://ghost.org/docs/)
- [Ghost GitHub repository](https://github.com/TryGhost/Ghost)
- [Ghost Admin API documentation](https://ghost.org/docs/admin-api/)
- [Ghost Content API documentation](https://ghost.org/docs/content-api/)

## Architecture of this companion prototype

- **React** renders the dashboard and architecture page.
- **Vite** provides the development server and frontend build tooling.
- **React `useState`** holds the article list, editor inputs, current view, search, filter, and status messages.
- **React `useMemo`** computes the visible articles based on navigation, search, and filtering.
- **No backend, authentication, or persistent database** is implemented.

The prototype begins with four sample articles. The `createPost` function checks that title and content are not blank, creates a draft, and updates state. `publishPost` changes a draft's status; `deletePost` removes an article. Counts are derived from the current article array.

## Setup and run locally

**Prerequisites:** Node.js and npm (use a recent Node.js version supported by the installed Vite version).

```bash
# Clone your published repository (replace with your actual URL)
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ghost-architecture-explorer

# Install dependencies
npm install

# Run development server
npm run dev
```

Open the local URL printed by Vite (often `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

No environment variables are required for the current frontend-only implementation.

## Functional features and limitations

| Feature | Implementation |
| --- | --- |
| Create draft | Validates nonblank title and content; saves a draft to React state |
| Publish draft | Changes the selected article status to Published |
| Delete article | Removes the selected article from React state |
| Search | Matches article title or category, case-insensitively |
| Filter | All, Published, or Draft |
| Navigation | Switches Overview, Published, Drafts, and Architecture Explorer views |
| Architecture diagram | Static educational overview; not an interactive live system map |

**Known limitations:** Article edits are not saved across refreshes; there is no Ghost API integration, user authentication, database, or backend. The architecture diagram is a simplified visual representation, not an executable deployment diagram. It shows Ghost Admin and the public website as separate entry points to Ghost Core, with MySQL as persistence. The article editor stores a short excerpt from the entered content rather than a persistent full article body.

## AI use, verification, and customization

**AI tool used:** OpenAI ChatGPT. I used it to discuss Ghost architecture, assist with React/Vite scaffolding, revise the architecture visualization, and draft documentation. I reviewed the generated material and retained responsibility for verifying its accuracy and testing the result.

### Prompt appendix (verbatim prompts available from this conversation)

**Prompt — architecture visualization improvement:**

> I want to edit app.jsx as well for improving the architecture analysis

**AI output and resulting customization:** ChatGPT proposed a revised `App.jsx` and supplementary CSS for the Architecture Explorer. The updated visualization distinguishes Ghost Admin and the public website, places Ghost Core at the center, shows MySQL as persistence, and adds benefits, trade-offs, and prototype limitations. I integrated the architecture update into my project. **Before submitting, confirm this accurately describes the edits you actually made.**

**Prompt — README completion:**

> ok lets finish the readme file

**AI output:** ChatGPT helped revise this README to describe the updated architecture and assignment requirements.

### Additional original prompts required

The rubric requests **full prompts**, including the original architectural breakdown and initial prototype scaffolding. Those earlier exact messages have not been recovered here. Copy them verbatim from your ChatGPT history rather than inventing or paraphrasing them.

**Initial architecture-analysis prompt:**

> [PASTE ORIGINAL MESSAGE VERBATIM]

**Initial AI response summary:** [SUMMARIZE WHAT THE AI INITIALLY SAID]

**Initial prototype-scaffolding prompt:**

> [PASTE ORIGINAL MESSAGE VERBATIM]

**Initial AI response summary:** [SUMMARIZE THE FIRST GENERATED APP AND FILES]

**Other material prompts or iterations, if any:** [PASTE ORIGINAL MESSAGES VERBATIM]

### Verification audit and design decisions

| Item checked | Evidence and interpretation | Outcome |
| --- | --- | --- |
| Architecture style | Compare Ghost source structure and official documentation with the AI explanation | Ghost Core is modeled as a modular monolith, not a collection of independently deployed services merely because it exposes multiple APIs |
| Admin and public boundaries | Review Admin API, Content API, and theme documentation | Diagram separates editor requests, public page requests, and external Content API access |
| Data persistence | Review Ghost database documentation and source | MySQL is represented as a production persistence layer; the prototype has no database |
| Diagram revision | Compare the earlier four-box vertical diagram to the revised architecture page | Replaced misleading linear flow with separate Admin/public entry points and Ghost Core ↔ database relationship |
| Prototype scope | Inspect `src/App.jsx` | Article operations update React state locally; no Ghost API calls or persistent storage |

**Important:** The earlier linear diagram was a *simplification we revised*. Do not describe it as an AI hallucination unless your original AI output actually made that false claim. Record any other specific AI inaccuracies only if you can quote the original output and explain the correction.

**Personal customizations:** [ADD ANY ADDITIONAL DESIGN, STYLING, OR BEHAVIOR CHANGES YOU PERSONALLY MADE]

## Quality assurance checklist

The checks below are **test cases**, not claims that all checks passed. The lint result is reported separately and does not replace functional or browser QA. Record actual results and evidence before submitting.

| Category | Test | Expected result | Actual result |
| --- | --- | --- | --- |
| Functional | Create valid article | Draft appears; draft count increases | [PASS/FAIL + notes] |
| Functional | Submit blank title | Helpful error; no draft created | [PASS/FAIL + notes] |
| Functional | Submit blank content | Helpful error; no draft created | [PASS/FAIL + notes] |
| Functional | Publish draft | Status and counts update | [PASS/FAIL + notes] |
| Functional | Delete article | Article disappears; counts update | [PASS/FAIL + notes] |
| Functional | Search unmatched text | Empty state appears; clear filters works | [PASS/FAIL + notes] |
| Functional | Enter long title | Title input limited to 160 characters | [PASS/FAIL + notes] |
| Responsive | Desktop 1920×1080 | No clipped/overlapping content | [PASS/FAIL + notes] |
| Responsive | Tablet 768×1024 | Layout remains usable | [PASS/FAIL + notes] |
| Responsive | Mobile 390×844 | Layout remains usable | [PASS/FAIL + notes] |
| Browser | Chromium | Key flows work; no uncaught errors or broken assets | [PASS/FAIL + notes] |
| Browser | Safari or Firefox | Key flows work; no uncaught errors or broken assets | [PASS/FAIL + notes] |
| Accessibility | Keyboard Tab navigation | Interactive controls reachable in logical order | [PASS/FAIL + notes] |
| Accessibility | Form labels and feedback | Inputs have labels; status messages announced appropriately | [PASS/FAIL + notes] |
| Performance | Initial page load | Loads promptly without blocking operations | [PASS/FAIL + notes] |

**Code quality:** `npm run lint` — **PASS**, as reported after the architecture update. `npm run build` — **NOT YET CONFIRMED**.

**Testing environment:** [Operating system, browser versions, date]

**Issues found and fixed:** [Describe actual issues and fixes, or state none found during the tests performed.]

## Deployment and video

- **Live website:** [ADD DEPLOYED URL]
- **GitHub repository:** [ADD REPOSITORY URL]
- **5–7 minute video demonstration:** [ADD VIDEO URL]

Video outline: 0:00–2:00 Ghost architecture and AI verification; 2:00–4:00 working prototype; 4:00–6:00 QA checklist with DevTools; 6:00–7:00 lessons learned. Show both webcam and screen as required by the assignment.

## Retrospective

This project illustrates the difference between a production publishing platform and a frontend-only proof of concept. The local React implementation makes interface behavior easy to explore and test, but lacks persistence, authentication, and a real Ghost integration. AI assistance can accelerate scaffolding and explanations, but architecture claims and code behavior still need to be verified against source code, documentation, and live testing.
