"use client";

import { useEffect } from "react";
import { emitHomepageEvent } from "../analytics";

/** Emits `page.viewed.v1` once on mount. No-op stub — see analytics.ts. */
export function PageViewBeacon() {
  useEffect(() => {
    emitHomepageEvent({ type: "page.viewed.v1", pageId: "homepage" });
  }, []);
  return null;
}
