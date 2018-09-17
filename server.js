// 引入 config
import './config/config'
import express from 'express'
import bodyParser from 'body-parser'
// 與 mongoDB 溝通的套件
import mongoose from 'mongoose'
// 跨網域套件
// import cors from 'cors'
// apollo server 實例建立套件
import { ApolloServer } from 'apollo-server-express';
// 引入 apollo server 需要的 schema
import schema from './schema'
// upload function 
import { processUpload } from './utils/upload'
// 以下都是 Subscription 依賴的東西
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'


const app = express();
// mongoDB 建立連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
/*
  apollo server 實例建立
    schema: 需要 graphql schema
    context: 在 resolvers function 第三個參數內的內容可以自訂
    playground: 開發者 GUI 內容自訂
      endpoint: GUI graphql 進入點
      subscriptionEndpoint: graphql subscription 進入點
*/
const apolloInstance = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    processUpload,
  }),
  playground: {
    endpoint: `http://${process.env.IP_ADDRESS}:${process.env.PORT}/graphql`,
    subscriptionEndpoint: `ws://${process.env.IP_ADDRESS}:${process.env.PORT}/subscriptions`,
    settings: {
      'editor.theme': 'dark'
    }
  }
});
// 
apolloInstance.applyMiddleware({
  app
});
// 建立 http server
const server = createServer(app);
// server listen and SubscriptionServer 建立實例
server.listen(process.env.PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
  console.log('server start up port: ' + process.env.PORT)
});
