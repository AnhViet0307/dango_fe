import { IDish } from "@/interfaces/IDish";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  recommendations: IDish[];
};

type Action = {
  setRecommendations: (updatedRecommendations: IDish[]) => void;
};

export const useUserRecommendationStore = create(
  immer<State & Action>((set) => ({
    recommendations: [],
    setRecommendations: (updatedRecommendations: IDish[]) =>
      set((state) => {
        state.recommendations = updatedRecommendations;
      }),
  }))
);
