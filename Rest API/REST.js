const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let name = [
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
];

// READ 
app.get('/name', (req, res) => {
  res.json(name);
});

// CREATE 
app.post('/name', (req, res) => {
  const newItem = req.body;
  newItem.id = name.length + 1;
  name.push(newItem);

  res.status(201).json(newItem);
});

// Update 
app.put('/name/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = name.findIndex(item => item.id === itemId);

  if (index !== -1) {
    name[index] = { ...name[index], ...updatedItem };
    res.json(name[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete 
app.delete('/name/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  name = name.filter(item => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
