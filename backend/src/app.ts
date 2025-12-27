// Backend Express Application
// Main server entry point - placeholder for Express app setup

export class App {
  private port: number;
  
  constructor() {
    this.port = 5000;
  }
  
  public start(): void {
    console.log(`Server starting on port ${this.port}`);
  }
}

export default App;
