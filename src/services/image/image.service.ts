import * as adapter from "./image.adapter";
import * as api from "./image.api";
import { CreateImageParams } from "./image.interfaces";

export async function createImage(params: CreateImageParams) {
  return adapter.createImage(api.createImage, params);
}
