import axios from "axios";

export const getStudentAPI = {
    getStudent: async (Id)/*: Promise<PokemonShortInfo[]>*/ => {
        const response = await axios.get(
            "https://192.168.1.187:7263/Student/" + Id
            );

        return response.data;
    },
};