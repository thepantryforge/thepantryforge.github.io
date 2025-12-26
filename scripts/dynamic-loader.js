// Add essential elements
let head = document.head;
let body = document.body;

// Meta tags & Bootstrap CSS
head.innerHTML += `\
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">

<!-- My CSS -->
<link href="styles/variables.css" rel="stylesheet">
<link href="styles/components/accordion.css" rel="stylesheet">
<link href="styles/components/footer.css" rel="stylesheet">
<link href="styles/components/hero.css" rel="stylesheet">
<link href="styles/components/icon.css" rel="stylesheet">
<link href="styles/components/navbar.css" rel="stylesheet">
<link href="styles/components/paint-background.css" rel="stylesheet">
<link href="styles/components/table.css" rel="stylesheet">`

// Header & Container
body.innerHTML = `\
<pf-header></pf-header>
<main>
    <div class="container my-5">` + body.innerHTML

// Container & Footer
body.innerHTML += `\
    </div>
</main>
<pf-footer></pf-footer>`



// Add custom components
class PantryForgeHeader extends HTMLElement {
  async connectedCallback() {
    const html = await fetch('/components/navbar.html').then(r => r.text());
    this.innerHTML = html;
  }
}
customElements.define('pf-header', PantryForgeHeader);

class PantryForgeFooter extends HTMLElement {
  async connectedCallback() {
    const html = await fetch('/components/footer.html').then(r => r.text());
    // Add the current year for the copyright
    this.innerHTML = html.replace("{{CURRENT_YEAR}}", new Date().getFullYear())
  }
}
customElements.define('pf-footer', PantryForgeFooter);



// Function to wait for an element on the page to appear
function waitForElment(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}



// Highlight the current nav tab
async function highlightNavItem() {
  await waitForElment('a.nav-link');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelector('nav.navbar').querySelectorAll('a[href]').forEach(link => {
    try {
      const url = new URL(link.getAttribute('href'), window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '') || '/';

      if (linkPath === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        link.setAttribute('href', '#')
        done = true;
      }
    } catch (e) {
      // Ignore malformed hrefs (e.g. "#", "javascript:")
    }
  });
}
highlightNavItem();



// Finally, add Bootstrap JS & My JS
async function addJS() {
  await waitForElment('pf-footer')

  const bsScript = document.createElement('script');
  bsScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js';
  bsScript.integrity = 'sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI';
  bsScript.crossOrigin = 'anonymous'
  document.body.appendChild(bsScript);

  const heroScript = document.createElement('script');
  heroScript.src = '/scripts/hero.js';
  document.body.appendChild(heroScript);
}
addJS();
