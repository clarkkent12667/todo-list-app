import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">My Todo List</h1>
          <ThemeToggle />
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

        <Card className="shadow-sm border border-border">
          <CardContent className="pt-6">
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}