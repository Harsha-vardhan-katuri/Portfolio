/**
 * Bump this whenever the home background visuals change.
 * It is used as a React `key` (forces a fresh canvas/shader, never a stale one)
 * and as a cache-busting suffix so the preview can't reuse an old layer.
 */
export const BACKGROUND_VERSION = "topography-v3";

/** Stored preference key, versioned so old saved values never leak in. */
export const BACKGROUND_PREF_KEY = `home-bg:${BACKGROUND_VERSION}`;

/** Remove preference keys written by previous background versions. */
export const purgeStaleBackgroundPrefs = () => {
  try {
    for (let i = localStorage.length - 1; i >= 0; i -= 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith("home-bg:") && key !== BACKGROUND_PREF_KEY) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    /* storage unavailable — nothing to clean */
  }
};
