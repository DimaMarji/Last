import * as React from "react";
import "./styles.scss";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../Context/Language/LanguageContext";


const getTranslation = (translations, cultureCode) => {
    const translation = translations.find(t => t.cultureCode === cultureCode);
    return translation ? translation.name : '';
};

const Home: React.FC = () => {

    const {t} = useTranslation()
    const {user} = useSelector((state: any) => state.user);


    const {cultureCode, switchLanguage} = useLanguage();


    return (
        <div>
            {t('username')}

        </div>
    );
};
export default Home;
