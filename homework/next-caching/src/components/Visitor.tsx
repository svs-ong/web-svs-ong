import { cookies } from "next/headers";
import { VisitorForm } from "@/components/VisitorForm";

// Per-browser data: each browser keeps its own "visitor" cookie
export const Visitor = async () => {
  const name = (await cookies()).get("visitor")?.value ?? "";

  return <VisitorForm name={name} />;
};
