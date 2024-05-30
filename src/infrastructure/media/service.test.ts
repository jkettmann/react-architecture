import { Blob } from "fetch-blob";
import { FormData, File } from "formdata-node";
import { describe, test, expect, vitest } from "vitest";

import MediaService from "./service";

const mockMediaAPI = {
  uploadImage: vitest.fn((formData: FormData) => {
    const file = formData.get("image") as File;
    return Promise.resolve({
      data: {
        id: "1",
        type: "image" as const,
        attributes: {
          url: `https://example.com/${file.name}`,
        },
      },
    });
  }),
};

function createMockFile(name: string) {
  const byteCharacters = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const blob = new Blob([byteCharacters], { type: "image/png" });
  return new File([blob], name, { type: "image/png" });
}

describe("MediaService", () => {
  test("uploads and returns an image", async () => {
    const file = createMockFile("image.png");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const image = await MediaService.saveImage(file, mockMediaAPI);

    expect(mockMediaAPI.uploadImage).toHaveBeenCalled();
    expect(image).toEqual({
      id: "1",
      url: `https://example.com/${file.name}`,
    });
  });
});
