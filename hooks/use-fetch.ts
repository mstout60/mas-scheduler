/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useTransition } from "react";

const useFetch = (action: (...args: any[]) => Promise<any>) => {
    const [isLoading, startTransition] = useTransition();
    const [hasError, setHasError] = useState<boolean>(false);
    const [data, setData] = useState<any | undefined>(undefined);

    const clearError = () => setHasError(false);

    const fn = (..._args: any[]) => new Promise<{ data?: any; } | void>((resolve) => {
        startTransition(async () => {
            try {
                clearError();

                const data = await action(..._args);
                resolve({ data });
                setData(data);
            } catch (error) {
                setHasError(true);
                setData(undefined);
                resolve();
            }
        });
    });

    //return [fn, { isLoading, hasError, data }, clearError] as const;
    return { isLoading, hasError, data, fn }
};

export default useFetch;