import {CardProps} from "antd";
import {IBlogDetails} from "../../../../API/ZcoderzApi/Interfaces/Blog/get-blog-details";


export interface BlogCardProps extends CardProps {
    item?: IBlogDetails,
}