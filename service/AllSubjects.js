import axios from "axios";

export const subjectsAPI = {
    getSubjectsStudent: async (Id) => {
        const response = await axios.get(
            "https://192.168.1.187:7263/Student/dataAllSubjects/" + Id
            );

        return response.data;
    },
};