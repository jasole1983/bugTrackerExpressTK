module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
    },
    jwtConfig: {
      secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNTMxNDkwOCwiaWF0IjoxNjM1MzE0OTA4fQ.PWH75J0Dy--TOALEg2DpV-JFRvwkZTgtzEZ_YlBcQpM',
      expiresIn: 3600,
    },
  };