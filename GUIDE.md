# Tradicon Application Guide

This guide provides an overview of the project structure, deployment instructions, and design system references.

## Project Map

The project is built with Vite and vanilla TypeScript, structured as follows:

-   `public/`: Contains static assets that are copied directly to the build output. (Note: `sw.js` and `manifest.json` are now generated automatically during the build process).
-   `index.html`: The main HTML entry point for the application.
-   `index.tsx`: The main TypeScript module that initializes the app, binds event listeners, and manages the overall flow.
-   `index.css`: The global stylesheet for the application.
-   `*.ts`: Various TypeScript modules, each with a specific responsibility:
    -   `ui.ts`: Handles all UI rendering and dynamic DOM manipulation.
    -   `state.ts`: Manages the application's global state.
    -   `gemini.ts`: Contains all logic for interacting with the Google Gemini API.
    -   `storage.ts`: A utility module for reading from and writing to `localStorage`.
    -   `dom.ts`: Centralizes DOM element selections.
    -   `constants.ts`: Stores shared constants, translations, and static data.
    -   `types.ts`: Defines TypeScript types and interfaces used throughout the app.
    -   `practice/`: Contains the question data for the practice module.
-   `package.json`: Defines project dependencies and build scripts.
-   `vite.config.ts`: Configuration file for the Vite build tool. This file now includes the PWA configuration, which generates the service worker and manifest.
-   `vercel.json`: Configuration for deploying to the Vercel platform.

## Deployment to Vercel

This project is pre-configured for seamless deployment to [Vercel](https://vercel.com/).

1.  **Push to a Git Repository:** Ensure your project code is pushed to a GitHub, GitLab, or Bitbucket repository.
2.  **Create a New Vercel Project:**
    -   Log in to your Vercel account.
    -   Click on "Add New..." -> "Project".
    -   Import the Git repository you just created.
3.  **Deploy:** Vercel will automatically detect that this is a Vite project from the `package.json` and `vercel.json` files. It will use the correct settings to build and deploy your application. No further configuration is needed.

The `vercel.json` file simply contains:
```json
{
  "framework": "vite"
}
```

This tells Vercel to use its optimized Vite preset for the build process.

## Style Reference

The application's visual style is defined by CSS variables in `index.css`.

### Color Palette

| Name       | CSS Variable              | Hex Code  | Description                                |
| :--------- | :------------------------ | :-------- | :----------------------------------------- |
| Background | `--background-color`      | `#F7F7FF` | The main background color for the app.     |
| Surface    | `--surface-color`         | `#FFFFFF` | Used for cards, modals, and input fields.  |
| Primary    | `--primary-color`         | `#1d0ee2` | The main brand color, used for buttons and active states. |
| Accent     | `--accent-color`          | `#ffd902` | A secondary color for highlights like stars. |
| Text       | `--text-color`            | `#212529` | The primary color for body text.           |
| Text Light | `--text-color-light`      | `#FFFFFF` | Text color used on dark/primary backgrounds. |
| Border     | `--border-color`          | `#6A63D6` | Used for borders on cards and inputs.      |
| Correct    | `--correct-color`         | `#0eb93f` | Indicates a correct answer in practice mode. |
| Error      | `--error-color`           | `#FF5656` | Indicates an error or incorrect answer.    |

## Icon Reference

Icons are currently implemented as inline SVG within the HTML and component rendering logic (e.g., in `constants.ts`). They are not yet separated into individual reusable components.