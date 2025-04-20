// app/components/LocationSearchModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchStores, setFilters } from '~/features/storeSlice';

interface LocationSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCity: string | null;
}

const LocationSearchModal: React.FC<LocationSearchModalProps> = ({ isOpen, onClose, selectedCity }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useAppDispatch();
    const { stores, loading, error } = useAppSelector(state => state.stores);

    useEffect(() => {
        if (selectedCity) {
            dispatch(setFilters({ city: selectedCity }));
            dispatch(fetchStores({ city: selectedCity }));
        }
    }, [selectedCity, dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const getFilteredResults = () => {
        return stores.filter(store => {
            const fullAddress = `${store.attributes.address}, ${store.attributes.district}, ${store.attributes.state}`;
            return fullAddress.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedCity}
            size="small"
            content={
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    <div className="mt-4">
                        {getFilteredResults().map((store, index) => (
                            <div key={index} className="p-2 border-b">
                                {store.attributes.storeName} - {store.attributes.address}
                            </div>
                        ))}
                    </div>
                </div>
            }
            actions={
                <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Close
                </button>
            }
        />
    );
};

export default LocationSearchModal;
