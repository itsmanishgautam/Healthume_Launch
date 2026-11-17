# Complete Guide & Instructions: Adding New Content to Healthume

> **Purpose for AI Agents & Developers:**  
> This document is an exhaustive, self-contained specification for adding any new content (articles, product pages, interactive tools, or on-page sections) to the **Healthume** static website (`https://healthume.com/`).  
> Any AI or developer reading this guide must follow the exact structure, CSS design system, navigation hierarchy, relative pathing conventions, and search indexing rules specified below.

---

## Table of Contents
1. [Site Architecture & Tech Stack](#1-site-architecture--tech-stack)
2. [Folder Structure & Relative Path Matrix](#2-folder-structure--relative-path-matrix)
3. [Design System & CSS Class Reference](#3-design-system--css-class-reference)
4. [Universal Page Header, Navigation & Footer](#4-universal-page-header-navigation--footer)
5. [Workflow A: Adding a New Blog Article](#5-workflow-a-adding-a-new-blog-article)
6. [Workflow B: Adding a New Product Page](#6-workflow-b-adding-a-new-product-page)
7. [Workflow C: Adding a New Interactive Health Tool](#7-workflow-c-adding-a-new-interactive-health-tool)
8. [Workflow D: Adding a New Section to an Existing Page](#8-workflow-d-adding-a-new-section-to-an-existing-page)
9. [Updating the Client-Side Search Engine (`search-db.js`)](#9-updating-the-client-side-search-engine-search-dbjs)
10. [AI Pre-Flight & Verification Checklist](#10-ai-pre-flight--verification-checklist)

---

## 1. Site Architecture & Tech Stack

- **Site Name:** Healthume (`healthume`)
- **Canonical Base URL:** `https://healthume.com/`
- **Technology:** Pure Static HTML5, Vanilla JavaScript (ES6), CSS3, Bootstrap 5.3.0, FontAwesome 6 (free solid/regular/brand icons), Service Worker (`sw.js`).
- **Google AdSense Client ID:** `ca-pub-3582391366443366`
- **Default Publishing Year:** `2026`
- **Search System:** Client-side JavaScript powered by `js/search-db.js` running on `search.html`.
- **Dynamic Features in `js/main.js`:**
  - Automatic reading progress bar (`#reading-progress`) attached to `.content-body` / `.article-card`.
  - Floating back-to-top button (`#back-to-top`).
  - IntersectionObserver scroll reveal (`.reveal` & `.visible`).
  - Session-persisted health alert banner dismissal (`#health-alert` via `sessionStorage`).
  - Active navigation state detection based on URL filename.
  - Mock newsletter subscribe interaction (`mockNewsletterSubscribe()`).

---

## 2. Folder Structure & Relative Path Matrix

### Workspace Structure
```
Healthume_Launch/
├── 404.html
├── CNAME
├── index.html
├── privacy-policy.html
├── search.html
├── sw.js
├── terms-of-service.html
├── blog/
│   ├── index.html (and pagination: index-page-2.html, index-page-3.html)
│   ├── category-mental-health.html
│   ├── category-nutrition-diet.html
│   ├── category-physical-health.html (and category-physical-health-page-2.html)
│   ├── category-skin-beauty.html
│   └── [article-slug].html (individual articles)
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── search-db.js
├── media/
│   ├── logo.png
│   ├── blog_images/
│   └── product_images/
├── shop/
│   ├── index.html
│   ├── category-fitness-equipment.html
│   ├── category-health-monitoring-devices.html
│   ├── category-natural-organic-products.html
│   ├── category-personal-care.html
│   ├── category-supplements.html
│   └── [product-slug].html (individual products)
└── tools/
    ├── bmi_calculator.html
    └── calorie_calculator.html
```

### Relative Path Matrix
Because Healthume is hosted without server-side routing or root-relative URL rewrites, **all relative paths must adhere strictly to the file's directory depth**:

| Resource / Link | From Root (`/index.html`, `/search.html`) | From Subfolders (`/blog/`, `/shop/`, `/tools/`) |
| :--- | :--- | :--- |
| **CSS Stylesheet** | `css/style.css` | `../css/style.css` |
| **Main JavaScript** | `js/main.js` | `../js/main.js` |
| **Search Database** | `js/search-db.js` | `../js/search-db.js` |
| **Home Page** | `index.html` | `../index.html` |
| **Search Page** | `search.html` | `../search.html` |
| **Privacy Policy** | `privacy-policy.html` | `../privacy-policy.html` |
| **Terms of Service** | `terms-of-service.html` | `../terms-of-service.html` |
| **Blog Home** | `blog/index.html` | `../blog/index.html` (or `index.html` if inside `blog/`) |
| **Blog Category** | `blog/category-mental-health.html` | `../blog/category-mental-health.html` (or `category-mental-health.html` inside `blog/`) |
| **Shop Home** | `shop/index.html` | `../shop/index.html` (or `index.html` if inside `shop/`) |
| **Shop Category** | `shop/category-fitness-equipment.html` | `../shop/category-fitness-equipment.html` (or `category-fitness-equipment.html` inside `shop/`) |
| **BMI Calculator** | `tools/bmi_calculator.html` | `../tools/bmi_calculator.html` (or `bmi_calculator.html` inside `tools/`) |
| **Blog Images** | `media/blog_images/<image>.jpg` | `../media/blog_images/<image>.jpg` |
| **Product Images** | `media/product_images/<image>.jpg` | `../media/product_images/<image>.jpg` |

---

## 3. Design System & CSS Class Reference

All custom styles reside in `css/style.css` with CSS variables rooted at `:root`:

### 3.1 Color Palette & Theme Tokens
- `--primary`: `#2563eb` (Brand blue)
- `--primary-d`: `#1d4ed8` (Dark blue for hover/headers)
- `--primary-dd`: `#1e3a8a` (Deep navy)
- `--primary-l`: `#eff6ff` (Light blue tint for backgrounds/pills)
- `--primary-b`: `#bfdbfe` (Blue border)
- `--accent`: `#0d9488` (Teal accent)
- `--accent-l`: `#f0fdfa` (Light teal tint)
- `--bg`: `#f8fafc` (Body canvas background)
- `--surface`: `#ffffff` (Card and panel white surface)
- `--surface-2`: `#f1f5f9` (Subtle gray container surface)
- `--surface-3`: `#e8eef5` (Border/hover neutral)
- `--text`: `#0f172a` (Primary charcoal headings)
- `--text-b`: `#1e293b` (Primary body text)
- `--muted`: `#64748b` (Secondary/caption text)
- `--border`: `#e2e8f0` (Subtle 1px border)

### 3.2 Border Radius & Shadows
- Radius tokens: `--r-xs` (6px), `--r-sm` (10px), `--r-md` (16px), `--r-lg` (22px), `--r-xl` (30px), `--r-2xl` (40px), `--r-pill` (999px)
- Shadow tokens: `--sh-xs`, `--sh-sm`, `--sh-md`, `--sh-lg`, `--sh-xl`

### 3.3 Core Component Classes
- **`.topbar`**: Light trust bar at the top with verified badges and privacy link.
- **`.navbar`**: Fixed dark navigation bar (`background: #0f172a`).
- **`.health-alert`**: Sticky announcement bar (`#fefce8` soft yellow with `#854d0e` text).
- **`.hero-panel`**: Rounded container (`--r-2xl`) with subtle blue radial glow.
- **`.hero-kicker`**: Uppercase pill tag (`font-size: .72rem`, `--primary-l` background, `--primary-b` border).
- **`.hero-title`**: Hero H1 with dynamic `clamp(1.85rem, 3.6vw, 3.2rem)` typography.
- **`.hero-text`**: Lead summary paragraph (`max-width: 50ch`).
- **`.section-heading`**: Standard section header containing `<h2>` and subtitle `<p>`.
- **`.card.h-100`**: Standard card for 3-column grids. Images use `.card-img-top` (`height: 210px; object-fit: cover`).
- **`.featured-badge`**: Gradient pill (`linear-gradient(135deg, var(--primary), var(--accent))`, white uppercase text).
- **`.article-card`**: Main container for single article pages (`--r-2xl`, image height `360px`).
- **`.tl-dr-box`**: Quick Summary callout with thick gradient left accent border (`4px`).
- **`.content-body`**: Long-form article prose. Handles `h2` (with blue bottom border), `h3`, `h4`, `p`, `ul`, `ol`, `blockquote`, and `img` with pre-styled drop shadows and rounded corners.
- **`.sidebar-card`**: Clean sidebar card with `.card-header` and `.card-body`.
- **`.newsletter-card`**: Gradient card (`#1e40af` to `#0f766e`) with `.newsletter-icon` and email subscription input.
- **`.quick-link`**: Clickable action card with an icon box, title, and subtitle.
- **`.trending-item`**: Horizontal list item with a 96x96 thumbnail.
- **`.btn-primary`**: Pill button with blue gradient and hover lift.
- **`.btn-outline-primary`**: Outlined pill button.
- **`.btn-secondary`**: Soft neutral pill button (`--surface-2`).

---

## 4. Universal Page Header, Navigation & Footer

Every single HTML page on Healthume must include these three standard blocks.

### 4.1 Head Block Boilerplate
Adjust relative paths (`../` vs no prefix) depending on directory depth:

```html
<head>
    <meta charset="UTF-8">
    <meta name="google-adsense-account" content="ca-pub-3582391366443366">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>[PAGE TITLE] - healthume</title>
    <meta name="description" content="[META DESCRIPTION 150-160 CHARS]">
    <meta name="keywords" content="[COMMA_SEPARATED_KEYWORDS]">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <link rel="canonical" href="https://healthume.com/[EXACT_PAGE_PATH]">

    <!-- OpenGraph -->
    <meta property="og:type" content="article"> <!-- or "website", "product" -->
    <meta property="og:title" content="[PAGE TITLE] - healthume">
    <meta property="og:description" content="[META DESCRIPTION]">
    <meta property="og:url" content="https://healthume.com/[EXACT_PAGE_PATH]">
    <meta property="og:image" content="https://healthume.com/[IMAGE_PATH]">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="[PAGE TITLE] - healthume">
    <meta name="twitter:description" content="[META DESCRIPTION]">
    <meta name="twitter:image" content="https://healthume.com/[IMAGE_PATH]">

    <!-- Fonts & CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../css/style.css"> <!-- Use css/style.css if in root -->

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3582391366443366" crossorigin="anonymous"></script>
</head>
```

### 4.2 Topbar, Navbar & Alert Bar Boilerplate (Subfolder Example)
*Note: If placing in root, remove the `../` prefix.*

```html
<!-- Topbar -->
<header class="topbar py-2 border-bottom">
    <div class="container d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div class="d-none d-md-flex align-items-center gap-4 small text-muted">
            <span><i class="fas fa-check-circle text-success me-1"></i> Medically Reviewed</span>
            <span><i class="fas fa-user-md text-primary me-1"></i> Expert Verified</span>
            <span><i class="fas fa-calendar-check text-info me-1"></i> Last Updated: June 03, 2026</span>
        </div>
        <div class="ms-auto small">
            <a href="../privacy-policy.html" class="text-decoration-none text-muted">Privacy Policy</a>
        </div>
    </div>
</header>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark sticky-top" aria-label="Main navigation">
    <div class="container">
        <a class="navbar-brand" href="../index.html">healthume</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link active" href="../blog/index.html">Articles</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="blogCategoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="blogCategoryDropdown">
                        <li><a class="dropdown-item" href="../blog/category-mental-health.html">Mental Health</a></li>
                        <li><a class="dropdown-item" href="../blog/category-nutrition-diet.html">Nutrition &amp; Diet</a></li>
                        <li><a class="dropdown-item" href="../blog/category-physical-health.html">Physical Health</a></li>
                        <li><a class="dropdown-item" href="../blog/category-skin-beauty.html">Skin &amp; Beauty</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="../shop/index.html">Products</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="toolsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tools
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="toolsDropdown">
                        <li><a class="dropdown-item" href="../tools/bmi_calculator.html">BMI Calculator</a></li>
                        <li><a class="dropdown-item" href="../tools/calorie_calculator.html">Daily Calorie Calculator</a></li>
                    </ul>
                </li>
            </ul>

            <form class="d-flex search-form" action="../search.html" method="GET" role="search">
                <label class="visually-hidden" for="site-search">Search</label>
                <input id="site-search" class="form-control me-2" type="search" name="q" placeholder="Search articles and products..." aria-label="Search">
                <button class="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>

<!-- Persistent Health Alert -->
<div id="health-alert" class="alert alert-warning alert-dismissible fade show rounded-0 mb-0 text-center health-alert" role="alert">
    <strong>Health Products:</strong> Find the latest information and updates on our health products.
    <a href="../shop/index.html" class="alert-link">Browse now</a>.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

### 4.3 Universal Footer & Script Boilerplate
```html
<footer class="pt-5 pb-3 mt-5">
    <div class="container">
        <hr class="footer-sep">
        <div class="text-center small">
            <p>&copy; 2026 healthume. All rights reserved.</p>
            <p>
                <a href="../privacy-policy.html" class="text-white text-decoration-none mx-2">Privacy Policy</a>
                <span class="text-white-50">|</span>
                <a href="../terms-of-service.html" class="text-white text-decoration-none mx-2">Terms of Service</a>
            </p>
        </div>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="../js/main.js"></script> <!-- or js/main.js if in root -->
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js')
                .then(function (reg) {
                    console.log('Service Worker registered successfully with scope: ', reg.scope);
                })
                .catch(function (err) {
                    console.error('Service Worker registration failed: ', err);
                });
        });
    }
</script>
</body>
</html>
```

---

## 5. Workflow A: Adding a New Blog Article

Follow these exact steps when adding a new article:

### Step A.1: Save Image Asset
Place the featured article image in:
```
media/blog_images/<article-slug>.jpg (or .png)
```
*Recommendation:* Use 16:9 or 4:3 ratio with a minimum resolution of 800x450px.

### Step A.2: Create the HTML File
Create:
```
blog/<article-slug>.html
```

### Step A.3: Paste the Standard Article Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="google-adsense-account" content="ca-pub-3582391366443366">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>[Article Title] | Daily Wellness Guide - healthume</title>
    <meta name="description" content="[150-160 characters describing the article benefits and summary]">
    <meta name="keywords" content="[keyword 1, keyword 2, keyword 3]">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <link rel="canonical" href="https://healthume.com/blog/[article-slug].html">

    <meta property="og:type" content="article">
    <meta property="og:title" content="[Article Title] | Daily Wellness Guide - healthume">
    <meta property="og:description" content="[Article Summary]">
    <meta property="og:url" content="https://healthume.com/blog/[article-slug].html">
    <meta property="og:image" content="https://healthume.com/media/blog_images/[image-filename].jpg">
    <meta property="article:published_time" content="2026-06-03">
    <meta property="article:modified_time" content="2026-06-03">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="[Article Title] | Daily Wellness Guide - healthume">
    <meta name="twitter:description" content="[Article Summary]">
    <meta name="twitter:image" content="https://healthume.com/media/blog_images/[image-filename].jpg">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../css/style.css">

    <!-- Schema.org BlogPosting -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "[Article Title]",
      "image": [
        "https://healthume.com/media/blog_images/[image-filename].jpg"
      ],
      "datePublished": "2026-06-03",
      "dateModified": "2026-06-03",
      "author": {
        "@type": "Organization",
        "name": "healthume",
        "url": "https://healthume.com/index.html"
      },
      "publisher": {
        "@type": "Organization",
        "name": "healthume",
        "logo": {
          "@type": "ImageObject",
          "url": "https://healthume.com/media/logo.png"
        }
      },
      "description": "[Article Summary]",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "url": "https://healthume.com/blog/[article-slug].html"
      }
    }
    </script>

    <!-- Schema.org BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://healthume.com/index.html"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Articles",
          "item": "https://healthume.com/blog/index.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[Category Name]",
          "item": "https://healthume.com/blog/[category-filename].html"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "[Article Title]",
          "item": "https://healthume.com/blog/[article-slug].html"
        }
      ]
    }
    </script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3582391366443366" crossorigin="anonymous"></script>
</head>
<body>

    <!-- Insert Universal Topbar, Navbar and Health Alert (Section 4.2) -->

    <main class="py-5">
        <div class="container">
            <!-- Breadcrumb Navigation -->
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="index.html">Articles</a></li>
                    <li class="breadcrumb-item"><a href="[category-filename].html">[Category Name]</a></li>
                    <li class="breadcrumb-item active" aria-current="page">[Article Title]</li>
                </ol>
            </nav>

            <div class="row justify-content-center">
                <!-- Main Article Column -->
                <div class="col-lg-9">
                    <article class="card mb-4 shadow-sm article-card">
                        <img src="../media/blog_images/[image-filename].jpg" class="card-img-top" alt="[Article Title]" loading="lazy">
                        <div class="card-body p-4 p-md-5">
                            <span class="featured-badge mb-2"><i class="fas fa-star"></i> Featured</span>
                            <h1 class="card-title mb-3">[Article Title]</h1>
                            <p class="text-muted mb-3">
                                Published on June 03, 2026 in <a href="[category-filename].html" class="text-decoration-none text-primary">[Category Name]</a>
                            </p>

                            <!-- Quick Summary Callout Box -->
                            <div class="tl-dr-box mb-4">
                                <strong><i class="fas fa-bolt"></i> Quick Summary (TL;DR)</strong>
                                <p>
                                    [Concise 2-3 sentence overview of the article highlights and takeaways.]
                                </p>
                            </div>

                            <hr>

                            <!-- Content Body -->
                            <div class="card-text content-body">
                                <p>[Introductory paragraph introducing the core thesis.]</p>

                                <h2>1. [Section One Heading]</h2>
                                <p>[Section content with medical and scientific context.]</p>

                                <h2>2. [Section Two Heading]</h2>
                                <p>[Section content.]</p>
                                <ul>
                                    <li><strong>[Key Point 1]:</strong> Description.</li>
                                    <li><strong>[Key Point 2]:</strong> Description.</li>
                                </ul>

                                <blockquote>
                                    "A key health insight or quote emphasizing the core benefit."
                                </blockquote>

                                <h2>3. [Section Three Heading]</h2>
                                <p>[Practical everyday steps readers can follow.]</p>

                                <h2>Conclusion & Next Steps</h2>
                                <p>[Closing takeaway and encouragement.]</p>
                            </div>

                            <!-- Related Articles -->
                            <div class="mt-5 pt-4 border-top">
                                <h3 class="h5 mb-3">Related Articles</h3>
                                <div class="d-flex flex-wrap gap-2">
                                    <a href="10-simple-tips-for-a-healthier-lifestyle.html" class="btn btn-outline-primary btn-sm">10 Healthy Lifestyle Tips</a>
                                    <a href="top-5-superfoods-you-need-in-your-diet.html" class="btn btn-outline-primary btn-sm">Top 5 Superfoods</a>
                                    <a href="intermittent-fasting-a-beginners-guide-to-a-health.html" class="btn btn-outline-primary btn-sm">Intermittent Fasting Guide</a>
                                </div>
                            </div>

                            <a href="index.html" class="btn btn-secondary mt-4">Back to Articles</a>
                        </div>
                    </article>
                </div>

                <!-- Sidebar Column -->
                <aside class="col-lg-3">
                    <!-- Categories Widget -->
                    <div class="card shadow-sm mb-4 sidebar-card">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">Categories</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="category-mental-health.html" class="text-decoration-none">Mental Health</a>
                                <span class="badge rounded-pill">3</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="category-nutrition-diet.html" class="text-decoration-none">Nutrition &amp; Diet</a>
                                <span class="badge rounded-pill">9</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="category-physical-health.html" class="text-decoration-none">Physical Health</a>
                                <span class="badge rounded-pill">16</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="category-skin-beauty.html" class="text-decoration-none">Skin &amp; Beauty</a>
                                <span class="badge rounded-pill">1</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Newsletter Widget -->
                    <div class="card sidebar-card newsletter-card text-white mb-4">
                        <div class="card-body p-4 text-center">
                            <div class="newsletter-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <h2 class="h5 mb-2">Get Health Tips Direct</h2>
                            <p class="small mb-3">Join our community for weekly evidence-based wellness updates.</p>
                            <form action="javascript:void(0);" onsubmit="mockNewsletterSubscribe(this)">
                                <div class="mb-3">
                                    <input type="email" class="form-control" placeholder="Your email address" required>
                                </div>
                                <button type="submit" class="btn btn-warning w-100">Subscribe Free</button>
                            </form>
                        </div>
                    </div>

                    <!-- Quick Tools Widget -->
                    <div class="card sidebar-card p-3">
                        <h5 class="card-title h6 mb-3">Health Calculators</h5>
                        <a href="../tools/bmi_calculator.html" class="quick-link">
                            <i class="fas fa-calculator"></i>
                            <div>
                                <strong>BMI Calculator</strong>
                                <span>Check weight category</span>
                            </div>
                        </a>
                        <a href="../tools/calorie_calculator.html" class="quick-link">
                            <i class="fas fa-fire"></i>
                            <div>
                                <strong>Calorie Calculator</strong>
                                <span>Daily calorie targets</span>
                            </div>
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    <!-- Insert Universal Footer and Scripts (Section 4.3) -->
```

### Step A.4: Register in `blog/index.html` (Article Grid)
In `blog/index.html`, locate `<div class="row g-4">` and insert a new card at the top:
```html
<div class="col-md-6 col-lg-4">
    <div class="card h-100">
        <img src="../media/blog_images/[image-filename].jpg" class="card-img-top" alt="[Article Title]" loading="lazy">
        <div class="card-body">
            <span class="featured-badge">Featured</span>
            <h2 class="card-title">[Article Title]</h2>
            <p class="card-text">[1-2 sentence teaser summary]</p>
            <div class="mt-auto d-flex gap-2 flex-wrap">
                <a href="[article-slug].html" class="btn btn-primary btn-sm">Read More</a>
                <a href="[category-filename].html" class="btn btn-secondary btn-sm">[Category Name]</a>
            </div>
        </div>
    </div>
</div>
```

### Step A.5: Register in the Corresponding Category Page
Open `blog/category-[category].html`, locate the `<div class="row">` card container, and add the card snippet above.

---

## 6. Workflow B: Adding a New Product Page

### Step B.1: Save Image Asset
Place the product image in:
```
media/product_images/<product-slug>.jpg (or .png)
```

### Step B.2: Create the HTML File
Create:
```
shop/<product-slug>.html
```

### Step B.3: Essential Product Components
Use the same structure as `shop/smart-bluetooth-body-scale.html`:
1. **Schema.org:** Use `"@type": "Product"` with `name`, `image`, `description`, `brand`, and `category`. Also include an `"@type": "FAQPage"` schema for customer questions.
2. **Product Hero Panel:**
   ```html
   <div class="card article-card p-4 p-md-5 mb-4">
       <div class="row g-4 align-items-center">
           <div class="col-md-6">
               <img src="../media/product_images/[image-filename].jpg" class="img-fluid rounded-4 shadow-sm" alt="[Product Name]">
           </div>
           <div class="col-md-6">
               <span class="featured-badge mb-2">[Category Name]</span>
               <h1 class="card-title h2 mb-3">[Product Name]</h1>
               <p class="text-muted mb-3">[Short marketing tagline & highlight]</p>
               <div class="d-flex align-items-center gap-2 mb-3">
                   <div class="text-warning small">
                       <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                   </div>
                   <span class="small text-muted">(4.8 / 5 from 5,000+ reviews)</span>
               </div>
               <div class="mb-4">
                   <a href="[BUY_OR_AFFILIATE_LINK]" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg px-4">
                       <i class="fas fa-shopping-cart me-2"></i> Check Price on Amazon
                   </a>
               </div>
           </div>
       </div>
   </div>
   ```
3. **Features & Specifications Section:**
   Use `.content-body` with styled checkmarks:
   ```html
   <div class="card p-4 p-md-5 mb-4 sidebar-card">
       <div class="content-body">
           <h2>Key Features & Benefits</h2>
           <ul>
               <li><strong>Feature 1:</strong> Detail.</li>
               <li><strong>Feature 2:</strong> Detail.</li>
           </ul>
       </div>
   </div>
   ```

### Step B.4: Register in `shop/index.html` & Corresponding Shop Category File
Add the product card to `shop/index.html` and `shop/category-[category].html`.

---

## 7. Workflow C: Adding a New Interactive Health Tool

### Step C.1: File Creation
Create:
```
tools/<calculator_name>.html
```

### Step C.2: Calculator UI Structure
Wrap your tool in `.hero-panel` and standard `.card` elements:
```html
<main class="py-5">
    <div class="container">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="../blog/index.html">Tools</a></li>
                <li class="breadcrumb-item active" aria-current="page">[Tool Name]</li>
            </ol>
        </nav>

        <!-- Hero Header -->
        <div class="hero-panel mb-4">
            <span class="hero-kicker"><i class="fas fa-calculator"></i> Free Health Tool</span>
            <h1 class="hero-title">[Tool Name]</h1>
            <p class="hero-text">[Explain what the tool calculates and why it helps users achieve their goals.]</p>
        </div>

        <div class="row g-4">
            <!-- Interactive Tool Form -->
            <div class="col-lg-7">
                <div class="card p-4 shadow-sm border-0 rounded-4">
                    <form id="health-calculator-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Input 1</label>
                            <input type="number" class="form-control" id="calc-input-1" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Calculate Now</button>
                    </form>

                    <!-- Results Container -->
                    <div id="calculator-result" class="mt-4 p-3 bg-light rounded-3 d-none">
                        <h4 class="h5 fw-bold text-primary mb-2">Your Result:</h4>
                        <p id="result-text" class="h3 fw-bold mb-1"></p>
                        <p id="result-advice" class="text-muted small mb-0"></p>
                    </div>
                </div>
            </div>

            <!-- Informational Sidebar / Guide -->
            <div class="col-lg-5">
                <div class="card sidebar-card p-4">
                    <h3 class="h5 fw-bold mb-3">How to Use This Tool</h3>
                    <p class="small text-muted">Follow these simple instructions to calculate your metrics accurately.</p>
                </div>
            </div>
        </div>
    </div>
</main>
```

### Step C.3: Update Navigation Dropdown across all pages
When a new tool is introduced, add it to the `<ul class="dropdown-menu" aria-labelledby="toolsDropdown">`:
```html
<li><a class="dropdown-item" href="../tools/[new_tool].html">[New Tool Name]</a></li>
```

---

## 8. Workflow D: Adding a New Section to an Existing Page

When adding new content sections to existing pages (such as `index.html` or category landing pages), reuse these proven design patterns:

### Pattern 1: 3-Column Card Grid (e.g. Featured Articles, Services, or Tips)
```html
<section class="py-5">
    <div class="container">
        <div class="section-heading mb-4">
            <h2>[Section Title]</h2>
            <p>[Section Subtitle explaining what readers will discover]</p>
        </div>
        <div class="row g-4">
            <!-- Card Item -->
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="media/blog_images/[image].jpg" class="card-img-top" alt="[Title]" loading="lazy">
                    <div class="card-body">
                        <span class="featured-badge">[Badge]</span>
                        <h3 class="card-title h5">[Title]</h3>
                        <p class="card-text">[Description]</p>
                        <div class="mt-auto">
                            <a href="blog/[slug].html" class="btn btn-primary btn-sm">Explore</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Pattern 2: Side-by-Side Callout Banner (Hero / Highlight)
```html
<div class="hero-panel my-5">
    <div class="row align-items-center g-4">
        <div class="col-lg-8">
            <span class="hero-kicker"><i class="fas fa-heartbeat"></i> Essential Guide</span>
            <h2 class="hero-title">[Catchy Headline]</h2>
            <p class="hero-text">[Compelling description highlighting the solution or advice.]</p>
            <div class="hero-actions">
                <a href="blog/[slug].html" class="btn btn-primary btn-lg">Read the Guide</a>
                <a href="shop/index.html" class="btn btn-outline-primary btn-lg">Shop Essentials</a>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="hero-media">
                <img src="media/blog_images/[image].jpg" alt="[Image description]" loading="lazy">
            </div>
        </div>
    </div>
</div>
```

### Pattern 3: Compact Trending List (Horizontal Cards)
```html
<div class="d-flex flex-column gap-3">
    <a href="blog/[slug].html" class="trending-item d-flex align-items-center gap-3 text-decoration-none">
        <img src="media/blog_images/[image].jpg" alt="[Title]">
        <div>
            <span class="badge bg-primary mb-1">[Category]</span>
            <h3 class="h6 mb-1 text-dark">[Article Title]</h3>
            <span class="small text-muted"><i class="far fa-clock me-1"></i> 4 min read</span>
        </div>
    </a>
</div>
```

---

## 9. Updating the Client-Side Search Engine (`search-db.js`)

> **CRITICAL REQUIREMENT:**  
> The site's search bar (`search.html?q=...`) searches directly against the in-memory JavaScript object defined in `js/search-db.js`.  
> Whenever you add an article or product, **you MUST register it inside `js/search-db.js`**, otherwise it will be invisible in search results!

### 9.1 Registering a Blog Article in `js/search-db.js`
Open `js/search-db.js` and add an object to the `searchDatabase.posts` array:

```javascript
{
  "title": "[Exact Article Title]",
  "slug": "[article-slug-without-dot-html]",
  "image": "blog_images/[image-filename].jpg",
  "category_name": "[Mental Health | Nutrition & Diet | Physical Health | Skin & Beauty]",
  "content_preview": "[Plain text snippet of first 200 characters without HTML tags...]",
  "content": "<div class=\"container\"><p>[Full or condensed article HTML markup]</p></div>"
}
```

*Rules for `posts` entries:*
- `"slug"`: Do **NOT** include `.html`. The search script automatically appends `.html`.
- `"image"`: Always relative to `media/`, e.g., `"blog_images/my-image.jpg"`.
- `"category_name"`: Must match one of the active categories:
  - `Mental Health`
  - `Nutrition & Diet`
  - `Physical Health`
  - `Skin & Beauty`

### 9.2 Registering a Product in `js/search-db.js`
Add an object to the `searchDatabase.products` array:

```javascript
{
  "name": "[Exact Product Name]",
  "slug": "[product-slug-without-dot-html]",
  "image": "product_images/[image-filename].jpg",
  "category_name": "[Fitness Equipment | Health Monitoring Devices | Natural & Organic Products | Personal Care | Supplements]",
  "description_preview": "[Plain text snippet of product summary...]",
  "description": "<h2>[Product Name]</h2><p>[Detailed HTML description...]</p>",
  "price": "Check In Buy Link",
  "buy_link": "[Affiliate or store link]"
}
```

---

## 10. AI Pre-Flight & Verification Checklist

Before considering your work complete, execute this verification protocol:

- [ ] **1. File Locations:**
  - Article HTML in `blog/<slug>.html`
  - Product HTML in `shop/<slug>.html`
  - Image files placed in `media/blog_images/` or `media/product_images/`
- [ ] **2. Relative Paths Verified:**
  - From subfolders (`blog/`, `shop/`, `tools/`), CSS link points to `../css/style.css`
  - Main JS points to `../js/main.js`
  - Logo and images point to `../media/...`
  - Navbar links properly prefixed (`../index.html`, `../shop/index.html`, etc.)
- [ ] **3. Active Navbar State:**
  - The appropriate nav link has the `.active` class (e.g. `nav-link active` on "Articles" or "Products").
- [ ] **4. SEO & Metadata:**
  - `<title>`, `<meta name="description">`, and `<link rel="canonical">` point to the live URL.
  - OpenGraph and Twitter cards configured with full `https://healthume.com/` URLs.
  - Schema.org JSON-LD structured data included and valid.
  - AdSense meta tag `<meta name="google-adsense-account" content="ca-pub-3582391366443366">` present.
- [ ] **5. Design System Classes Reused:**
  - Used `.article-card`, `.card.h-100`, `.featured-badge`, `.tl-dr-box`, `.content-body`, `.sidebar-card`, and `.btn-primary`.
  - Did **NOT** introduce conflicting external stylesheets or hardcoded arbitrary inline colors that break dark/light tokens.
- [ ] **6. Search Engine Synchronized:**
  - Added new item into `js/search-db.js` under `searchDatabase.posts` or `searchDatabase.products`.
- [ ] **7. Cross-Referenced / Linked:**
  - Added card into `blog/index.html` (or `shop/index.html`).
  - Added card into the corresponding category page (`blog/category-*.html`).
  - Added to related articles block in similar posts if applicable.
- [ ] **8. Responsive & Mobile Check:**
  - All images use `loading="lazy"` and `class="card-img-top"` or `img-fluid`.
  - Bootstrap grid utilizes responsive column classes (`col-lg-9 col-md-12`, `col-lg-3`, etc.).

---

*This document serves as the master blueprint for Healthume content deployment.*

