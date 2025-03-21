import React, { useEffect, useState } from 'react';
import type { Route } from "./+types/articleDetail";
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchArticleBySlug } from '~/features/articleSlice';
import LoadingErrorWrapper from '~/components/LoadingErrorWrapper';
import { useTranslation } from 'react-i18next';
import { stripHtml } from '~/utils/stripHtml';
import ArticleThumb from '~/components/article/articleThumb';
import PublishedDate from '~/components/article/publishedDate';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Deatil" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

const ArticleDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { article, loading, error } = useAppSelector(state => state.articles);


    useEffect(() => {
        if (slug) {
            dispatch(fetchArticleBySlug(slug));
        }
    }, [slug, dispatch]);

    return (
        <LoadingErrorWrapper loading={loading} error={error}>
            {article ? (
                <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                    <div className="max-w-3xl mx-auto px-4 lg:px-0">
                        <h1
                            className="text-xl sm:text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white"
                        >
                            {article?.title}
                        </h1>

                        <PublishedDate date={article?.publishedAt} />

                        {/* Divider */}
                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        {/* Thumbnail */}
                        <div className="w-full"> {/* Ensures full width */}
                            <ArticleThumb article={article} className="w-full rounded-xl shadow" />
                        </div>

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            {stripHtml(article.description || '')}
                        </p>

                    </div>
                </section>
            ) : (
                <p>Article not found</p>
            )}
        </LoadingErrorWrapper>
    );
};

export default ArticleDetail;
