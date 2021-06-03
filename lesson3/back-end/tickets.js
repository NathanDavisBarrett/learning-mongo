const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb.nathandavisbarrett.com:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String,
});

ticketSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
ticketSchema.set('toJSON', {
  virtuals: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/api/tickets', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    res.send({tickets});
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
