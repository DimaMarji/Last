import React from "react";
import {Title} from "../../../../Components";
import BlogListContainer from "../../BlogList";
import "./styles.scss"
import {useInView} from "react-intersection-observer";
import {useAppMediaQuery} from "../../../../Hooks/MediaQuery/use-app-media-query";
import {useBlog, useRelatedBlog} from "../../../../ReactQuery/Blog/blogsALL";
import {IBlogRelatedBlogsSection} from "./interface";

const BlogRelatedBlogsSection: React.FC<IBlogRelatedBlogsSection> = ({blogId}) => {
    const {isLargeDesktop} = useAppMediaQuery()
    const {ref, inView} = useInView({
        threshold: isLargeDesktop ? 0.3 : 0,
    });

    const {getAllEntities} = useRelatedBlog(blogId)
    // const {getAllEntities} = useBlog()

    //TODO
    const relatedBlogsData = getAllEntities?.data?.data?.items.slice(0, 3) ?? []

    return <>
        {relatedBlogsData?.length > 0 &&
            <div ref={ref} className={`related-blogs ${inView ? "related-blogs-in-view" : ""}`}>
                <Title typographyType={{size: "40px-20px-20px", type: "bold-semi-bold-semi-bold"}}
                       level={3}
                       className={"blog-details-title"}>
                    Related Blogs
                </Title>
                <BlogListContainer blogsData={relatedBlogsData}/>
            </div>}
    </>
}
export default BlogRelatedBlogsSection