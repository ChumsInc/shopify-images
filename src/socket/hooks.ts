import {useContext} from "react";
import ShopifySocketContext from "@/socket/ShopifySocketContext.tsx";

export function useShopifySocket() {
    const context = useContext(ShopifySocketContext);
    if (!context) {
        throw new Error('useShopifySocket must be used within a ShopifySocketProvider');
    }
    return context;
}
