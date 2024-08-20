import {Image, Row, Space, Text} from "../../../Components";
import searchNotFound from "../../../public/Assets/Images/Blogs/search-not-found.svg";
import React from "react";

export const noBlogsInCategory = (category: string) => <Row justify={"center"}>
    <Space direction={"vertical"} align={"center"}>
        <Image src={searchNotFound} className={"search-not-found"} alt={"searchNotFound"}
               width={"83%"} height={"83%"}
        />
        <Text typographyFontColor={"#232736"}
              typographyType={{size: "20px-20px-20px", type: "regular-regular-regular"}}>
            We are sorry, but there is no blogs related to <span style={{color: "#1F83F4"}}>{category}</span> yet!.
        </Text>
        <br/>

    </Space>
</Row>