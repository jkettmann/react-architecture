import { Blob } from "fetch-blob";
import { File } from "formdata-node";

export function createMockFile(name: string) {
  const byteCharacters = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const blob = new Blob([byteCharacters], { type: "image/png" });
  return new File([blob], name, { type: "image/png" });
}
