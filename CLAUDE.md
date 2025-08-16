# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager:** pnpm

### Essential Scripts
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm lint` - Run Biome for code linting/checking
- `pnpm format` - Format code with Biome (includes --write)
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint:post` - Run textlint on Japanese blog posts
- `pnpm run deploy` - Build and deploy to Cloudflare Workers
- `pnpm preview` - Build and preview with OpenNext Cloudflare adapter
- `pnpm build:analyze` - Build with bundle analyzer to examine bundle size
- `pnpm upload` - Build and upload to Cloudflare Workers (without deploy)
- `pnpm cf-typegen` - Generate Cloudflare environment types

### Code Quality
Always run `pnpm lint`, `pnpm format`, and `pnpm typecheck` after making code changes. The project uses Biome instead of ESLint/Prettier.

### Testing
When verifying functionality, start the Next.js server and use Playwright MCP to access the application.

## Architecture Overview

### Framework & Deployment
- **Next.js 15.3.3** with App Router architecture
- **Cloudflare Workers** deployment via OpenNext adapter
- **Static Generation** - all pages are statically generated at build time
- **MDX-based** blog posts with custom processing pipeline

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `_posts/` - MDX blog post files (named `YYYY-MM-DD-slug.mdx`)
- `src/components/` - React components for layout and post rendering
  - `PostCard` - Shared component for displaying post links with consistent card design
  - `RelatedPosts` - Shows related posts in a dedicated section
  - `Layout` - Main layout wrapper with header, navigation, and footer
- `src/lib/` - Utility functions (post processing, date formatting, syntax highlighting)
- `docs/adr/` - Architectural Decision Records

### Content Pipeline
Blog posts are MDX files processed with:
- **Shiki** for syntax highlighting (Night Owl theme)
- **rehype-slug** and **rehype-autolink-headings** for navigation
- **gray-matter** for frontmatter parsing
- Custom MDX components for enhanced typography

### Styling
- **Tailwind CSS** with custom typography configuration
- **Custom fonts** (NOTONOTO35HS) optimized for Japanese content
- **Mobile-first** responsive design
- **Focus-visible** for keyboard navigation accessibility
- **Card-based design** for post listings with hover effects

## Special Configurations

### Deployment (Cloudflare)
- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext adapter configuration
- Custom domain: `blog.thinceller.net`
- Static assets served via Cloudflare Assets binding

### Japanese Content Support
The blog has specialized support for Japanese technical writing:
- **textlint** with Japanese technical writing presets
- Custom typography optimized for Japanese text
- Specific lint rules for technical documentation

### Build Optimization
- Bundle analyzer integration (`pnpm build:analyze`)
- Turbopack for faster development builds
- FontAwesome package imports optimization via experimental.optimizePackageImports
- Bundle size budget monitoring (358KB budget with 20% increase threshold)

## Blog Post Structure

Posts require frontmatter with:
```yaml
title: "Post Title"
description: "Brief description"
date: "YYYY-MM-DD"
publishedTime: "YYYY-MM-DDTHH:mm:ssZ"
```

Optional: `modifiedTime`, `tags`

## Code Style

The project uses **Biome** for consistent code formatting and linting. Always run formatting commands before committing changes.

### Biome Configuration
- Line width: 80 characters
- Indent: 2 spaces
- JSX quotes: double quotes
- JavaScript quotes: single quotes
- Trailing commas: always
- Semicolons: always
- Performance rules: no img elements (use Next.js Image)

### Component Design Principles
- **Reusability**: Create shared components for repeated UI patterns (e.g., PostCard)
- **Accessibility**: Use semantic HTML and proper ARIA attributes
- **Consistency**: Maintain uniform styling across similar elements
- **Performance**: Avoid unnecessary re-renders and optimize for static generation
