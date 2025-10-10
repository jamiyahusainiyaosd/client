import videoGallaryApis from "../apis/videoGallary.apis";

const VideoGallaryServices = {
    getAllResults: async (page = 1) => {
        try {
            const response = await videoGallaryApis.findAllApi(page);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default VideoGallaryServices;