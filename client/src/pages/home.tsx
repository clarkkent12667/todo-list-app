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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">My Todo List</h1>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Sheet>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                      <Plus className="h-4 w-4" />
                      <span className="sm:inline">Add Todo</span>
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new todo</p>
                </TooltipContent>
              </Tooltip>
              <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
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
                    <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                      <Plus className="h-4 w-4" />
                      <span className="sm:inline">Categories</span>
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage todo categories</p>
                </TooltipContent>
              </Tooltip>
              <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Manage Categories</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategoryForm />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
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
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full sm:max-w-md"
            />
          </div>

          <Card className="shadow-sm border border-border">
            <CardContent className="p-4 sm:p-6">
              <TodoList search={search} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}