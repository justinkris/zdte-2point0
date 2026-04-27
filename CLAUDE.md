# ZDTE Exam Prep — Claude Code Instructions

Static HTML study site for the Zscaler Digital Transformation Engineer (ZDTE) certification exam. No build system — all files are plain HTML/CSS/JS.

---

## Project Structure

```
/
├── index.html                  # Main study plan dashboard
├── study-guides.html           # Index of study guides
├── study-bites.html            # Index of study bites
├── study-nibbles.html          # Index of study nibbles
├── memory-palaces.html         # Index of memory palaces
├── mock-exams.html             # Index of mock exams
│
├── bite.css                    # Shared CSS for study bites
├── nibble.css                  # Shared CSS for study nibbles
├── study-guide.css             # Shared CSS for study guides
│
├── study-guides/               # Day-by-day study guides (day-01.html … day-08.html)
├── study-nibbles/              # Quick-reference nibbles (nibble-*.html)
├── memory-palaces/             # Memory palace pages + palace.css
├── mock-exams/                 # Mock exam review pages (day-02.html, 04, 06, 08, 10, 12)
├── study-bites/                # Individual study bites
│
└── images/                     # All images — organised by content type
    ├── memory-palaces/
    │   ├── dlp/
    │   ├── get-post/
    │   ├── zdx/
    │   ├── zdx-hospital/
    │   └── identity-services/  (shared with study-nibbles)
    ├── study-guides/
    │   └── day-08/
    └── study-nibbles/
        ├── zpa-hierarchy/
        └── identity-services/
```

---

## Nav Hub Button

Every page has a **📚 STUDY MATERIALS** hover-dropdown in the header-right. It must be present on all root pages and all sub-pages. Sub-pages (one level deep) use `../` prefixes for links.

```html
<div class="nav-hub">
  <div class="nav-hub-trigger">
    <div class="icon">📚</div>
    <div class="label">STUDY MATERIALS</div>
    <div class="hint">hover to explore</div>
  </div>
  <div class="nav-hub-dropdown">
    <a class="nav-hub-item" href="study-guides.html"><span class="nav-icon">📖</span> STUDY GUIDES</a>
    <a class="nav-hub-item" href="memory-palaces.html"><span class="nav-icon">🧠</span> MEMORY PALACES</a>
    <a class="nav-hub-item" href="study-bites.html"><span class="nav-icon">🍐</span> STUDY BITES</a>
    <a class="nav-hub-item" href="study-nibbles.html"><span class="nav-icon">🍔</span> STUDY NIBBLES</a>
    <a class="nav-hub-item" href="mock-exams.html"><span class="nav-icon">📋</span> MOCK EXAMS</a>
  </div>
</div>
```

Sub-pages (in `study-guides/`, `memory-palaces/`, etc.) prefix all hrefs with `../`.

---

## Nav Tabs — Scroll Behaviour (CRITICAL)

All pages with nav tabs **must** use `navTo()` for smooth scroll. Never use `setTab()` alone (it only highlights, doesn't scroll). Never name the function `scrollTo` — that shadows `window.scrollTo` and breaks everything.

**Required JS:**
```js
function navTo(sectionId, el) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
```

**Required HTML pattern:**
- Every `<div class="section-block">` must have `id="section-<name>"`
- Every nav tab: `<button class="nav-tab" onclick="navTo('section-<name>', this)">`
- The `.section-nav` must have `position: sticky; top: 0; z-index: 50;`

---

## Image Organisation

Never drop images in the root or in content folders. All images live under `/images/` with subdirectories matching content type and topic:

| Content | Path |
|---|---|
| Memory palace images | `images/memory-palaces/<palace-name>/` |
| Study guide images | `images/study-guides/day-XX/` |
| Study nibble images | `images/study-nibbles/<nibble-name>/` |

Give images descriptive names when moving them (e.g. `saml-checkin.png`, not `1.png`).

Image paths from sub-pages use `../images/…`

---

## Adding New Content — Checklists

### New Study Guide
1. Create `study-guides/day-XX.html` using `study-guide.css`
2. Add `id="section-<name>"` on every section block
3. Use `navTo()` on all nav tabs (sticky nav, 60px offset)
4. Add entry to `study-guides.html` grid
5. Mark day status on `index.html` (green = complete, amber = in progress)

### New Study Nibble
1. Create `study-nibbles/nibble-<topic>.html` using `nibble.css`
2. Add breadcrumb: `../index.html` → `../study-nibbles.html` → current
3. Add card to `study-nibbles.html` under the correct category label
4. Increment the count card on `study-nibbles.html`

### New Memory Palace
1. Create `memory-palaces/memory-palace-<topic>.html`
2. Use `navTo()` on all nav tabs (sticky nav, 60px offset)
3. Add breadcrumb: `../index.html` → `../memory-palaces.html` → current
4. Add nav hub button to `header-right` (use `../` prefixed links)
5. Add card to `memory-palaces.html` under correct category, increment count
6. **Add this new palace to the Related Bites sidebar on ALL existing memory palace pages that have a sidebar**

### New Mock Exam Review
1. Create `mock-exams/day-XX.html`
2. Breadcrumb: `../index.html` → `../mock-exams.html` → current
3. Use `navTo()` on all nav tabs
4. Add nav hub button (use `../` links)
5. Add `id="subtopic-list"` on the sidebar checklist

---

## CSS Files

| File | Used by |
|---|---|
| `bite.css` | Study bites |
| `nibble.css` | Study nibbles — link with `../nibble.css` from sub-pages |
| `study-guide.css` | Study guides |
| `memory-palaces/palace.css` | Memory palaces |

Nibble pages that need non-standard layouts add an inline `<style>` block for page-specific CSS only — don't modify `nibble.css`.

---

## Colour Tokens (shared across all pages)

```css
--cream: #fef9f0        --cream-dark: #f5eddb
--ink: #1a1209          --ink-soft: #5a4a35       --ink-muted: #8a7660
--orange: #ff6b35       --orange-light: #fff3ec   --orange-border: #ffd5c0
--green: #3a7d44        --green-light: #edf7ee    --green-border: #b2dfb4
--purple: #5c35cc       --purple-light: #ece8ff   --purple-border: #c8bbff
--blue: #1a6bcc         --blue-light: #e8f0fb     --blue-border: #b3ccf0
--red: #a32d2d          --red-light: #fce8e8      --red-border: #f7c1c1
--border: #ede5d8       --amber-light: #fffbe6
```

Domain tag classes: `.tag-zia` `.tag-zpa` `.tag-zdx` `.tag-arch` `.tag-rev` `.tag-pod` `.tag-weight`

---

## Current Content Inventory

| Type | Count | Notes |
|---|---|---|
| Study guides | 8 | Days 01–08 complete |
| Study nibbles | 10 | |
| Memory palaces | 5 | GET+POST · Response Flow · DLP · ZDX Hospital · Identity Airport |
| Mock exam reviews | 4 | Days 02, 04, 06, 08 |
| Study days complete | 8 | Day 09 in progress |
| Exam date | 2 May 2026 | Saturday |
