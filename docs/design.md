# Frontend Design
## Idaho Quantitative Traders Club 
### Software Design Document

**Name:** Samuel Beal  
**Date Created:** 09/21/2025  
**Date Last Updated:** 09/23/2025  

<it>
(this document was generated partially by AI, there may be errors)
</it>

## Summary  

- [1 Introduction](#1-introduction)  
- [2 System Overview](#2-system-overview)  
- [3 System Architecture](#3-system-architecture)  
- [4 Tools & Tech Stack](#4-tools--tech-stack)  
- [5 Requirements Matrix](#5-requirements-matrix)  
- [6 Appendices](#6-appendices)  

---

## Preface 
This document covers mainly the reporting layer.

## 1 Introduction  

### 1.1 Purpose  
This SDD is intended to lay out the design for the frontend of the **Barker Quantitative Trading Club** web application. The frontend provides the primary user interface for members to view dashboards, run trading simulations, analyze market data, and collaborate on research projects.  

### 1.2 Scope  
The frontend will:  
- Provide dashboards for strategy performance visualization.  
- Allow for implementing and watching strategies from entry to exit.
- Support interactive data visualization (charts, heatmaps, tables).  
- Integrate with the backend for authentication, market data, and strategy results.  
- Enable collaboration by supporting posts, comments, and shared resources.  

**Goals and Benefits:**  
- Easy to implement new trading strategies.  
- Create a clean, professional UI.
- Encourage engagement among club members by making data exploration intuitive.  

### 1.3 Overview  
This document describes the frontend’s structure, technology stack, and design rationale. It is organized into sections covering system overview, architecture, tools, requirements, and supporting details.  

### 1.4 Reference Material  
- [React + Next.js Documentation](https://nextjs.org/docs)  
- [ShadCN/UI Documentation](https://ui.shadcn.com/)  
- [MUI](https://mui.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)  

### 1.5 Definitions and Acronyms  
- **UI:** User Interface  
- **UX:** User Experience  
- **API:** Application Programming Interface  
- **SSR:** Server side rendering
- **ISR:** Incremental Static Regeneration (mix of static and SSR )
---

## 2 System Overview  
The frontend is a **Next.js (React) application** that will:  ======
- Allow users to log in via club credentials or SSO (Google/University login).  
- Display trading strategy dashboards with real-time and historical data.  
- Provide an interface for submitting strategies, uploading datasets, and viewing results.  

**Flow (conceptual):**  
User → Browser (Next.js Frontend) → API Gateway → Backend Services → Database/Market Data

---

## 3 System Architecture  

### 3.1 Architectural Design  
- **Framework:** Next.js (React).
- **UI Library:** MUI + ShadCN/UI + TailwindCSS.  
- **Data Fetching:** TBD. Either Manual w/ useState/useEffect or React Query / Next.js server components.  
- **Visualization:** TBD for financial charts. I wanna look into [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
- **State Management:** TBD. Possibly Context API + React Query cache.  
- **Auth:** TBD. Possibly NextAuth or Clerk.  

Frontend is deployed by default with **Vercel** for Next.js projects. This may be changed for our project.  

### 3.2 Design Rationale  
- **Next.js chosen** for SSR/ISR (good for financial data and SEO).  
- **ShadCN + Tailwind** for a modern, consistent design system.  
- customizable financial data visualization.  
- manage API calls, caching, and data consistency.  

---

## 4 Tools & Tech Stack  

### 4.1 Recommended Tools  
- **VS Code** (development).  
- **Insomnia/Postman** (API testing).  

### 4.2 Tech Stack  
- **Frontend Framework:** Next.js (React).  
- **Styling:** Mui + TailwindCSS + ShadCN/UI.  
- **Charts:** TradingView Lightweight Charts.
- **State Management:** React Query + Context API.  
- **Auth:** NextAuth.js or Clerk.  
- **Deployment:** Vercel.  

### Guidelines

- Try to use mainly `.ts` or `.tsx` files rather than JavaScript.
---

## 5 Requirements Matrix  

1. A system that allows users to log in and access member-only features.  
2. A dashboard to visualize strategy performance and financial data.  
3. A UI for uploading strategies and viewing backtest results.  
4. Integration with backend APIs for fetching market data.  
5. Ensure mobile-friendly design for accessibility.
6. Consistent UI/UX across all pages (such as consistent components [mui-components](https://mui.com/material-ui/all-components/)).  

---

## 6 Appendices  

- **Appendix A:** Figma mockups (to be attached).  
- **Appendix B:** API schema documentation.  
- **Appendix C:** Style Guide (colors, typography, UI components).  
