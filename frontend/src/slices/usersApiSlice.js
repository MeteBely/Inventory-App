import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["User"],
    }),
    createSampleUser: builder.mutation({
      query: () => ({
        url: USERS_URL,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useCreateSampleUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = usersApiSlice;
