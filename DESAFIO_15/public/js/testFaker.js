function fetchMock() {
  return fetch("/api/products-test").then((res) => res.json());
}

function htmlTable(products) {
  return fetch("../hbs/productsTable.hbs")
    .then((res) => res.text())
    .then((table) => {
      const template = Handlebars.compile(table);
      const html = template({ products });
      return html;
    });
}

fetchMock()
  .then((products) => {
    return htmlTable(products);
  })
  .then((html) => {
    document.getElementById("fakeProducts").innerHTML = html;
  });
