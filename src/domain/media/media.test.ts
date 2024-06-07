import { describe, expect, it } from "vitest";

import { getImageById } from "./media";

const mockImage = {
  id: "1",
  url: "test",
};

describe("Media domain", () => {
  describe("getImageById", () => {
    it("should be able to get image by id", () => {
      const image = getImageById([mockImage], "1");
      expect(image).toEqual(mockImage);
    });

    it("should return undefined if image is not found", () => {
      const image = getImageById([{ ...mockImage, id: "2" }], "1");
      expect(image).toEqual(undefined);
    });

    it("should return undefined if provided images are not defined", () => {
      const image = getImageById(undefined, "1");
      expect(image).toEqual(undefined);
    });

    it("should return undefined if provided image id is not defined", () => {
      const image = getImageById([mockImage], undefined);
      expect(image).toEqual(undefined);
    });
  });
});
