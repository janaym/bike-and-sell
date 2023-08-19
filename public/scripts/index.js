$(document).ready(function() {

  loadItems()
  showBikeForm()
  addImageButton();
  postBikeButton();
  toggleBarButtons();
  searchBarButton();
  //loadFavourites() uncomment when we figure out adding
  loadMyListings();

});

/**
 * Load All Items/Bikes onto landing page
 */
const loadItems = function() {

  console.log('in loadItems')
  $.get('/api/items')
    .then( data => {
      console.log('it worked!')
      renderItems(data.items)
    })
}

const createItemElement = function(data) {

  //extract item info from data
  const itemTitle = data.title;
  const itemPrice = data.price;
  const itemLocation = data.city;
  const itemCondition = data.condition;
  const itemDescription = data.description;
  const itemSize = data.size;
  const postDate = data.created_at;



  // to do: figure out timeAgo
  // const postDate = data.created_at;
  // const timeAgo = timeago.format(postDate);

  const element = `<article class="listing">
  <span class="image">
    url img goes here
  </span>
  <span class="listing-overview">
    <header>
      $${itemPrice} - ${itemTitle}
    </header>
    <p> Size: ${itemSize}, Condition: ${itemCondition} </p>
    <p> ${itemDescription} </p>

    <footer>
      <span>${itemLocation} - ${postDate}</span>

      <div class='icon-bar'>
        <i class="fa-solid fa-envelope" id="envelope"></i>
        <i class="fa-solid fa-star" id="star"></i>
      </div>
    </footer>
  </span>
</article>`;

  return element;
};

//takes in a list of database items and renders each with createItemElement
const renderItems = function(items) {
  const container = $('.listing-container');
  console.log(items[1])
  for (const item of items) {
    const element = createItemElement(item);
    container.append(element);

  }
}


/* --------------- EVENT LISTENERS ----------------------*/

/**
 * Show Post Bike Form
 */
const showBikeForm = function() {
  const button = document.querySelector(".post-bike");
  const dropdownForm = document.querySelector(".dropdown-form");

  button.addEventListener("click", function() {
    if (dropdownForm.style.display === "none") {
      dropdownForm.style.display = "flex"
    } else {
      dropdownForm.style.display = "none"
    }
  });
}

//add image button listener
const addImageButton = function() {
  $('.image-button').click(() => {
    alert('image button clicked!');
  })
}

//post new bike button listener
const postBikeButton = function () {
  $('.post-button').click(() => {
    alert('post form button clicked!');
  })
}

//togglebar listener
const toggleBarButtons = function() {
  $('.toggle-bar').on('click', '*', () => {
    alert('toggle bar option clicked!')
  })
}

//searchbar listener
const searchBarButton = function () {
  $('.search-button').click(() => {
    alert('Seach bar clicked!')
  })
}

//send Message listener

const sendMessage = function () {

  $("fa-solid fa-envelope").click(function() {
     alert("message seller")
  })

}

  /**
 * Load Favourites
 * (how to add event listeners for things that don't exist yet??)
 */
const loadFavourites = function(items) {
  const favouritesButton = document.querySelector(".favourites");

  favouritesButton.addEventListener("click", function() {
    console.log(items)

    $.get('/api/items')
    .then( data => {

        renderItems(data.items)
    })

  });

  };

  /**
* Load User Listings / NOT YET WORKING
*/
  const loadMyListings = function() {
    const myListings = document.getElementsByClassName("my-listings");
    myListings.addEventListener("click", function() {

      console.log('in loadItems');
      $.get('/api/items')
        .then(data => {
          data.items.forEach(item => {
            if(data.items[seller_id] === "2") {
              renderItems(data.items);
            }
          })
        });

    });
  };

  /**
   * Delete Bike
   */

  const deleteBike = function(item) {
    //if bike item belongs to user cookie delete
  };


