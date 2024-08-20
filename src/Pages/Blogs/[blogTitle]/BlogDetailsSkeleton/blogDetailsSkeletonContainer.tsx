import React from "react";
import {Col, Image, Row, Skeleton} from "../../../../Components";
import FallbackImage from "../../../../public/Assets/Images/General/transparent-box.svg"
import "./styles.scss"

const BlogDetailsSkeleton: React.FC = () => {
    return <div>
        <Row className={"blog-details-header"}>
            <Col lg={11} className={"blog-details-text"}>
                <div className={"blog-description-skeleton"}>
                    <Skeleton title={{width: "25%"}} active round={false}
                              paragraph={{rows: 3, width: ["85%", "76%", "70%"]}}/>
                    <Skeleton title={false} active round={false}
                              paragraph={{rows: 2, width: ["85%", "26%"]}}/>
                </div>
                <Skeleton title={false} paragraph={{rows: 2, width: ["35%", "36%"]}} className={"blog-info-skeleton"}/>

            </Col>

            <Col lg={{span: 12, offset: 1}}>
                <Image
                    className={"blog-details-image"}
                    src={FallbackImage}
                    alt='fall back'
                    width={400}
                    height={300}
                />
            </Col>
        </Row>
        <Skeleton title={{width: "100%"}} active round={false}
                  paragraph={{rows: 3, width: ["100%", "100%", "90%"]}}
                  style={{marginBottom: "64px"}}/>
        <Skeleton title={false} active round={false}
                  paragraph={{rows: 3, width: ["100%", "100%", "90%"]}}
                  style={{marginBottom: "64px"}}/>
        <Skeleton title={false} active round={false}
                  paragraph={{rows: 3, width: ["100%", "100%", "90%"]}}
                  style={{marginBottom: "64px"}}/>
        <Skeleton title={false} active round={false}
                  paragraph={{rows: 3, width: ["100%", "100%", "90%"]}}
                  style={{marginBottom: "62px"}}/>


    </div>
}

export default BlogDetailsSkeleton