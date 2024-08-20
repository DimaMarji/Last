import React from 'react';

import {Col, Image, Row, Space, Text, Title} from "../../../../Components";
import "./style.scss"
import CalendarIcon from "../../../../public/Assets/Icons/Blogs/calendar2.svg"
import TimeIcon from "../../../../public/Assets/Icons/Blogs/timer1.svg"
import BackIcon from "../../../../public/Assets/Icons/Blogs/arrow_back.svg"
import moment from 'moment';
import {useAppMediaQuery} from "../../../../Hooks/MediaQuery/use-app-media-query";
import {useRouter} from "next/router";


const BlogDetailsHeaderContainer: React.FC<any> = ({
                                                       itemData
                                                   }) => {
    const {isMobileOrTablet} = useAppMediaQuery()
    const {push} = useRouter()
    return (
        <div className={"blog-details-header"}>
            <Row>
                <Col lg={11} className={"blog-details-text"}>
                    <div>
                        {isMobileOrTablet ? <Space className={"back-to-blogs"} onClick={() => {
                                push("/Blogs", "/blogs", {shallow: true});
                            }}>
                                <Image src={BackIcon} alt={"back arrow"}/>
                                <Text
                                    typographyType={{size: "16px-16px-16px", type: "semi-bold-semi-bold-semi-bold"}}
                                    typographyFontColor={"#1F83F4"}
                                >All Blog posts</Text></Space>

                            : <Text
                                typographyType={{size: "16px-14px-14px", type: "semi-bold-semi-bold-semi-bold"}}
                                typographyFontColor={"#1F83F4"}
                            >{!!itemData?.category ? itemData?.category : "General"}</Text>}
                        <Title typographyType={{size: "40px-20px-20px", type: "bold-semi-bold-semi-bold"}}
                               level={1}
                               className={"blog-details-title"}>
                            {itemData?.title}
                        </Title>
                        <Text typographyType={{type: "regular-regular-regular", size: "16px-14px-14px"}}
                              className={"blog-brief-description"}>
                            {/*TODO*/}
                            {itemData?.summary ?? (itemData?.description as string)?.slice(0, 150)}
                        </Text>
                    </div>
                    <Space>
                        <Space className={"blog-publish-info"}>
                            <Image src={CalendarIcon} alt={"publishing date"}/>
                            <Text typographyType={{type: "regular-regular-regular", size: "16px-14px-14px"}}>
                                {moment(itemData?.publishing_date).format("MMMM DD, YYYY")}
                            </Text>
                        </Space>
                        <Text typographyType={{type: "regular-regular-regular", size: "16px-14px-14px"}}>.</Text>
                        <Space className={"blog-publish-info"}>
                            <Image src={TimeIcon} alt={"reading time"}/>
                            <Text typographyType={{type: "regular-regular-regular", size: "16px-14px-14px"}}
                                  className={"blog-reading-time"}>
                                {itemData?.time_expected_reading} Minutes Read
                            </Text>
                        </Space>
                    </Space>
                </Col>
                <Col lg={{span: 12, offset: 1}}>
                    <Image
                        alt={itemData?.title}
                        className={"blog-details-image"}
                        // TODO
                        src={itemData?.lead_img ?? itemData?.img?.url}
                        height={300}
                        width={500}
                        fallback={"no preview"}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default BlogDetailsHeaderContainer;