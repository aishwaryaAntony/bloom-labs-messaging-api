'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./src/api/routes/v1/index');
var messageRouter = require('./src/api/routes/v1/message');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
	swaggerDefinition: {
		// openapi: '3.0.1',
		info: {
			title: 'Message Service API',
			version: '1.0.0',
			description: 'Message Service API with Swagger doc'
		},
		schemes: ['http'],
		host: 'localhost:3002'
		// components: {
		// 	securitySchemes: {
		// 		bearerAuth: {
		// 			type: 'http',
		// 			scheme: 'bearer',
		// 			bearerFormat: 'JWT',
		// 		}
		// 	}
		// },
	},
	apis: ['./src/models/*.js', './src/api/routes/v1/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/message', messageRouter);

module.exports = app;