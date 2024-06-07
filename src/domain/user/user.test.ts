import { describe, expect, it } from "vitest";

import { getUserById } from "./user";

const mockUser = {
  id: "1",
  handle: "test",
  avatar: "test",
  numShoutsPastDay: 0,
  blockedUserIds: [],
  followerIds: [],
};

describe("User domain", () => {
  describe("getUserById", () => {
    it("should be able to get user by id", () => {
      const user = getUserById([mockUser], "1");
      expect(user).toEqual(mockUser);
    });

    it("should return undefined if user is not found", () => {
      const user = getUserById([{ ...mockUser, id: "2" }], "1");
      expect(user).toEqual(undefined);
    });

    it("should return undefined if provided users are not defined", () => {
      const user = getUserById(undefined, "1");
      expect(user).toEqual(undefined);
    });

    it("should return undefined if provided user id is not defined", () => {
      const user = getUserById([mockUser], undefined);
      expect(user).toEqual(undefined);
    });
  });
});
