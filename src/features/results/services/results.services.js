import ResultsApis from "../apis/results.apis";

const ResultsServices = {
    getAllResults: async (page = 1, pageSize = 100) => {
        try {
            const response = await ResultsApis.findAllApi(page, pageSize);
            const data = response?.data;

            let results =
                data?.results ||
                data?.data ||
                (Array.isArray(data) ? data : []);
            const totalCount = data?.count;

            // If backend has pagination with more pages (next link or results length < totalCount), fetch all remaining pages
            if (
                totalCount &&
                Array.isArray(results) &&
                results.length < totalCount &&
                data?.next
            ) {
                const perPage = results.length || 9;
                const totalPages = Math.ceil(totalCount / perPage);
                const fetchPromises = [];

                for (let p = 2; p <= totalPages; p++) {
                    fetchPromises.push(
                        ResultsApis.findAllApi(p, pageSize).catch(() => null)
                    );
                }

                const remainingResponses = await Promise.all(fetchPromises);
                for (const res of remainingResponses) {
                    const pageResults =
                        res?.data?.results ||
                        res?.data?.data ||
                        (Array.isArray(res?.data) ? res?.data : []);
                    if (Array.isArray(pageResults)) {
                        results = results.concat(pageResults);
                    }
                }

                if (data?.results) {
                    data.results = results;
                } else if (data?.data) {
                    data.data = results;
                }
            }

            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
    getOneResults: async (id) => {
        try {
            return await ResultsApis.findOne(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default ResultsServices;