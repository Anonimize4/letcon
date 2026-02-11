import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import corsConfig from './config/cors';

// Load environment variables from .env
dotenv.config();

export class App {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    // Use the port from .env or default to 5000 to match your frontend .env.development
    this.port = Number(process.env.PORT) || 5000;
    
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    // Standard middleware
    this.app.use(express.json());

    // Use the comprehensive CORS configuration from config/cors.ts
    this.app.use(corsConfig);
  }

  private configureRoutes(): void {
    // Mount API routes with /api/v1 prefix
    this.app.use('/api/v1', routes);
    
    // Health check endpoint
    this.app.get('/api/v1/health', (req, res) => {
      res.json({ status: 'ok', message: 'Backend is connected!' });
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
      console.log(`🔗 API Endpoint: http://localhost:${this.port}/api/v1`);
    });
  }
}

export default App;
