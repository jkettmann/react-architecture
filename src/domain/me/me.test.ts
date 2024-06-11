import { describe, expect, it } from "vitest";

import { isAuthenticated, hasExceededShoutLimit } from "./me";

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

  describe("hasExceededShoutLimit", () => {
    it("should be false if numShoutsPastDay is less than MAX_NUM_SHOUTS_PER_DAY", () => {
      expect(hasExceededShoutLimit(mockMe)).toEqual(false);
    });

    it("should be true if numShoutsPastDay is equal to MAX_NUM_SHOUTS_PER_DAY", () => {
      const me = { ...mockMe, numShoutsPastDay: 5 };
      expect(hasExceededShoutLimit(me)).toEqual(true);
    });

    it("should be true if numShoutsPastDay is greater than MAX_NUM_SHOUTS_PER_DAY", () => {
      const me = { ...mockMe, numShoutsPastDay: 6 };
      expect(hasExceededShoutLimit(me)).toEqual(true);
    });
  });
});
