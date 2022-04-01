import api from "api";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query({
      query: () => "v1/portal/songs",
    }),
  }),
});

export const { useGetSongsQuery } = extendedApi;

export default extendedApi;