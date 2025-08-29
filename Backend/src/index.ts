import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from "ws";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import { allRouter } from "./Routes/allRoutes";
import { schema } from "../src/GraphQL/schema";

dotenv.config();

const app :any = express();

app.use("/graphql",cors());
app.use(
  cors({
    origin: ["http://localhost:3000","*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// REST routes
app.use("/", allRouter);

// Simple health check
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("working");
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/PracticeDB").then(() => {
  console.log("MongoDB connected");
});

// Create HTTP server
const httpServer = createServer(app);

// Set up WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// GraphQL WebSocket integration
useServer({ schema }, wsServer);

// Set up Apollo Server for GraphQL
const server = new ApolloServer({
  schema,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = 5000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 REST Server ready at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
