import videoGallaryApis from "../apis/videoGallary.apis";

const VideoGallaryServices = {
    getAllResults: async () => {
        try {
            return await videoGallaryApis.findAllApi();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default VideoGallaryServices;