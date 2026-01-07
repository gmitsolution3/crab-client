export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Pending":
      return "secondary";
    case "Processing":
      return "default";
    case "Courier":
      return "default";
    case "Completed":
      return "default";
    case "Cancelled":
      return "destructive";
    case "Return":
      return "destructive";
    case "On Hold":
      return "secondary";
    default:
      return "outline";
  }
}
