import { todos, users, categories, type Todo, type InsertTodo, type User, type InsertUser, type Category, type InsertCategory } from "@shared/schema";
import { db } from "./db";
import { eq, and, like, desc, or } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category operations
  getCategories(userId: number): Promise<Category[]>;
  createCategory(userId: number, category: InsertCategory): Promise<Category>;

  // Todo operations
  getTodos(userId: number, search?: string): Promise<Todo[]>;
  createTodo(userId: number, todo: InsertTodo): Promise<Todo>;
  updateTodo(userId: number, id: number, todo: Partial<InsertTodo>): Promise<Todo>;
  deleteTodo(userId: number, id: number): Promise<void>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCategories(userId: number): Promise<Category[]> {
    return db.select().from(categories).where(eq(categories.userId, userId));
  }

  async createCategory(userId: number, category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values({ ...category, userId })
      .returning();
    return newCategory;
  }

  async getTodos(userId: number, search?: string): Promise<Todo[]> {
    let query = db
      .select()
      .from(todos)
      .where(eq(todos.userId, userId))
      .orderBy(desc(todos.createdAt));

    if (search) {
      query = query.where(
        or(
          like(todos.title, `%${search}%`),
          like(todos.description, `%${search}%`)
        )
      );
    }

    return query;
  }

  async createTodo(userId: number, insertTodo: InsertTodo): Promise<Todo> {
    const [todo] = await db
      .insert(todos)
      .values({ ...insertTodo, userId })
      .returning();
    return todo;
  }

  async updateTodo(
    userId: number,
    id: number,
    updates: Partial<InsertTodo>
  ): Promise<Todo> {
    const [todo] = await db
      .update(todos)
      .set(updates)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async deleteTodo(userId: number, id: number): Promise<void> {
    const [todo] = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
  }
}

export const storage = new DatabaseStorage();