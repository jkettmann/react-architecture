import * as adapter from "./feed.adapter";
import * as api from "./feed.api";

export function getFeed() {
  return adapter.getFeed(api.getFeed);
}
