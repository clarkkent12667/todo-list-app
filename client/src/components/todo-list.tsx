import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@shared/schema";
import TodoItem from "./todo-item";
import { Skeleton } from "@/components/ui/skeleton";

export default function TodoList() {
  const { data: todos, isLoading, error } = useQuery<Todo[]>({
    queryKey: ["/api/todos"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-center py-4">
        Failed to load todos
      </div>
    );
  }

  if (!todos?.length) {
    return (
      <div className="text-muted-foreground text-center py-4">
        No todos yet. Create one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
