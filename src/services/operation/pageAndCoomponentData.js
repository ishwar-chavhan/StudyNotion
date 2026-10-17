import { toast } from 'react-toastify';
import { catalogDataEndpoint } from '../apis';
import { apiConnector } from '../apiconnector';

const { CATALOGPAGEDATA_API } = catalogDataEndpoint;

const getCatalogPageData = async (categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading catalog...");
    try {
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
            categoryId,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch catalog page data");
        }
        result = response?.data;
    } catch (error) {
        toast.error("Could not load catalog data");
    }
    toast.dismiss(toastId);
    return result;
};

export default getCatalogPageData;
