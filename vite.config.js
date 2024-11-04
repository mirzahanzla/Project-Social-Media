import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy configuration for backend API routes
const proxyConfig = {
  '/auth': 'http://localhost:3000', // Proxying auth routes
  '/user': 'http://localhost:3000', // Proxying user routes
  '/api': 'http://localhost:3000', // Proxying influencer API routes
  '/influencer': 'http://localhost:3000', // Proxying influencer blog routes
  '/Brand': 'http://localhost:3000', // Proxying Brand routes for blogs and campaigns
  // Add more proxies as needed based on your backend routes
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyConfig,
  },
});
