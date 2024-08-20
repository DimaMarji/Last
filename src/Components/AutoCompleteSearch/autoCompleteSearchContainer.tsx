import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AutoCompleteSearchProps} from "./interface";
import "./style.scss"
import CloseIcon from "../../../public/Assets/Icons/General/Close (1).svg"
import SearchIcon from "../../../public/Assets/Icons/General/search.svg"
import {Input} from "antd";
import {Image, Row, Space, Spin, Text} from "../../Atoms";
import {AutoComplete} from "../../Atoms/AutoComplete";
import spinner from "../../../public/Assets/Images/General/loading-icon.gif"
import searchNotFound from "../../../public/Assets/Images/Blogs/search-not-found.svg"
import {useBlog} from "../../../ReactQuery/Blog/blogsALL";
import {useDebounce} from "../../../Hooks/use-debounce";
import useUrl from "../../../Hooks/window/Url";
import {useAppMediaQuery} from "../../../Hooks/MediaQuery/use-app-media-query";


const AutoCompleteSearchContainer: React.FC<AutoCompleteSearchProps> = ({
                                                                            suffixState,
                                                                            setSuffixState,
                                                                            ...props
                                                                        }) => {
        const {isMobileOrTablet} = useAppMediaQuery()

        const {getParam, removeParam, updateParams} = useUrl()
        const searchKeywordParam = getParam("search")

        const [inputValue, setInputValue] = useState<string>(searchKeywordParam)
        const [searchValue, setSearchValue] = useState<string>()
        const [search, setSearch] = useState<boolean>(false)
        const [selected, setSelected] = useState<boolean>(false)
        const [noSearchResult, setNoSearchResult] = useState<boolean>(true)

        const {
            getAllEntities
        } = useBlog({getAllParams: {title: searchValue, num_item_in_page: 4}})
        const {isSuccess} = getAllEntities

        const onSelect = (value: string) => {
            setSearchValue(value)
            setSelected(true)
            updateParams([{"search": value}], ["filter"])
        };


//templates

        const suffix = (setStateSuffix: Dispatch<SetStateAction<boolean>>, suffixState: boolean) => {
            return <Image
                alt={"close"}
                className={"search-close-icon"}
                src={CloseIcon}
                onClick={() => {
                    setStateSuffix(!suffixState)
                    if (searchKeywordParam)
                        removeParam("search")
                }}
                width={22}
                height={22}
            />
        }

        const prefix = () => {
            return <Image
                className={"prefix-search-icon"}
                alt={"search"}
                src={SearchIcon}
                width={20}
                height={20}
            />
        }

        const noResult = <Row justify={"center"} className={"search-not-found-style color-white-overflow"}>
            <Space direction={"vertical"} align={"center"}>

                <Image src={searchNotFound} className={"search-not-found"} alt={"searchNotFound"}
                       width={"83%"} height={"83%"}
                />
                <Text typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}>
                    We couldn’t find anything matching your search.
                </Text>
                <Text typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}>
                    Try again with a different term, or check your spelling or language.
                </Text>
                <br/>

            </Space>
        </Row>

        const result = getAllEntities?.data?.data?.items?.map((item: any, index: any) => {
            return {
                value: item?.title,
                label: (
                    <Text
                        typographyType={{size: "18px-18px-18px", type: "regular-regular-regular"}}
                        className={"certain-category-search-dropdown search-result-item"}
                        key={index}
                    >
                        {item?.title}
                    </Text>
                )
            }
        })
        const empty = [{
            label: <Row justify={"center"}
                        className={"search-on-blogs"}
            >
                <Text typographyType={{size: "16px-16px-16px", type: "semi-bold-semi-bold-semi-bold"}}>
                    Search on blogs...
                </Text>
            </Row>
        }]
        const loading = [{
            label:
                <Row justify={"center"}>
                    <Space direction={"vertical"} align={"center"}>
                        <Spin
                            className={"spinner-custom"}
                            // wrapperClassName={"spinner-custom"}
                            tip={
                                <>
                                    <Text typographyType={{
                                        size: "18px-18px-18px",
                                        type: "semi-bold-semi-bold-semi-bold"
                                    }}>loading</Text>
                                </>
                            }
                            size={"large"}
                            indicator={
                                <Image width={"100%"} height={"100%"} src={spinner} alt={""}/>
                            }/>
                    </Space>
                </Row>
        }]


        useEffect(() => {
            if (isSuccess && selected) {
                setNoSearchResult(false)
                setSelected(false)
            }
        }, [isSuccess, selected])

        useEffect(() => {
            if (inputValue && inputValue != "") {
                setSearchValue(inputValue)
            }
            setSearch(false)
        }, [search])

        useEffect(() => {
            if (!inputValue || inputValue == "" || getAllEntities.isLoading)
                setNoSearchResult(true)
            else if (getAllEntities?.data?.data?.items && !(getAllEntities.data.data.items.length >= 1))
                setNoSearchResult(true)
            else
                setNoSearchResult(false)

        }, [inputValue])


        return (
            <AutoComplete
                className={"custom-auto-complete-search"}
                dropdownMatchSelectWidth={50}
                popupClassName={noSearchResult ? "certain-category-search-dropdown search-on-blogs" : "certain-category-search-dropdown"}
                options={!inputValue ? empty : getAllEntities.isLoading ? loading : result as any[]}
                onSelect={onSelect}
                onSearch={
                    useDebounce(() => {
                        setSearch(true)
                    }, 400)
                }
                onChange={(value => setInputValue(value))}
                value={inputValue}
                notFoundContent={noResult}
            >
                <Input
                    autoFocus={true}
                    onPressEnter={() => {
                        updateParams([{"search": inputValue}], ["filter"])
                    }}
                    className={"custom-style-hover-search-input"}
                    size={"large"}
                    {...props}
                    value={inputValue}
                    suffix={!isMobileOrTablet && suffix(setSuffixState, suffixState)}
                    prefix={prefix()}
                />

            </AutoComplete>

        );
    }
;

export default AutoCompleteSearchContainer;