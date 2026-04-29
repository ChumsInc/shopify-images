export const buildSocketUrl = ():string|null => {
    if (window.location.host === 'localhost' || window.location.host.startsWith('localhost:')) {
        return null;
        // return 'ws://localhost:8086';
    }
    return 'wss://intranet.chums.com/api/shopify/';
}
