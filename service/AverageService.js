import axios from "axios";

export const averageAPI = {
    getAverageStudent: async (Id) => {
        const response = await axios.get(
            "https://192.168.1.187:7263/Student/average/" + Id
            );

        return response.data;
    },
};