import { getCollection } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export async function getStaticPaths() {
    const posts = await getCollection('blog');
    return posts.map((post) => ({
        params: { slug: post.id },
        props: { post },
    }));
}

export async function GET({ props }: { props: any }) {
    const { post } = props;

    return new ImageResponse(
        {
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '100%',
                    padding: '60px',
                    backgroundColor: '#f8f8ff',
                    fontFamily: 'sans-serif',
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            style: {
                                fontSize: '48px',
                                fontWeight: 'bold',
                                color: '#1e1b4b',
                                marginBottom: '24px',
                                lineHeight: 1.2,
                                maxWidth: '800px',
                            },
                            children: post.data.title,
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                fontSize: '24px',
                                color: '#4338ca',
                            },
                            children: 'offbyone.dev',
                        },
                    },
                ],
            },
        },
        { width: 1200, height: 630 }
    );
}