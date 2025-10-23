import {HashRouter, Navigate, Outlet, Route, Routes} from "react-router";
import AppLayout from "@/app/AppLayout";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import BestPractices from "@/components/BestPractices";
import ProductImagesContainer from "@/components/ProductImagesContainer";
import CollectionContainer from "@/components/CollectionContainer";

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<AppLayout/>}>
                        <Route index element={<Navigate to="/collections" replace={true}/>}/>
                        <Route path="collections" element={<Outlet/>}>
                            <Route index element={<CollectionContainer/>}/>
                            <Route path=":collection/:product" element={<ProductImagesContainer/>}/>
                        </Route>

                        <Route path="help" element={<BestPractices/>}/>
                        <Route path="*" element={<div>404: Not Found</div>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </ErrorBoundary>
    );
}

export default App;
