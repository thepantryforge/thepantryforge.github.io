// Add essential elements
let head = document.head;
let body = document.body;

// Meta tags & Bootstrap CSS
head.innerHTML += `\
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">


<!-- My CSS -->
<link href="main.css" rel="stylesheet">`

// Header & Container
body.innerHTML = `\
<pf-header></pf-header>
<div class="container">` + body.innerHTML

// Container & Footer
body.innerHTML += `\
</div>
<div data-include="/components/footer.html"></div>`



// Add custom components
class PantryForgeHeader extends HTMLElement {
  async connectedCallback() {
    const html = await fetch('/components/header.html').then(r => r.text());
    this.innerHTML = html;
  }
}
customElements.define('pf-header', PantryForgeHeader);



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



// Finally, add Bootstrap JS
async function addBootstrapJS() {
  await waitForElment('div[data-include="/components/footer.html"]')
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js';
  script.integrity = 'sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI';
  script.crossOrigin = 'anonymous'
  document.body.appendChild(script);
}
addBootstrapJS();
