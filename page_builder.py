"""Generate the pages for the site"""

def get_template(file_name: str):
    with open("templates/" + file_name + ".html", "r") as html_file:
        return "".join(html_file.readlines())


def make_page(file_name: str, content: str):
    with open(file_name + ".html", "w") as output_file:
        output_file.write(content)


def build_page(output_file_name: str, template_name: str, page_name: str, page_header: str, **replacements):
    original_text = get_template(template_name)

    replacements |= {"page name": page_name, "page header": page_header}

    for original, replacement in replacements.items():
        original_text = original_text.replace("{% " + original.upper() + " %}", replacement)
    
    make_page(output_file_name, original_text)


# About page
build_page("about", "base", " - About", "About Us", content=get_template("about"))
# Products page
build_page("products", "base", " - Products", "Products", content=get_template("products"))
