import { algoliasearch } from 'algoliasearch';

// Connect and authenticate with your Algolia app
const client = algoliasearch('GBXBVNP75R', 'd3d3d941906f9f547f8b6512691675cc');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://dashboard.algolia.com/sample_datasets/movie.json');
  const objects = await datasetRequest.json();
  return client.saveObjects({ indexName: 'movies_index', objects });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));