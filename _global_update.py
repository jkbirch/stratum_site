#!/usr/bin/env python3
"""Global nav/header/footer/tagline replacement across all SAI HTML files."""
import re, glob, os

ROOT = os.path.dirname(os.path.abspath(__file__))

NEW_TAGLINE = "The drone-to-CMMS integration platform"
OLD_TAGLINE = "Recurring Drone Inspection Programs for Facility Operations"

# Files to process for global nav/footer/tagline
files = [f for f in glob.glob(os.path.join(ROOT, "*.html"))]

# ---- Canonical desktop nav (inner nav links only; keep theme toggle + contact CTA) ----
# We'll rebuild the <nav class="nav-desktop"> ... </nav> block and mobile-nav block.

def desktop_nav(active):
    def cls(name):
        return "nav-link active" if name == active else "nav-link"
    def aria(name):
        return ' aria-current="page"' if name == active else ''
    return f'''    <nav class="nav-desktop" aria-label="Main navigation">
      <a href="./index.html" class="{cls('home')}"{aria('home')}>Home</a>
      <a href="./product.html" class="{cls('product')}"{aria('product')}>Product</a>
      <a href="./how-it-works.html" class="{cls('how')}"{aria('how')}>How It Works</a>
      <a href="./industries.html" class="{cls('industries')}"{aria('industries')}>For Whom</a>
      <a href="./resources.html" class="{cls('resources')}"{aria('resources')}>Resources</a>
      <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme"></button>
      <a href="./contact.html" class="btn btn-primary nav-cta">Contact</a>
    </nav>'''

def mobile_nav(active):
    def cls(name):
        return "nav-link active" if name == active else "nav-link"
    def aria(name):
        return ' aria-current="page"' if name == active else ''
    return f'''<nav class="mobile-nav is-closed" aria-label="Mobile navigation">
  <a href="./index.html" class="{cls('home')}"{aria('home')}>Home</a>
  <a href="./product.html" class="{cls('product')}"{aria('product')}>Product</a>
  <a href="./how-it-works.html" class="{cls('how')}"{aria('how')}>How It Works</a>
  <a href="./industries.html" class="{cls('industries')}"{aria('industries')}>For Whom</a>
  <a href="./resources.html" class="{cls('resources')}"{aria('resources')}>Resources</a>
  <a href="./contact.html" class="btn btn-primary">Contact</a>
</nav>'''

FOOTER = '''<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="footer-brand-name">Stratum Asset Intelligence LLC</span>
        <span class="footer-brand-tagline">The drone-to-CMMS integration platform</span>
        <p>The drone-to-CMMS integration platform. Any drone platform in. Any CMMS out. We turn drone inspection findings into structured work orders in Maximo, SAP PM, Fiix, Dynamics 365, and any enterprise CMMS.</p>
      </div>

      <div class="footer-col">
        <h4>Product</h4>
        <a href="./product.html">Overview</a>
        <a href="./how-it-works.html">How It Works</a>
        <a href="./industries.html">For Whom</a>
        <a href="./contact.html?program=design-partner">Design Partner Program</a>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <a href="./why-stratum.html">Why the Integration Layer</a>
        <a href="./about.html">About</a>
        <a href="./resources.html">Resources</a>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <a href="./contact.html?program=design-partner">Become a Design Partner</a>
        <a href="mailto:sales@stratumassetintelligence.com">sales@stratumassetintelligence.com</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Stratum Asset Intelligence LLC. All rights reserved.</span>
    </div>
  </div>
</footer>'''

# Map filename -> active nav key
ACTIVE = {
    "index.html": "home",
    "product.html": "product",
    "connector.html": "product",
    "how-it-works.html": "how",
    "industries.html": "industries",
    "resources.html": "resources",
    "why-stratum.html": None,
    "about.html": None,
    "contact.html": None,
    "bvlos-industrial-drone-operations.html": "resources",
    "commercial-drone-policy-risk-based-framework.html": "resources",
    "facility-managers-guide-drone-inspections.html": "resources",
    "thank-you.html": None,
}

re_desktop = re.compile(r'<nav class="nav-desktop".*?</nav>', re.DOTALL)
re_mobile = re.compile(r'<nav class="mobile-nav[^"]*".*?</nav>', re.DOTALL)
re_footer = re.compile(r'<footer class="site-footer">.*?</footer>', re.DOTALL)

for path in files:
    name = os.path.basename(path)
    if name.startswith("_"):
        continue
    with open(path, encoding="utf-8") as fh:
        html = fh.read()
    active = ACTIVE.get(name)

    # Replace desktop nav
    html, n1 = re_desktop.subn(desktop_nav(active), html)
    # Replace mobile nav
    html, n2 = re_mobile.subn(mobile_nav(active), html)
    # Replace footer
    html, n3 = re_footer.subn(FOOTER.replace('\\', '\\\\'), html)
    # Tagline in header brand + everywhere
    html = html.replace(OLD_TAGLINE, NEW_TAGLINE)

    with open(path, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"{name}: desktop={n1} mobile={n2} footer={n3}")

print("DONE")
