# The Pantry Forge website

## Copyright

Copyright © 2026 `thepantryforge@gmail.com`. All rights reserved.

For more information, see `LICENSE.md`.

## Sitemap
Below is a complete sitemap of the **user-viewable** pages for the site. Note that some `.html` files (e.g. `components/*.html`) are loaded into every page automatically by `dynamic-loader.js`, and thus are not included.

- `/` (`index.html`) - Home page
- `/{non-existent URL}` (`404.html`) - HTTP 404 Error
- `/about` (`about.html`) - About Us
- `/coming-soon` (`coming-soon.html`) - Coming Soon
- `/contact` (`contact.html`) - Contact Us
- `/faq` (`faq.html`) - FAQs
- `/guides` (`guides.html`) - Product Guides & Manuals
- `/returns-policy` (`returns-policy.html`) - Returns Policy
- `/shipping-and-delivery` (`shipping-and-delivery.html`) - Shipping & Delivery Policy
- `/sitemap` (`sitemap.html`) - Sitemap
- `/warranty` (`warranty.html`) - Warranty

## Template for new pages

New pages should follow this basic structure:

```html
<!DOCTYPE html>
<html>

<head>
    <title>The Pantry Forge [[OPTIONAL PAGE NAME]]</title>
    <meta name="description" content="[[DESCRIPTION]]">
</head>

<body>
    [[PAGE CONTENT]]

    <script src="/scripts/dynamic-loader.js"></script>
</body>

</html>
```

The `<script>` ensures the components are all loaded as necessary. It automatically includes all required `.css`, `.js` and custom tags. Everything else on the page, including the header and footer, is included automatically by this `<script>`, so don't add these yourself. 