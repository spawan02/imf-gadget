import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');  

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gadget API',
      version: '1.0.0',
      description: 'API documentation for managing gadgets in the inventory.',
    },
    servers: [
      {
        url: 'https://imf.itsarc.me/',
        description: 'Production server on Railway',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwaggerDocs = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
};
