import app from './app.js';
import { config } from './config/environment.js';

const PORT = config.port;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Truva server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
});