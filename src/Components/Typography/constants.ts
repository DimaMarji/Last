import {combineSameArrayTripleTimes} from "./helpers";

export const fontFamilies =
    [
        "regular",
        "medium",
        "semi-bold",
        "bold",
    ] as const

export const fontSizes = [
    "10px",
    "12px",
    "13px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "28px",
    "32px",
    "40px",
    "48px",
    "64px",
    "120px"
] as const

export const colors = [
    "#42526D",
    "#757575",
    "#FFFFFF",
    "#363E6F",
    "#1F83F4",
    "#509DD0",
    "#FFBF38",
    "#98A1B0",
    "#3F4676",
    "#7A8699",
    "#9F2039",
    "#8993A4",
    "#444754",
    "#70737C",
    "#353846",
    "#9C9EA5",
    "#232736",
    "#5E616C",
    "#F2F2F3",
    "#DEDFE1",
    "#253747",
    "#201A2D",
    "#1F3A55",
    "#2E374C"
] as const

export const languagesWithFontFamilies = {
    en: [
        'open-sans',
    ] as const
}

export const allSizes = combineSameArrayTripleTimes(fontSizes)
export const allFamilies = combineSameArrayTripleTimes(fontFamilies)


export const DefaultFontFamily = languagesWithFontFamilies["en"][0]
export const DefaultType = allSizes[0]
export const DefaultSize = allFamilies[0]