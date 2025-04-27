import axiosClient from "../../../configs/axios.config";

const VisitorCounterApis = {
    findAllApi: () => {
        return axiosClient.get("/visitWebsite");
    },
};

export default VisitorCounterApis;