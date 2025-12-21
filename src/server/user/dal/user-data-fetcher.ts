import "server-only";

import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

function UserDTO(user: User) {
  return {
    name: user.name,
    id: user.id,
    email: user.email,
  };
}

export async function UserCreate(params: {
  name: string;
  email: string;
  hashedPassword: string;
}) {
  const user = await prisma.user.create({
    data: {
      name: params.name,
      email: params.email,
      password: params.hashedPassword,
    },
  });

  return UserDTO(user);
}
