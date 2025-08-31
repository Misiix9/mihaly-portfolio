# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (EN/HU) React portfolio website for a web/desktop developer showcasing modern animations, 3D elements, and performance optimizations. Built with React + Vite, featuring GSAP animations, Three.js 3D scenes, and internationalization.

## Development Commands

**Essential Commands:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

**Environment Setup:**
- Copy `env.template` to `.env` and configure:
  - EmailJS credentials for contact form
  - hCaptcha site key
  - Google Analytics 4 measurement ID

## Architecture Overview

### Core Structure
- **React Router SPA** - Single page application with client-side routing
- **Component-based Architecture** - Modular UI components in `/src/components/`
- **Utility Libraries** - Custom hooks and utilities in `/src/lib/`
- **Internationalization** - i18next with EN/HU language support

### Key Dependencies
- **GSAP** - Animation library for micro-interactions and scroll effects
- **Three.js + React Three Fiber** - 3D scenes and effects
- **Lenis** - Smooth scrolling implementation
- **i18next** - Internationalization framework
- **Tailwind CSS** - Utility-first CSS framework
- **EmailJS** - Client-side email sending for contact form

### Animation System
- **GSAP Timeline** - Complex animation sequences
- **Scroll Triggers** - Scroll-based animations
- **Language Switch Animations** - Custom text transition system in `/src/lib/i18n/textAnimations.js`
- **Reduced Motion Support** - Respects user preferences

### Project Structure
```
src/
├── components/           # UI components
│   ├── sections/        # Page sections (Hero, About, etc.)
│   ├── ui/              # Reusable UI components
│   └── seo/             # SEO components
├── lib/                 # Utility libraries
│   ├── animations/      # GSAP configurations
│   ├── i18n/           # Internationalization
│   ├── seo/            # SEO utilities
│   └── performance/    # Performance optimizations
├── locales/            # Translation files
└── assets/             # Static assets
```

### Performance Features
- **Code Splitting** - Manual chunks for Three.js, GSAP, Lottie
- **PWA Support** - Service worker with caching strategies
- **Image Optimization** - Lazy loading and format optimization
- **Critical CSS** - Inline critical styles
- **Web Vitals Monitoring** - Performance tracking

### Contact System
- **Multi-step wizard** - Progressive contact form
- **EmailJS integration** - Client-side email sending
- **hCaptcha protection** - Spam protection
- **Toast notifications** - User feedback system

## Development Notes

### Testing
- No specific test framework configured - verify functionality through browser testing
- Always test language switching animations
- Verify contact form submission flow
- Check mobile responsiveness and touch interactions

### Animation Guidelines
- Use existing GSAP timeline configurations in `/src/lib/animations/gsap.js`
- Respect `prefers-reduced-motion` settings
- Stagger animations for visual hierarchy
- Keep animation durations under 0.6s for responsiveness

### Internationalization
- Add new translations to `/src/locales/en.json` and `/src/locales/hu.json`
- Use the `useTranslation` hook for dynamic content
- Test language switching with animation system

### SEO Considerations
- Dynamic meta tags handled by SEO components
- JSON-LD structured data for portfolio items
- Open Graph and Twitter card support
- Semantic HTML structure maintained

### Performance Monitoring
- Google Analytics 4 integration for page views and vitals
- Core Web Vitals reporting
- Service worker caching for static assets
- # MCP Server Usage Instructions for Claude Code

You have access to the following MCP servers that should be utilized whenever relevant to enhance your capabilities:

## Available MCP Servers & Usage Guidelines

### 🧠 Sequential Thinking (`sequential-thinking`)
- **Use for:** Complex problem-solving, multi-step reasoning, debugging, planning
- **When to use:** Before tackling complex tasks, breaking down problems, analyzing requirements
- **Example scenarios:** Code architecture decisions, debugging complex issues, project planning

### 📁 Filesystem (`filesystem`) 
- **Directories available:** Documents, Desktop, Downloads
- **Use for:** Reading/writing files, exploring project structure, managing code files
- **When to use:** ANY file operations - reading config files, analyzing codebases, creating new files
- **Always check:** File permissions and paths before operations

