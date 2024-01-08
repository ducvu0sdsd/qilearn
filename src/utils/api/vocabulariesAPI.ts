import useSWR from "swr";
import { TypeHTTP, api } from "./api";
import { GrammarInterface, WordInterface } from "@/components/context/interfaces";

export const getAllVocabulariesByUserID: (id: string) => { data: WordInterface[], isLoading: boolean } = (id: string) => {
    const fetcher = (url: string) => api({ path: url, type: TypeHTTP.GET }).then(res => res);
    const { data, error, isLoading } = useSWR(`/vocabularies/${id}`, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    });
    return {
        data: (data as WordInterface[]) || [],
        isLoading: isLoading
    }
}

export const getAllGrammarsByUserID: (id: string) => GrammarInterface[] = (id: string) => {
    const fetcher = (url: string) => api({ path: url, type: TypeHTTP.GET }).then(res => res);
    const { data, error, isLoading } = useSWR(`/grammars/${id}`, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    });
    return (data as GrammarInterface[]) || []
}