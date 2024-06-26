const express = require('express');
const {serverConfig,Logger} = require('./config');
const apiRoutes = require('./routes');

const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 15, // Limit each IP to 15 requests per `window` (here, per 15 minutes).
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api',apiRoutes);

app.use(
    '/flightsService',
    createProxyMiddleware({
      target: serverConfig.FLIGHT_SERVICE, 
      changeOrigin: true,
    }),
  );

app.use(
    '/bookingService',
    createProxyMiddleware({
      target: serverConfig.BOOKING_SERVICE, 
      changeOrigin: true,
    }),
  );

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server','root',{});
  }) 