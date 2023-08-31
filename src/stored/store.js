import create from "zustand";
export const useStore = create((set) => ({
  user: undefined,
  loading: false,
  favouriteMovie: [],
  setUser: (newUser) =>
    set({
      user: newUser,
    }),
  setLoading: (newLoading) => set({ loading: newLoading }),
  setFavouriteMovie: (newMovie) =>
    set({
      favouriteMovie: newMovie,
    }),
}));
