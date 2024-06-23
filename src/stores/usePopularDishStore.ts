import { IDish } from "@/interfaces/IDish";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  dish: IDish | null;
  dishes: IDish[];
  filteredDishes: IDish[] | null;
  sortBy: string;
};

type Action = {
  setDish: (updatedDish: IDish) => void;
  setDishes: (updatedDishes: IDish[]) => void;
  setFilteredDishes: (updatedDishes: IDish[] | null) => void;
  setSortBy: (value: string) => void;
};

export const usePopularDishStore = create(
  immer<State & Action>((set) => ({
    dish: null,
    dishes: [],
    filteredDishes: null,
    sortBy: "low",
    setDish: (updatedDish: IDish) =>
      set((state) => {
        state.dish = updatedDish;
      }),
    setDishes: (updatedDishes: IDish[]) =>
      set((state) => {
        state.dishes = updatedDishes;
      }),
    setFilteredDishes: (updatedDishes: IDish[] | null) =>
      set((state) => {
        state.filteredDishes = updatedDishes;
      }),
    setSortBy: (value: string) =>
      set((state) => {
        state.sortBy = value;
      }),
  }))
);
