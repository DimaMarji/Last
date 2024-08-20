import React from "react";
import {Card, Skeleton} from "../../../../Components";
import Image from "next/image";
import FallbackImage from "../../../../public/Assets/Images/General/fallback-image.svg";
import "./styles.scss"

const BlogCardSkeleton: React.FC = () => {
    return <Card
        className={"blog-card blog-card-skeleton"}>
        <div>
            <Image
                src={FallbackImage}
                alt='FallbackImage'
            />
            <Skeleton title={{width: "90%"}} active paragraph={false}
            />
            <Skeleton title={false} active paragraph={{rows: 3, width: ["92%", "95%", "58%"]}}
            />
            <Skeleton className={"blog-card-footer"} title={false} active paragraph={{rows: 2, width: ["30%", "35%"]}}
            />
        </div>

    </Card>


}

export default BlogCardSkeleton