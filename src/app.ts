import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes/Routes';
import 'dotenv/config';
import 'express-async-errors'
import './database/connection';
import erroHandler from './error/handler';

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares();
    this.routes();
    this.error();
    
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }  

  private routes (): void {
    this.express.use(routes)
  }

  private error (): void {
    this.express.use(erroHandler);
  }
}

export default new App().express