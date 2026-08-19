export type SavedPost = {
  slug: string;
  title: string;
  image: string | null;
  description: string | null;
  savedAt: number;
};

const STORAGE_KEY = "productwire-saved-posts";
export const SAVED_POSTS_EVENT = "productwire-saved-posts";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const getSavedPosts = (): SavedPost[] => {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedPost[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const isPostSaved = (slug: string): boolean =>
  getSavedPosts().some((post) => post.slug === slug);

export const toggleSavedPost = (
  post: Omit<SavedPost, "savedAt">
): boolean => {
  if (!canUseStorage()) {
    return false;
  }

  const current = getSavedPosts();
  const exists = current.some((item) => item.slug === post.slug);
  const next = exists
    ? current.filter((item) => item.slug !== post.slug)
    : [{ ...post, savedAt: Date.now() }, ...current];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SAVED_POSTS_EVENT));
  return !exists;
};
