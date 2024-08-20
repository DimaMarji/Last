import "./style.scss"
import pointList from "../../../public/Assets/Icons/General/point-list.svg"

import {Image, Row, Space, Text, Title} from "../../../Components";
import {blogSearchNotFoundProps} from './interface'
import useUrl from "../../../Hooks/window/Url";
import {useBlogCategories} from "../../../ReactQuery/Blog/blogsALL";

const BlogSearchNotFoundContainer: React.FC<blogSearchNotFoundProps> = ({
                                                                            searchBarShowing,
                                                                            setSearchBarShowing,
                                                                            // setTagSelected,
                                                                            // keywordSearch
                                                                            setActiveKey
                                                                        }) => {

    const {
        getAllEntities: getAllCategories
    } = useBlogCategories()
    const {data: categories} = getAllCategories

    const {getParam, updateParams} = useUrl()

    const keywordSearch = getParam("search")

    const handleTagSelected = (key: any) => {
        updateParams(!!key ? [{"filter": key}] : undefined, ["search"])
        document.documentElement.scrollTop = 0
    }
    return (
        <Row justify={"start"} className={"blog-not-found"}>
            <Space direction={"vertical"} align={"start"}>
                <Text className={"blog-not-found-message"}
                      typographyType={{size: "18px-18px-18px", type: "semi-bold-semi-bold-semi-bold"}}
                      typographyFontColor={"#232736"}
                >We
                    are
                    sorry, but there are <span className={"underline-zcoderz"}>no results</span> for your search
                    “<span style={{color: "#35ACFE"}}>{keywordSearch}</span>
                    ”</Text>
                <div>
                    <Text
                        typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}
                        className={"title-custom-margin"}
                    >
                        Search tips
                    </Text>
                </div>
                <Row style={{marginTop: "16px", marginBottom: "32px"}}>
                    <Space align={"start"} direction={"vertical"}>
                        <Space align={"start"} className={"check-your-spelling"}>
                            <Text typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}> Check your
                                spelling.</Text>

                        </Space>
                        <Space align={"start"} className={"check-your-spelling"}>
                            {/* TODO <Image alt={'point-list-icon'} width={"70%"} src={pointList} /> */}
                            <Text typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}> Broaden
                                your search by
                                using fewer
                                or more general words.</Text>
                        </Space>
                    </Space>
                </Row>
                <Title typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}
                       className={"title-custom-margin"}
                >
                    Categories
                </Title>
                <Row>
                    <Space style={{gap: "0px !important"}} align={"start"} direction={"vertical"}>
                        <Space align={"start"} style={{marginBottom: "16px", marginLeft: "89px"}}>
                            <Image alt={'point-list-icon'} width={"70%"} src={pointList}/>

                            <a onClick={() => handleTagSelected(undefined)}> <Title typographyFontColor={"#1F83F4"}
                                                                                    typographyType={{
                                                                                        size: "18px-18px-18px",
                                                                                        type: "semi-bold-semi-bold-semi-bold"
                                                                                    }}
                                                                                    className={"underline-zcoderz"}
                            > General</Title></a>
                        </Space>
                        {categories?.data?.items?.map((item: any, index: any) => (
                            <Space key={index} align={"start"} style={{marginBottom: "16px", marginLeft: "89px"}}>


                                <Image alt={'point-list-icon'} width={"70%"} src={pointList}/>

                                <a onClick={() => handleTagSelected(item.title)}> <Title key={index}
                                                                                         typographyFontColor={"#1F83F4"}
                                                                                         typographyType={{
                                                                                             size: "18px-18px-18px",
                                                                                             type: "semi-bold-semi-bold-semi-bold"
                                                                                         }}
                                                                                         className={"underline-zcoderz"}
                                > {item.title}</Title></a>
                            </Space>
                        ))}
                    </Space>
                </Row>
            </Space>
        </Row>

    );
};
export default BlogSearchNotFoundContainer;