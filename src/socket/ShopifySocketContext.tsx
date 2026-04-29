import {createContext} from "react";
import type {SocketContext} from "@/socket/types";

const ShopifySocketContext = createContext<SocketContext|null>(null);
export default ShopifySocketContext;
