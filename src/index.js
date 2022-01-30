import express from 'express'
import Authentication from './routers/auth';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'
import prouter from './routers/property';
import bodyParser from 'body-parser'
const app = express();
const port = process.env.PORT || 8080
// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to PropertyPro-Lite',
  });
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v3/auth/', Authentication);
app.use('/api/v3/property/', prouter);
const server = app.listen(port);
console.log('app running on port ', port);
export default server;