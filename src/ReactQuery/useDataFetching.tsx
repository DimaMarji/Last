import {useQuery} from 'react-query';
import {axiosGet} from "../api/apiConfig";

export const useDataFetching = (
    key: string | [string, any],
    serviceName: string,
    config?: any
) => {
    return useQuery(
        key,
        () => axiosGet(serviceName),
        config
    );
};
