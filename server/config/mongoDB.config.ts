import dotenv from "dotenv";

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zdfumif.mongodb.net/GameFinder_Database`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337 // MongoDB port - if local / Not Cloud ?

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT  // if local / not cloud ??
  }
}