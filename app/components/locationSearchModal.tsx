// app/components/LocationSearchModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchStores, setFilters } from '~/features/storeSlice';
import LoadingErrorWrapper from "./LoadingErrorWrapper";
import { useTranslation } from "react-i18next";

interface LocationSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedState: string | null;
}

const LocationSearchModal: React.FC<LocationSearchModalProps> = ({ isOpen, onClose, selectedState }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useAppDispatch();
    const { stores, loading, error } = useAppSelector(state => state.stores);

    useEffect(() => {
        if (selectedState) {
            dispatch(setFilters({ state: selectedState })); // Update filter to use state
            dispatch(fetchStores({ state: selectedState })); // Update fetchStores to use state
        }
    }, [selectedState, dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setIsSearching(true);
        // Simulate a delay for the search operation
        setTimeout(() => {
            setIsSearching(false);
        }, 500); // Adjust the delay as needed
    };

    const getFilteredResults = () => {
        return stores.filter(store => {
            const { storeName, address, district, state } = store;
            const fullAddress = `${address}, ${district}, ${state}`;
            return (
                storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    };

    const filteredResults = getFilteredResults();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedState}
            size="small"
            content={
                <div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t("placeholder_message.search.message_03")}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full h-10 rounded border-gray-300 text-sm"
                        />
                        {isSearching && (
                            <svg
                                className="animate-spin h-4 w-4 text-gray-500 dark:text-gray-600 absolute right-2 top-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        )}
                    </div>

                    <LoadingErrorWrapper loading={loading} error={error}>
                        <div className="mt-4">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((store, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-900 rounded-full flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>

                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-bold text-lg text-gray-800">{store.storeName}</div>
                                            <div className="text-sm text-gray-600">{store.address}</div>
                                        </div>
                                        <div className="ml-auto flex items-center justify-center p-2 transition duration-200">
                                            <button className="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mx-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                                </svg>

                                                <h6 className="text-xs">Direction</h6>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 mt-4">
                                    No stores found for the selected state or search query.
                                </div>
                            )}
                        </div>
                    </LoadingErrorWrapper>
                </div>
            }
            actions={
                <button onClick={onClose} className="px-4 py-2 text-white rounded shadow-md hover:shadow-lg bg-orange-900 hover:bg-orange-800">
                    {t("btn.cancel")}
                </button>
            }
        />
    );
};

export default LocationSearchModal;
