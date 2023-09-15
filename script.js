const search = document.getElementById("search");
const root = document.getElementById("root");

const getMovies = (searchValue) => {
  const url = `https://www.omdbapi.com/?&apikey=927285a3&s=${searchValue}`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    root.innerHTML = ""; // Clear previous results
    data.Search.map((ele) => {
      printMovies(ele);
    });
  });
};

let debounceTimeout;
search.addEventListener("input", () => {
  const searchValue = search.value;
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    if (searchValue === "") {
      displayLoad();
    } else {
      getMovies(searchValue);
    }
  }, 300); // Adjust the debounce delay (in milliseconds) as needed
});

// Rest of your code...




const printMovies = (ele) => {
  // // console.log(ele);
  const title = document.createElement("h2");
  title.innerText = `${ele.Title}`;
  const poster = document.createElement("img");
  poster.src = `${ele.Poster}`;
  poster.alt = "Movie Name";
  const type = document.createElement("span");
  type.innerHTML = "Type: " + `${ele.Type}`;
  const id = document.createElement("span");
  id.textContent = `ID:${ele.imdbID}`;
  const year = document.createElement("span");
  year.textContent = "Released Year:" + `${ele.Year}`;
  const container = document.createElement("div");
  container.classList = "container";
  container.appendChild(title);
  container.appendChild(poster);
  container.appendChild(type);
  container.appendChild(year);
  container.appendChild(id);
  root.appendChild(container);
};

const displayLoad = () => {
  const promise = fetch("https://movies.free.beeceptor.com/movies");
  promise
  .then((res) => {
    return res.json();
    })
    .then((data) => {
      // console.log(data);
      data.map((ele) => {
        // console.log(ele);
        const title = document.createElement("h2");
        title.innerText = ele.title;
        const poster = document.createElement("img");
        poster.src = ele.poster;
        const description = document.createElement("p");
        description.innerText = ele.description;
        const rating = document.createElement("span");
        rating.innerText = ele.rating;
        const released_date = document.createElement("span");
        released_date.innerText = ele.releasedDate;
        const container = document.createElement("div");
        container.classList = "container";
        container.appendChild(title);
        container.appendChild(poster);
        container.appendChild(description);
        container.appendChild(rating);
        container.appendChild(released_date);
        root.appendChild(container);
      });
    });
};
displayLoad()
