"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";
import type { Cat } from "@/model/cat";

export interface ActionResult {
  error?: string;
}

// Sends one write to the cats API and turns a failed response into a readable message
const sendToApi = async (path: string, method: string, body?: object): Promise<ActionResult> => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return { error: data?.error ?? `${method} ${path} failed with ${response.status}` };
  }
  return {};
};

// Runs after every write, so the page shows the new data
const afterChange = () => {
  refresh();
};

export const likeCat = async (cat: Pick<Cat, "id" | "likes">): Promise<ActionResult> => {
  const result = await sendToApi(`/cats/${cat.id}`, "PATCH", { likes: cat.likes + 1 });
  afterChange();
  return result;
};

export const addCat = async (cat: Pick<Cat, "name" | "breed" | "imageUrl">): Promise<ActionResult> => {
  const result = await sendToApi("/cats", "POST", cat);
  afterChange();
  return result;
};

export const renameCat = async (id: number, name: string): Promise<ActionResult> => {
  const result = await sendToApi(`/cats/${id}`, "PATCH", { name });
  afterChange();
  return result;
};

export const deleteCat = async (id: number): Promise<ActionResult> => {
  const result = await sendToApi(`/cats/${id}`, "DELETE");
  afterChange();
  return result;
};

export const resetCats = async (): Promise<ActionResult> => {
  const result = await sendToApi("/cats/reset", "POST");
  afterChange();
  return result;
};

// Remembers who is using this browser, so two windows can be told apart
export const setVisitorName = async (name: string): Promise<ActionResult> => {
  const trimmed = name.trim();
  if (trimmed.length > 20) {
    return { error: "Keep the name under 20 characters" };
  }
  const cookieStore = await cookies();
  if (trimmed) {
    cookieStore.set("visitor", trimmed, { maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  } else {
    cookieStore.delete("visitor");
  }
  return {};
};
