import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      night: false,
      setNight: () => set((state) => ({ night: !state.night })),
      openModal: true,
      setOpen: () => set((state) => ({ openModal: !state.openModal })),
    }),
    {
      name: "app-settings", // unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAdmin: false, // Stores if the user is an admin
      isLoggedIn: false,

      // Action to log in the user
      login: (userInfo) => {
        return set({ user: userInfo, isAdmin: false, isLoggedIn: true });
      },

      // Action to log out the user
      logout: () => {
        set({ user: null, isAdmin: false, isLoggedIn: false });
      },

      // Check if user is admin
      checkAdmin: () => {
        const { user } = get();
        return user && user.role === "admin";
      },
    }),
    {
      name: "auth-storage", // unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],

      // Add a news item to the bookmarks
      addBookmark: (newsItem) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, newsItem],
        })),

      // Remove a news item from the bookmarks by id
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((item) => item.id !== id),
        })),

      // Check if a news item is bookmarked by id
      isBookmarked: (id) => {
        return get().bookmarks.some((item) => item.id === id);
      },

      // Clear all bookmarks
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: "bookmark-storage", // unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
