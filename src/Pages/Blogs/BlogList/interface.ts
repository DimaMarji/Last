import {IGetAllBlogResponse} from "../../../API/ZcoderzApi/Interfaces/Blog/get-all-blogs";


export interface IBlogListProps {
    numOfItems?: number
    blogsData?: IGetAllBlogResponse[]
}