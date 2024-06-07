import { describe, expect, it } from "vitest";

import { isAuthenticated } from "./me";

const mockMe = {
  id: "1",
  handle: "test",
  avatar: "test",
  numShoutsPastDay: 0,
  blockedUserIds: [],
  followerIds: [],
};

describe("Me domain", () => {
  describe("isAuthenticated", () => {
    it("should be true is me is defined", () => {
      expect(isAuthenticated(mockMe)).toEqual(true);
    });

    it("should be false if me is not defined", () => {
      expect(isAuthenticated(undefined)).toEqual(false);
    });
  });
});
