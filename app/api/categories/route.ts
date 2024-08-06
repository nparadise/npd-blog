import { fetchCategories } from "@/app/lib/database";

export async function GET() {
  const categories = await fetchCategories();
  return Response.json({ categories });
}
