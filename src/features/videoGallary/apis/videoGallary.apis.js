import axiosClient from "../../../configs/axios.config";

const VideoGallaryApis = {
    findAllApi: (page = 1) => {
        return axiosClient.get(`/gallary/video?page=${page}`);
    },
};

export default VideoGallaryApis;