import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema, insertCategorySchema } from "@shared/schema";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Category routes
  app.get("/api/categories", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const categories = await storage.getCategories(req.user.id);
    res.json(categories);
  });

  app.post("/api/categories", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const result = insertCategorySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid category data" });
    }
    const category = await storage.createCategory(req.user.id, result.data);
    res.status(201).json(category);
  });

  // Todo routes
  app.get("/api/todos", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const search = req.query.search?.toString();
    try {
      const todos = await storage.getTodos(req.user.id, search);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  });

  app.post("/api/todos", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const result = insertTodoSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid todo data" });
    }
    const todo = await storage.createTodo(req.user.id, result.data);
    res.status(201).json(todo);
  });

  app.patch("/api/todos/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    try {
      const todo = await storage.updateTodo(req.user.id, id, req.body);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  });

  app.delete("/api/todos/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    try {
      await storage.deleteTodo(req.user.id, id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  });

  return createServer(app);
}