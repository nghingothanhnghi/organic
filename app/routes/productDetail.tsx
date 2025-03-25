import React, { useEffect, useState } from 'react';
import type { Route } from "./+types/productDetail";
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchProductBySlug } from '~/features/productSlice';
import ProductThumb from "~/components/productThumb";
import ProductPrice from "~/components/productPrice";
import ProductReviewForm from "~/components/productReviewForm";
import ProductRating from "~/components/productRating";
import ProductActions from '~/components/productActions';
import ProductVariantSelector from '~/components/productVariantSelector';
import LoadingErrorWrapper from '~/components/LoadingErrorWrapper';
import { useTranslation } from 'react-i18next';
import { stripHtml } from '~/utils/stripHtml';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Deatil" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

const ProductDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { product, loading, error } = useAppSelector(state => state.products);
    const cartItems = useAppSelector(state => state.cart.items);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    // Default to the first variant or the isDefault variant
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

    // Set default variant once product is available
    useEffect(() => {
        if (product?.variants?.length) {
            const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
            setSelectedVariantId(defaultVariant?.id || null);
        }
    }, [product]); // Runs when product is updated

    const handleVariantChange = (variantId: number) => {
        setSelectedVariantId(variantId);
    };

    const selectedVariant = product?.variants?.find((variant) => variant.id === selectedVariantId);

    // If slug is undefined, early return or provide fallback
    if (!slug) {
        return <p>Product not found</p>;
    }

    useEffect(() => {
        dispatch(fetchProductBySlug(slug));
    }, [dispatch, slug]);

    return (
        <LoadingErrorWrapper loading={loading} error={error}>
            {product ? (
                <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                <div className="columns-2 md:columns-2 gap-4 space-y-4">
                                    <ProductThumb product={product} className="w-full rounded-xl shadow" />
                                </div>
                            </div>
                            <div className="mt-6 sm:mt-8 lg:mt-0">
                                <h1
                                    className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                >
                                    {product?.name}
                                </h1>
                                <ProductRating product={product} singleStarView={true}/>
                                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                    <p
                                        className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                    >
                                        <ProductPrice product={product!} variant={selectedVariant} />
                                    </p>
                                </div>
                                {product?.variants && product.variants.length > 0 && (
                                    <div className="my-4">
                                        <ProductVariantSelector
                                            variants={product.variants}
                                            selectedVariantId={selectedVariantId}
                                            onVariantChange={handleVariantChange}
                                        />
                                    </div>
                                )}

                                <ProductActions
                                    product={product}
                                    selectedQuantity={selectedQuantity}
                                    setSelectedQuantity={setSelectedQuantity}
                                    cartItems={cartItems}
                                />
                                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                                <p className="mb-6 text-gray-500 dark:text-gray-400">
                                    {stripHtml(product.description || '')}
                                </p>
                                {/* Add the ProductReviewForm */}
                                <div className="mt-12">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">{t("section_title.view_by-add_review.user_review")}</h2>
                                    <ProductReviewForm productId={product.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <p>Product not found</p>
            )}
        </LoadingErrorWrapper>
    );
};

export default ProductDetail;
