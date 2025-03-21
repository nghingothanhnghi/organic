import React, { useEffect, useState } from 'react';
import type { Route } from "./+types/articleDetail";
import { useParams, Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchArticleBySlug, fetchArticles } from '~/features/articleSlice';
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
    const {articles, article, loading, error } = useAppSelector(state => state.articles);


    useEffect(() => {
        if (slug) {
            dispatch(fetchArticleBySlug(slug));
        }
    }, [slug, dispatch]);


    useEffect(() => {
        dispatch(fetchArticles({ page: 1, pageSize: 10 })); // Fetch articles list
    }, [dispatch]);

          // ✅ Ensure articles are available before searching
    const currentIndex = articles?.findIndex(a => a.slug === slug) ?? -1;
    const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

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
                        <div className="w-full mb-8"> {/* Ensures full width */}
                            <ArticleThumb article={article} className="w-full rounded-xl shadow" />
                        </div>

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            {stripHtml(article.description || '')}
                        </p>


                        <div className='w-full my-5'>
                            {previousArticle && (
                                <Link
                                    to={`/articles/${previousArticle.slug}`}
                                    className='flex flex-col items-start p-4'
                                >
                                    <small className='block'> ⬅ </small>
                                    <h5 className=''>{previousArticle.title}</h5>
                                </Link>
                            )}
                            {nextArticle && (
                                <Link
                                    to={`/articles/${nextArticle.slug}`}
                                    className='flex flex-col items-end p-4'
                                >
                                    <small className='blockd'> ➡ </small>
                                    <h5 className=''>{nextArticle.title}</h5>
                                </Link>
                            )}
                        </div>

                    </div>
                </section>
            ) : (
                <p>Article not found</p>
            )}
        </LoadingErrorWrapper>
    );
};

export default ArticleDetail;
