import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Search } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Todo
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new todo</p>
                </TooltipContent>
              </Tooltip>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create New Todo</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <TodoForm />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Categories
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage todo categories</p>
                </TooltipContent>
              </Tooltip>
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

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 max-w-md"
            />
          </div>

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