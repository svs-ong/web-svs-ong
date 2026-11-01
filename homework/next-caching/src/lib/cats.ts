import { API_URL } from "@/lib/api";
import type { Cat, CatsSnapshot } from "@/model/cat";

// Reads every cat from the API. The API waits 500 ms before answering.
export const getCats = async (): Promise<CatsSnapshot> => {
  // no-store: fetch keeps no copy of its own, so in this lab only "use cache" decides what is cached
  const response = await fetch(`${API_URL}/cats`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`GET /cats failed with ${response.status}`);
  }
  const cats: Cat[] = await response.json();

  return { cats, fetchedAt: new Date().toISOString() };
};
