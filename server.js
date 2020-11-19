const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(helmet());
app.use(compression())

const people_router = require('./people_route');

app.use('/people', people_router);

app.get('/', (req, res) => {
    res.send('server is working');
})

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});