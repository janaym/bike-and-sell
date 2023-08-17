$(document).ready(function() {

  console.log('working')
  loadItems()

});

const loadItems = function() {
  console.log('in loadItems')
  $.get('/api/items')
    .then( data => {
      console.log('it worked!')
      renderItems(data.items)
    })
}

const createItemElement = function(data) {
  const element = `<article class="listing">
  <span class="image">
    url img goes here
  </span>
  <span class="listing-overview">
    <header>
      $1234 - Bike Listing Title
    </header>

    <p> description of bike </p>

    <footer>
      <span>Item location - N days ago</span>
      <span></span>
    </footer>
  </span>
</article>`;

  return element;
};

const renderItems = function(items) {
  const container = $('.listing-container');

  for (const item of items) {
    const element = createItemElement(item);
    container.append(element);

  }
}
