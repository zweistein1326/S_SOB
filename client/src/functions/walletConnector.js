import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';


export const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal
});

connector.on("connect", async (error, payload) => {
    if (error) {
        throw error
    }
    const { accounts, chainId } = payload.params[0];
    console.log(accounts, chainId);
});

connector.on("session_update", (error, payload) => {
    if (error) {
        throw error;
    }
    const { accounts, chainId } = payload.params[0];
    console.log(payload);
})
