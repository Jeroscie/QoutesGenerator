const express = require('express');
const request = require('request');
const path = require('path'); 

const app = express();
const port = 3000; 
app.use(express.static(path.join(__dirname, 'public')));
// Define API endpoint for categories
app.get('/api/quotes/:category', (req, res) => {
  const { category } = req.params;

  // Make sure the category is valid
  const validCategories = [
    'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best',
    'birthday', 'business', 'car', 'change', 'communication', 'computers', 'cool', 'courage',
    'dad', 'dating', 'death', 'design', 'dreams', 'education', 'environmental', 'equality',
    'experience', 'failure', 'faith', 'family', 'famous', 'fear', 'fitness', 'food', 'forgiveness',
    'freedom', 'friendship', 'funny', 'future', 'god', 'good', 'government', 'graduation', 'great',
    'happiness', 'health', 'history', 'home', 'hope', 'humor', 'imagination', 'inspirational',
    'intelligence', 'jealousy', 'knowledge', 'leadership', 'learning', 'legal', 'life', 'love',
    'marriage', 'medical', 'men', 'mom', 'money', 'morning', 'movies', 'success'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  // Make a request to the API-Ninjas quotes endpoint with the specified category
  request.get({
    url: `https://api.api-ninjas.com/v1/quotes?category=${category}`,
    headers: {
      'X-Api-Key': '/gr2v58NuKddqcGrAodFag==Vo7zodZxVPiBeMez'
    },
  }, (error, response, body) => {
    if (error) {
      res.status(500).send('Error fetching data from API');
    } else if (response.statusCode !== 200) {
      res.status(response.statusCode).send(body.toString('utf8'));
    } else {
      res.json(JSON.parse(body));
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
