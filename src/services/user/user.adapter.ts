import { User } from "@/domain/user";
import { GetUserApi, GetUserParams } from "./user.interfaces";

export function getUser(
  api: GetUserApi,
  params: GetUserParams
): Promise<User> {}
