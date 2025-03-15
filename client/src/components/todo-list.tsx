import { useQuery } from "@tanstack/react-query";
import type { Todo, Category } from "@shared/schema";
import TodoItem from "./todo-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

interface TodoListProps {
  search?: string;
}

export default function TodoList({ search }: TodoListProps) {
  const { data: todos, isLoading, error } = useQuery<Todo[]>({
    queryKey: ["/api/todos", search && { search }].filter(Boolean),
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
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
      <div className="text-muted-foreground text-center py-8">
        {search ? (
          <div className="flex flex-col items-center gap-2">
            <Search className="h-12 w-12 text-muted-foreground/50" />
            <p>No todos found matching "{search}"</p>
          </div>
        ) : (
          "No todos yet. Create one below!"
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          category={categories?.find(c => c.id === todo.categoryId)}
        />
      ))}
    </div>
  );
}