const target = 'https://localhost:7291';

const PROXY_CONFIG = [
  {
    context: [
      "/api/todo"
    ],
    target,
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
