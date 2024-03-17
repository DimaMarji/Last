import {Grid} from "@mui/material";
import {ISharedLayoutProps} from "../interface";
import "./styles.scss";
import Sidebar from "./SharedSidbar/sharedSidbar";
import {useEffect} from "react";
import useTokens from "../../Hooks/Auth/useToken";
import {useNavigate} from "react-router-dom";
import {useAppMediaQuery} from "../../Hooks/MediaQuery/use-app-media-query";

const SharedLayout: React.FC<ISharedLayoutProps> = ({children}) => {
    const {accessToken} = useTokens();
    const navigate = useNavigate()
    const {isTabletOrMobile} = useAppMediaQuery()

    useEffect(() => {
        if (!accessToken) {
            navigate("/login", {replace: true})
        }
    }, [accessToken])

    return (
        <div>
            <Grid container>
                <Grid item xs={!isTabletOrMobile ? 3 : 0}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={!isTabletOrMobile ? 9 : 12}>
                    {children}
                </Grid>
            </Grid>
        </div>
    );
};
export default SharedLayout;
