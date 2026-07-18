/**
 * TRUVA BACKEND - Main Entry Point
 *
 * This file serves as the main entry point for the backend server.
 * It imports and starts the Express application.
 */

import app from './app';
import { config } from './config/environment';

const PORT = config.port;

// Start the server
app.listen(PORT, () => {
  console.log('\n🚀 =======================================');
  console.log('   TRUVA Backend Server Running');
  console.log('   =======================================');
  console.log(`   📡 Port:        ${PORT}`);
  console.log(`   🌍 Environment: ${config.nodeEnv}`);
  console.log(`   🔗 URL:         http://localhost:${PORT}`);
  console.log(`   🏥 Health:      http://localhost:${PORT}/health`);
  console.log(`   🔐 Auth:        http://localhost:${PORT}/api/auth`);
  console.log('   =======================================\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});