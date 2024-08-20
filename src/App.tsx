import {Provider} from "react-redux";
import "./App.scss";
import MainRouter from "./Routers/routers";
import store from "./Redux/store";
import {LanguageProvider} from "./Context/Language/LanguageContext";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <LanguageProvider>
                    <MainRouter/>
                </LanguageProvider>
            </Provider>
            </QueryClientProvider>
        </>
    );
}

export default App;
