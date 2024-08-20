import React, {useState} from 'react';
import "./style.scss"
import {Button, Col, Image, Row, Space, Text} from "../../../../Components";
import {useAppMediaQuery} from "../../../../Hooks/MediaQuery/use-app-media-query";
import {BackTop} from "antd";
import ArrowUp from "../../../../public/Assets/Icons/Blogs/arrow-up.svg"
import {AffixCard} from "../../../../SharedComponent/AffixCard";
import {copyToClipboard} from "../../../../Helpers/TextOperation";
import {webSiteURL} from "../../../../Layouts/SharedLayout/SEO/webSiteMetas";
import {useRouter} from "next/router";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

const BlogDetailsBodyContainer: React.FC<any> = ({
                                                     itemData,
                                                 }) => {
    const {isMobileOrTablet} = useAppMediaQuery()
    const {asPath} = useRouter()

    const shareLink = webSiteURL + asPath

    const [openMessage, setOpenMessage] = useState<"success" | "error">()

    const messageContainer = (status: "success" | "error") => {
        return <Space className={"copy-to-clipboard-message"}>
            {status == "success" ? <CheckCircleOutlined/> : <CloseCircleOutlined/>}
            <Text typographyType={{size: "14px-14px-14px", type: "regular-regular-regular"}}>
                {status == "success" ? "Copied To Clipboard!" : "Error copying to clipboard!"}
            </Text>
        </Space>
    }


    const closeMessage = () => {
        const timer = setTimeout(() => {
            setOpenMessage(undefined)
        }, 2000)
        return () => clearTimeout(timer);
    }


    return (
        <Row className={"blog-body-details"}>
            <Col lg={15} xl={{span: 16}} sm={24} xs={24}>
                <div className={"blog-description-details"}
                     dangerouslySetInnerHTML={itemData ? {__html: itemData?.detailed_description} : {__html: ""}}
                />
            </Col>
            <Col sm={24} xs={24} lg={{span: 8, offset: 1}} xl={{span: 7, offset: 1}}>
                <AffixCard type={"share"}
                           applyButton={<div>
                               {openMessage && messageContainer(openMessage)}
                               <Button onClick={() => {
                                   copyToClipboard(shareLink, () => {
                                       setOpenMessage("success")
                                       closeMessage()
                                   }, () => {
                                       setOpenMessage("error")
                                       closeMessage()
                                   })
                               }}>Copy link</Button></div>}/>
            </Col>
            {!isMobileOrTablet && <BackTop duration={300}>
                <div className={"blog-back-top"}>
                    <Image src={ArrowUp}
                           width={24}
                           height={24}
                           alt={"up-arrow"}/>
                </div>
            </BackTop>}
        </Row>
    );
};

export default BlogDetailsBodyContainer;