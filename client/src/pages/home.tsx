import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import CategoryForm from "@/components/category-form";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const { logoutMutation } = useAuth();
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">My Todo List</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Manage Categories</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Manage Categories</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategoryForm />
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl font-bold text-foreground">
              Add New Todo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <TodoForm />
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-4">
          <Input
            type="search"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Card className="shadow-sm border border-border">
            <CardContent className="pt-6">
              <TodoList search={search} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}