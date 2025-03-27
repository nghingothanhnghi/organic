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
import SocialShare from '~/components/socialShare';

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
    const { articles, article, loading, error } = useAppSelector(state => state.articles);


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
                            className="text-xl sm:text-4xl md:text-6xl font-semibold text-orange-800 dark:text-white"
                        >
                            {article?.title}
                        </h1>


                        <div className="flex items-center gap-4 mt-10">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                                className="size-16 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="text-lg font-medium ">Claire Mac</h3>

                                <div className="flow-root">
                                    <ul className="-m-1 flex flex-wrap">
                                        <li className="p-1 leading-none">
                                            <PublishedDate date={article?.publishedAt} />
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        {/* Divider */}
                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        {/* Thumbnail */}
                        <div className="w-full mb-8"> {/* Ensures full width */}
                            <ArticleThumb article={article} className="w-full rounded-xl shadow" />
                        </div>
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.description || '' }}
                        />
                        {/* Divider at the bottom */}
                        <hr className="my-10 border-gray-300 dark:border-gray-700" />
                        <SocialShare
                            url={window.location.origin + `/articles/${slug}`}
                            title={article?.title}
                            description={article?.description}
                            position="fixed right-center"
                            direction="col"
                        />

                        <div className='w-full my-5'>
                            {previousArticle && (
                                <Link
                                    to={`/articles/${previousArticle.slug}`}
                                    className='flex flex-col space-y-2 items-start p-4'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>

                                    <h5 className='text-xl'>{previousArticle.title}</h5>
                                </Link>
                            )}
                            {nextArticle && (
                                <Link
                                    to={`/articles/${nextArticle.slug}`}
                                    className='flex flex-col space-y-2 items-end p-4'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>

                                    <h5 className='text-xl'>{nextArticle.title}</h5>
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