### 🌐 Puppeteer (`puppeteer`)
- **Use for:** Chrome browser automation, web scraping, UI testing
- **When to use:** Automating web interactions, testing web apps, capturing screenshots
- **Capabilities:** Click buttons, fill forms, navigate pages, extract data
- **Note:** Chrome-only automation

### 🔗 Fetch (`fetch`)
- **Use for:** HTTP requests, API calls, downloading web content
- **When to use:** Calling REST APIs, downloading files, checking web endpoints
- **Methods:** GET, POST, PUT, DELETE requests
- **Always handle:** Error responses and timeouts

### 🔍 Browser Tools (`browser-tools`)
- **Use for:** Chrome DevTools integration, performance analysis, network monitoring
- **When to use:** Debugging web apps, analyzing performance, monitoring network traffic
- **Capabilities:** Console logs, network requests, performance metrics, accessibility audits
- **Requires:** Chrome extension and middleware server running

### 🕷️ Firecrawl (`firecrawl`)
- **Use for:** Advanced web scraping, content extraction from complex websites
- **When to use:** Scraping JavaScript-heavy sites, extracting structured data, bulk content extraction
- **Advantages:** Better than basic scraping for modern websites
- **API-based:** Requires API key (already configured)

### 📚 GitHub (`github`)
- **Use for:** Repository operations, code analysis, issue management
- **When to use:** Analyzing repositories, searching code, managing GitHub resources
- **Capabilities:** Repository browsing, code search, issue tracking

## MCP Server Selection Strategy

### For Web-Related Tasks:
1. **Simple HTTP requests** → Use `fetch`
2. **Basic web scraping** → Use `puppeteer`
3. **Complex/modern site scraping** → Use `firecrawl`
4. **Web debugging/analysis** → Use `browser-tools`

### For File Operations:
- **Always use `filesystem`** for any file read/write operations
- **Check file existence** before operations
- **Use proper Windows paths** (C:\Users\onxy\...)

### For Code Projects:
1. **Repository analysis** → Use `github` for GitHub repos
2. **Local file analysis** → Use `filesystem`
3. **Complex problem solving** → Start with `sequential-thinking`

### For Development Tasks:
1. **Planning phase** → Use `sequential-thinking`
2. **Implementation** → Use `filesystem` for file operations
3. **Testing** → Use `puppeteer` or `browser-tools`
4. **API integration** → Use `fetch`

## Mandatory Usage Rules

### ALWAYS Use MCP Servers When:
- Reading or writing ANY files → `filesystem`
- Making HTTP requests → `fetch`
- Automating browser tasks → `puppeteer`
- Scraping websites → `firecrawl` or `puppeteer`
- Solving complex problems → `sequential-thinking`
- Analyzing GitHub repositories → `github`
- Debugging web applications → `browser-tools`

### Before Starting Any Task:
1. **Identify which MCP servers are relevant**
2. **Use `sequential-thinking` for complex planning**
3. **Check `filesystem` for existing project files**
4. **Leverage appropriate servers throughout the process**

### Error Handling:
- If an MCP server fails, try alternative approaches
- Always provide fallback solutions
- Log errors clearly and suggest troubleshooting steps

## Integration Examples

### Web Development Project:
1. `sequential-thinking` → Plan architecture
2. `filesystem` → Read existing code, create new files
3. `fetch` → Test API endpoints
4. `puppeteer` → Automate testing
5. `browser-tools` → Debug performance issues

### Data Analysis Task:
1. `sequential-thinking` → Break down analysis steps
2. `filesystem` → Read data files
3. `firecrawl` → Gather web data if needed
4. `fetch` → Call external APIs for additional data

### Repository Analysis:
1. `github` → Explore repository structure
2. `filesystem` → Read local files if available
3. `sequential-thinking` → Analyze code patterns
4. `fetch` → Check external dependencies

## Remember:
- **MCP servers are your primary tools** - use them extensively
- **Always prefer MCP server capabilities** over describing what you would do
- **Combine multiple servers** for comprehensive solutions
- **Start with `sequential-thinking`** for complex tasks
- **Use `filesystem`** for ALL file operations, never skip it
- **Leverage the full power** of each server's capabilities

This system ensures maximum utilization of your available MCP infrastructure for every task.