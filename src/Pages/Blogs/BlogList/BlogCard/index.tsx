import React from 'react';
import {BlogCardProps} from "./interface";
import "./style.scss"
import {Card, Image, Paragraph, Text, Title} from "../../../../Components";
import {replaceSpacesWithDashes} from "../../../../Helpers/String/helpers";

import {useRouter} from 'next/router';
import moment from "moment";

const BlogCard: React.FC<BlogCardProps> = ({
                                               item,
                                               ...props
                                           }) => {
    const router = useRouter()

    const routeChange = (blogTitle: string) => {
        router.push(`/blogs/${replaceSpacesWithDashes(blogTitle)}`)
    }

    return (
        <Card
            {...props}
            hoverable={false}
            className={"blog-card"}
            key={item?.id}
            onClick={() => routeChange(item ? item.title : "")}
        >
            <div>
                <div className='blog-card-image'>
                    <Image
                        alt={item?.title}
                        src={item?.lead_img ?? (item as any)?.img?.url}
                        width={200}
                        height={150}
                        key={item?.id}
                    />
                </div>

                <Title
                    typographyType={{size: "18px-14px-14px", type: "semi-bold-semi-bold-semi-bold"}}
                    ellipsis
                    className={"blog-title"}>
                    {/*{item?.title?.length as number > 57 ? trimString(item?.title as string, 57) + ".." : */}
                    {item?.title}
                </Title>
                <Paragraph className={"blog-card-description"}
                           ellipsis={{rows: 3}}
                           typographyType={{size: "16px-14px-14px", type: "regular-regular-regular"}}
                >
                    {/*{item?.description?.length as number > 105 ?*/}
                    {/*trimString(item?.description as string, 105)*/}
                    {/*+ ".." :*/}
                    {item?.description ?? item?.summary}
                </Paragraph>


                <div className={"blog-card-category"}>
                    <Text typographyType={{size: "14px-12px-12px", type: "semi-bold-semi-bold-semi-bold"}}
                          typographyFontColor={"#1F83F4"}>{!!item?.category ? item?.category : "General"}</Text>
                    <Text typographyType={{size: "14px-12px-12px", type: "regular-regular-regular"}}>
                        {moment(item?.publishing_date).format("MMMM DD, YYYY")}
                    </Text>
                </div>

            </div>
        </Card>
    );
};

export default BlogCard;