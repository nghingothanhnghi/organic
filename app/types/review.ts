// app/types/review.ts
// Define types for the reviews and the state
export interface Review {
    id: number;
    score: number;
    reviewText: string;
    users_permissions_user: {
        data: {
            username: string;
        };
    };
}

export interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
    success: string | null,
}