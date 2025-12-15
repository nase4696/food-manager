import "server-only";
import { redirect } from "next/navigation";

import { getServerSession } from "./session"; // ← キャッシュ付きを利用

export async function requireSession() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
