import * as React from 'react';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import BaseLayout from '../base';
import { getComponent } from '../../components-registry';

// TODO cleanup, have interface
export default function PostPageLayout(props) {
    const { page, site } = props;
    const sections = page.bottomSections || [];
    const dateTimeAttr = dayjs(page.date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(page.date).format('MMMM D, YYYY');

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-post-layout">
                <article className="colors-a px-4 sm:px-8 py-14 lg:py-20">
                    <div className="max-w-screen-2xl mx-auto">
                        <header className="max-w-screen-md mx-auto mb-12 text-center">
                            <div className="text-lg mb-4">
                                <time dateTime={dateTimeAttr} data-sb-field-path="date">
                                    {formattedDate}
                                </time>
                            </div>
                            {page.title && <h1 data-sb-field-path="title">{page.title}</h1>}
                            <PostAttribution post={page} />
                        </header>
                        {page.markdown_content && (
                            <Markdown
                                options={{ forceBlock: true }}
                                className="sb-markdown max-w-screen-md mx-auto"
                                data-sb-field-path="markdown_content"
                            >
                                {page.markdown_content}
                            </Markdown>
                        )}
                    </div>
                </article>
                {sections.length > 0 && (
                    <div data-sb-field-path="bottomSections">
                        {sections.map((section, index) => {
                            const Component = getComponent(section.type);
                            if (!Component) {
                                throw new Error(
                                    `no component matching the page section's type: ${section.type}`
                                );
                            }
                            return (
                                <Component
                                    key={index}
                                    {...section}
                                    data-sb-field-path={`bottomSections.${index}`}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </BaseLayout>
    );
}

function PostAttribution({ post }) {
    if (!post.author && !post.category) {
        return null;
    }
    const author = post.author ? postAuthor(post.author) : null;
    return (
        <div className="mt-6 text-lg">
            {author && (
                <>
                    {'By '}
                    {author}
                </>
            )}
        </div>
    );
}

function postAuthor(author) {
    const children = (
        <>
            {author.firstName && <span data-sb-field-path=".firstName">{author.firstName}</span>}{' '}
            {author.lastName && <span data-sb-field-path=".lastName">{author.lastName}</span>}
        </>
    );
    /*
    return author.slug ? (
        <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
            {children}
        </Link>
    ) : (
        <span data-sb-field-path="author">{children}</span>
    );*/
    return <span data-sb-field-path="author">{children}</span>;
}
