import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(); // no authOptions needed
  return session?.user ?? null;
}
