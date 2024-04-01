import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const getAllSamOrders = createApi({
    reducerPath: "samOrders",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
    }),
    tagTypes: ["GET_ALL_SAM_ORDERS"],
    endpoints: (builder) => ({
        getOders: builder.query(
            {
                query: () => (
                    {
                        url: "showAcitvity",
                        method: "GET",

                    }

                ),
                providesTags: ["GET_ALL_SAM_ORDERS"]

            }
        ),

        //add
        addOder: builder.mutation(
            {
                query: (activity) => ({
                    url: "addActivity",
                    method: 'POST',
                    body: activity
                }),
                invalidatesTags: ["GET_ALL_SAM_ORDERS"]
            }),
        //update
        updateOder: builder.mutation(
            {
                query: (activity) => ({
                    url: "updateActivity",
                    method: 'POST',
                    body: activity
                }),
                invalidatesTags: ["GET_ALL_SAM_ORDERS"]
            }
        ),
        deleteOder: builder.mutation(
            {
                query: (id) => (
                    {
                        url: `deleteAcitvity/${id}`,
                        method: "POST",
                    })
            }),
        invalidateTags: ["GET_ALL_SAM_ORDERS"]



    })
});
export const { useGetOdersQuery, useDeleteOderMutation, useAddOderMutation } = getAllSamOrders;
