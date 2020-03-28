// Step 1: using axios, send a GET request to the following URL
//            (replacing the palceholder with your Github name):
//            https://api.github.com/users/<your name>

// axios.get('https://api.github.com/users/sid2015980')
// .then(response => {
//   console.log(response)
// })

function getData() {
  axios
    .get("https://api.github.com/users/sid2015980")
    .then(response => {
      document.querySelector(".cards").appendChild(makeCard(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}
getData();

//  Step 2: Inspect and study the data coming back, this is YOUR
//    github info! You will need to understand the structure of this
//    data in order to use it to build your component function

//    Skip to Step 3.
//  Step 3: Create a function that accepts a single object as its only argument,
//           Using DOM methods and properties, create a component that will return the following DOM element:

// <div class="card">
//   <img src={image url of user} />
//   <div class="card-info">
//     <h3 class="name">{users name}</h3>
//     <p class="username">{users user name}</p>
//     <p>Location: {users location}</p>
//     <p>Profile:
//       <a href={address to users github page}>{address to users github page}</a>
//     </p>
//     <p>Followers: {users followers count}</p>
//     <p>Following: {users following count}</p>
//     <p>Bio: {users bio}</p>
//   </div>
// </div>

function makeCard(item) {
  const card = document.createElement("div");

  const cardImg = document.createElement("img");
  cardImg.src = item.avatar_url;
  card.appendChild(cardImg);

  const cardInfo = document.createElement("div");
  card.appendChild(cardInfo);

  const name = document.createElement("h3");
  name.textContent = item.name;
  cardInfo.appendChild(name);

  const username = document.createElement("p");
  username.textContent = item.login;
  cardInfo.appendChild(username);

  const location = document.createElement("p");
  location.textContent = `Location: ${item.location}`;
  cardInfo.appendChild(location);

  const profile = document.createElement("p");
  cardInfo.appendChild(profile);
  profile.textContent = "Profile: ";

  const address = document.createElement("a");
  address.href = item.html_url;
  address.textContent = item.html_url;
  profile.appendChild(address);

  const followers = document.createElement("p");
  followers.textContent = `Followers: ${item.followers}`;
  cardInfo.appendChild(followers);

  const following = document.createElement("p");
  following.textContent = `Following: ${item.following}`;
  cardInfo.appendChild(following);

  const bio = document.createElement("p");
  bio.textContent = `Bio: ${item.bio}`;
  cardInfo.appendChild(bio);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  return card;
}

// Step 4: Pass the data received from Github into your function,
// create a new component and add it to the DOM as a child of .cards
const followersArray = [];

function getFriends() {
  axios
    .get("https://api.github.com/users/sid2015980/followers")
    .then(response => {

      response.data.forEach(user => {
          followersArray.push(user.login);
        })
        
        .catch(error => {
          console.log(error);
        });
    });
}
getFriends();

// Step 5: Now that you have your own card getting added to the DOM, either
//follow this link in your browser https://api.github.com/users/<Your github name>/followers
//, manually find some other users' github handles, or use the list found
//at the bottom of the page. Get at least 5 different Github usernames and add them as
//Individual strings to the friendsArray below.
//Using that array, iterate over it, requesting data for each user, creating a new card for each
//user, and adding that card to the DOM.
setTimeout(() => {
  function friendCards() {
    followersArray.forEach(user => {
      axios
        .get(`https://api.github.com/users/${user}`)
        .then(response => {
          document.querySelector(".cards").appendChild(makeCard(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
  friendCards();
}, 500);
