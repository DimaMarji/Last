import React, {useEffect, useState} from 'react';
import "./style.scss"
import {IBlogHeaderProps} from "./interface";
import SearchIcon from "../../../public/Assets/Icons/General/search.svg"
import {AutoCompleteSearch, Button, Col, Row, Skeleton, Tabs, Title} from "../../../Components";
import Image from 'next/image'
import {useBlogCategories} from "../../../ReactQuery/Blog/blogsALL";
import useUrl from "../../../Hooks/window/Url";
import {IBlogCategories} from "../../../API/ZcoderzApi/Interfaces/Blog/get-all-blogs-categories";
import {generateEmptyArray} from "../../../Helpers/arrays/arrayHeleprs";
import {useAppMediaQuery} from "../../../Hooks/MediaQuery/use-app-media-query";
import {handleMouseEvent} from "../../../Helpers/ScrollHandler/scrollHelpers";

const BlogHeaderContainer: React.FC<IBlogHeaderProps> = () => {

    const {addParam, removeParam, getParam} = useUrl()
    const tagSelected = getParam("filter")
    const searchKeyword = getParam("search")

    const [activeKey, setActiveKey] = useState<string>(tagSelected ?? "General")
    const [searchBarShowing, setSearchBarShowing] = useState<boolean>(!!searchKeyword)

    const {
        getAllEntities: getAllCategories
    } = useBlogCategories()
    const {data: categories, isSuccess, isLoading} = getAllCategories

    const {isMobileOrTablet} = useAppMediaQuery()

    const handleTagSelected = (key: any) => {
        setActiveKey(key)
        if (key === "General")
            removeParam("filter")
        else
            addParam({"filter": key})
    }

    const tags: IBlogCategories[] = isLoading ? generateEmptyArray(5) : isSuccess ? categories?.data?.items : []

    const tagSkeleton = <Skeleton className={"blog-category-skeleton"} active paragraph={false}/>

    const blogsCategories = () => {
        const categories: {
            key: string;
            label: React.ReactNode;
        }[] = [
            {
                key: "General",
                label: <Title
                    typographyFontColor={"#70737C"}
                    typographyType={{size: "16px-14px-14px", type: "semi-bold-semi-bold-semi-bold"}}
                >General</Title>,
            },
            ...tags?.map((item, index) => {
                return {
                    key: isLoading ? `${index}` : item.title,
                    label: isLoading ?
                        tagSkeleton
                        : <Title
                            level={5}
                            typographyFontColor={"#70737C"}
                            typographyType={{
                                size: "16px-14px-14px",
                                type: "semi-bold-semi-bold-semi-bold"
                            }}>
                            {item.title}
                        </Title>,
                };
            })
        ];
        return categories;
    };


    useEffect(() => {
        handleMouseEvent(".ant-tabs-nav-wrap");
    }, []);

    return (
        <div className={"blog-header"}>
            <Row justify={"center"}>
                <Col span={24} className={"blog-header-title"}>
                    <Title typographyType={{type: "bold-semi-bold-semi-bold", size: "40px-24px-24px"}} level={1}>
                        Zcoderz Blog
                    </Title>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={24}>
                    {(searchBarShowing || isMobileOrTablet) && <div>
                        <AutoCompleteSearch type={"search"}
                                            placeholder={"Search on blogs"}
                                            suffixState={searchBarShowing}
                                            setSuffixState={setSearchBarShowing}
                        />
                    </div>}
                    {(!searchBarShowing || isMobileOrTablet) &&
                        <Tabs
                            moreIcon={null}
                            tabBarExtraContent={!isMobileOrTablet && <Button type={"link"}
                                                                             onClick={() =>
                                                                                 setSearchBarShowing(!searchBarShowing)
                                                                             }>
                                <Image
                                    alt={'search-icon'}
                                    src={SearchIcon}
                                    className={"blog-search-icon"}
                                    width={20}
                                    height={20}

                                /></Button>}

                            className={"blog-tabs-bar"}
                            defaultActiveKey={activeKey}
                            activeKey={activeKey}
                            onTabClick={handleTagSelected}
                            items={blogsCategories()}/>
                    }


                </Col>
            </Row>
        </div>
    );
};
export default BlogHeaderContainer;