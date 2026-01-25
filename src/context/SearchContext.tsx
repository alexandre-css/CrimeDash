import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <SearchContext.Provider
            value={{ searchTerm, setSearchTerm, isSearchOpen, setIsSearchOpen }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
