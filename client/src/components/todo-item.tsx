import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo, Category } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TodoItemProps {
  todo: Todo;
  category?: Category;
}

export default function TodoItem({ todo, category }: TodoItemProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PATCH", `/api/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/todos/${todo.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      toast({
        title: "Success",
        description: "Todo deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => toggleMutation.mutate()}
            disabled={toggleMutation.isPending}
            className="mt-1"
          />
          <div className="space-y-1 min-w-0">
            <h3 className={`font-medium break-words ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.title}
            </h3>
            <p className={`text-sm break-words ${todo.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
              {todo.description}
            </p>
            {category && (
              <Badge variant="secondary" className="mt-2">
                {category.name}
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
          className="shrink-0"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardContent>
    </Card>
  );
}