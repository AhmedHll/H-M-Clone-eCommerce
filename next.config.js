/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    MONGO_URL: "mongodb+srv://nader:1a2a3a4a@cursed.c222iiu.mongodb.net/",
    NEXT_ENV: "production",
    APPLICATION_SECRET: "weakness-disgusts-me",
  },
};

module.exports = nextConfig;
