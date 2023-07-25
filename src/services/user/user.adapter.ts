import { User } from "@/domain/user";
import { GetUserApi } from "./user.interfaces";

export function getUser(api: GetUserApi, handle: string): Promise<User> {}
