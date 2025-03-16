import axiosClient from "../../../configs/axios.config";

const VideoGallaryApis = {
    findAllApi: () => {
        return axiosClient.get("/gallary/video");
    },
};

export default VideoGallaryApis;