import httpRequest from "@/services/httpRequest";


export const getRecommendation =  (userId: string) => {
  return httpRequest.get(`/recommendations/${userId}`);
};