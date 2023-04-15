import { WagmiConfig, createClient } from "wagmi";
import { configureChains, mainnet } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import Image from "next/image";
import SignInButton from "../../components/wagmi/SignInButton"; // Import the SignInButton component

const { provider, chains } = configureChains([mainnet], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Currently Supported",
    wallets: [metaMaskWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#6544c9",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
        modalSize="compact"
        avatar={() => (
          <Image
            src="/images/placeholderpfp.png"
            alt="pfp"
            width="100"
            height="100"
            className="blur-[1px]"
          />
        )}
      >
        <SignInButton /> {/* Place the SignInButton component */}
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProvider;
