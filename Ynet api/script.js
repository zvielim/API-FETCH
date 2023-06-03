const API_KEY = '51a1f1de53944e58be88f2d96e98efa6';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?sources=ynet&apiKey=${API_KEY}`;

// Fetch news data from YNET API
fetch(NEWS_API_URL)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles.slice(0, 10); // Get the first 10 articles

    // Render news cards
    const newsContainer = document.getElementById('news-container');
    articles.forEach(article => {
      const card = createNewsCard(article);
      newsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.log('An error occurred while fetching news data:', error);
  });

// Create a news card
function createNewsCard(article) {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = article.title;

  const subtitle = document.createElement('p');
  subtitle.className = 'card-subtitle';
  subtitle.textContent = article.description;

  const link = document.createElement('a');
  link.className = 'card-link';
  link.href = article.url;
  link.textContent = 'לכתבה המלאה';

  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(link);

  return card;
}
