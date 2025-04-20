// app/components/LocationSearchModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchStores, setFilters } from '~/features/storeSlice';

interface LocationSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedState: string | null;
}

const LocationSearchModal: React.FC<LocationSearchModalProps> = ({ isOpen, onClose, selectedState }) => {
    const [searchQuery, setSearchQuery] = useState("");
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
    };

    const getFilteredResults = () => {
        return stores.filter(store => {
            const { address, district, state } = store;
            const fullAddress = `${address}, ${district}, ${state}`;
            return (
                address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedState}
            size="small"
            content={
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full h-10 rounded border-gray-300 text-sm"
                    />
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    <div className="mt-4">
                        {getFilteredResults().map((store, index) => (
                            <div key={index} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-map-marker-alt"></i> {/* FontAwesome icon */}
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-gray-800">{store.storeName}</div>
                                    <div className="text-sm text-gray-600">{store.address}</div>
                                </div>
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
