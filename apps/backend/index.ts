import "dotenv/config";
import express from "express";
import { prismaClient } from "db/client";
import type { User } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then((users: User[]) => {
      res.json({users});
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then((user: User) => {
      res.status(201).json(user);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);