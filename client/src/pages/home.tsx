import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              My Todo List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
