import React, {useEffect} from 'react';
import "./style.scss"
import {replaceDashesWithSpaces, replaceSpacesWithDashes} from "../../../Helpers/String/helpers";
import BlogDetailsHeaderContainer from './BlogDetailsHeader';
import BlogDetailsBodyContainer from './BlogDetailsBody';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {isEmpty} from 'lodash';
import {UseHandle} from '../../../Hooks/ReactQuery/use-handle-response';
import {useRouter} from 'next/router';
import {usePageState} from "../../../Hooks/window/pageState/use-page-state";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton/blogDetailsSkeletonContainer";
import BlogRelatedBlogsSection from "./BlogRelatedBlogsSection/blogRelatedBlogsContainer";
import {Divider} from "../../../Components";
import {useAppMediaQuery} from "../../../Hooks/MediaQuery/use-app-media-query";
import {NextSeo} from "next-seo";
import {webSiteURL} from "../../../Layouts/SharedLayout/SEO/webSiteMetas";

const BlogDetailsContainer = ({data: blogDetailsData, error}:
                                  InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {handleError} = UseHandle()
    const {push} = useRouter()
    const {isMobileOrTablet} = useAppMediaQuery()

    const {loading} = usePageState()

    error && handleError(error)

    useEffect(() => {
        isEmpty(blogDetailsData) && push("/Error404")
    }, [])

    const dynamicMetaData = {
        title: `${blogDetailsData?.title ?? "blogs"} | Zcoderz`,
        description: blogDetailsData?.summary ?? blogDetailsData?.description,
        openGraph: {
            url: `${webSiteURL}/blogs/${replaceSpacesWithDashes(blogDetailsData?.title)}`,
            title: `${blogDetailsData?.title ?? "blogs"} | Zcoderz`,
            description: blogDetailsData?.summary ?? blogDetailsData?.description,
            images: [{url: blogDetailsData?.meta_img ?? blogDetailsData?.lead_img}],
        },
        additionalMetaTags: [
            {
                name: 'keywords',
                content: blogDetailsData?.title
            }
        ]
    };

    return (
        <>

            <NextSeo
                {...dynamicMetaData}
            />
            {!loading ?
                <div className={"blog-container"}>
                    {<>


                        <BlogDetailsHeaderContainer itemData={blogDetailsData}/>
                        <Divider className={"blog-divider"}/>
                        <BlogDetailsBodyContainer itemData={blogDetailsData}/>
                        {!isMobileOrTablet && !isEmpty(blogDetailsData) &&
                        <BlogRelatedBlogsSection blogId={blogDetailsData?.id}/>}
                    </>

                    }

                </div> : <BlogDetailsSkeleton/>}
        </>
    );
};



export const getServerSideProps: GetServerSideProps<{ data: any, error: any }> = async ({query, req}) => {

    const blogTitle: any = await replaceDashesWithSpaces(String(query.blogTitle)).split(" ").join('%20')

    try {
        const _res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}blogs/website/articles?title=${blogTitle}`);

        const data: any = await _res.json()

        return {
            props: {
                data: isEmpty(data.data.items) ? [] : data.data.items[0],
                error: !data.meta.success ? data?.meta : null
            },
        }

    } catch (error) {

        return {
            redirect: {
                permanent: false,
                destination: "/error"
            }
        };
    }
}

export default BlogDetailsContainer;