const albumsContainer = document.getElementById('albums');
const photosContainer = document.getElementById('photos');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const previousBtn = document.getElementById('previousBtn');
const backBtn = document.getElementById('backBtn');

const albumsPerPage = 10;
let currentPage = 1;
let albumsData = [];
let currentAlbum = null;

// Fetch albums data from the API
function fetchAlbums() {
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(albums => {
      albumsData = albums;
      displayAlbums(albums.slice(0, albumsPerPage));
      checkButtonsVisibility();
    });
}

// Fetch photos for the selected album
function fetchPhotos(albumId) {
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then(response => response.json())
    .then(photos => {
      currentAlbum = albumId;
      displayPhotos(photos);
    });
}

// Display the list of albums
function displayAlbums(albums) {
  albumsContainer.innerHTML = '';

  const albumList = document.createElement('ul');
  albumList.classList.add('album-list');

  albums.forEach(album => {
    const albumItem = document.createElement('li');
    albumItem.textContent = album.title;

    // Event listener for album item click
    albumItem.addEventListener('click', () => {
      fetchPhotos(album.id);
    });

    albumList.appendChild(albumItem);
  });

  albumsContainer.appendChild(albumList);
}

// Display the photos for the selected album
function displayPhotos(photos) {
  albumsContainer.style.display = 'none';
  loadMoreBtn.style.display = 'none';
  previousBtn.style.display = 'none';
  backBtn.style.display = 'inline-block';

  photosContainer.innerHTML = '';

  const albumPhotos = document.createElement('div');
  albumPhotos.classList.add('album-photos');

  photos.forEach(photo => {
    const photoElement = document.createElement('img');
    photoElement.src = photo.thumbnailUrl;
    albumPhotos.appendChild(photoElement);
  });

  photosContainer.appendChild(albumPhotos);
  photosContainer.style.display = 'block';
}

// Load more albums
function loadMoreAlbums() {
  const startIndex = currentPage * albumsPerPage;
  const endIndex = startIndex + albumsPerPage;
  const albums = albumsData.slice(startIndex, endIndex);
  displayAlbums(albums);
  currentPage++;
  checkButtonsVisibility();
}

// Go back to the list of albums
function goBackToList() {
  albumsContainer.style.display = 'block';
  photosContainer.style.display = 'none';
  backBtn.style.display = 'none';
}

// Go to the previous set of albums
function goToPreviousAlbums() {
  currentPage--;
  const startIndex = (currentPage - 1) * albumsPerPage;
  const endIndex = startIndex + albumsPerPage;
  const albums = albumsData.slice(startIndex, endIndex);
  displayAlbums(albums);
  checkButtonsVisibility();
}

// Check if buttons should be visible
function checkButtonsVisibility() {
  if (currentPage * albumsPerPage < albumsData.length) {
    loadMoreBtn.style.display = 'inline-block';
  } else {
    loadMoreBtn.style.display = 'none';
  }

  if (currentPage > 1) {
    previousBtn.style.display = 'inline-block';
  } else {
    previousBtn.style.display = 'none';
  }
}

// Event listener for Load More button
loadMoreBtn.addEventListener('click', loadMoreAlbums);

// Event listener for Previous Albums button
previousBtn.addEventListener('click', goToPreviousAlbums);

// Event listener for Back button
backBtn.addEventListener('click', goBackToList);

// Fetch the initial set of albums
fetchAlbums();
