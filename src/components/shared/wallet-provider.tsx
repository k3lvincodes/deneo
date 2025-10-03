
"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
    isConnected: boolean;
    userAddress: string;
    isRegistered: boolean;
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleRegister: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}

interface WalletProviderProps {
    children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
    const { toast } = useToast();
    const [isConnected, setIsConnected] = useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const handleConnect = () => {
        toast({
            title: "Connecting to wallet...",
            description: "Please approve the connection in your wallet provider.",
        });

        setTimeout(() => {
            const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            setUserAddress(mockAddress);
            setIsConnected(true);
            toast({
                title: "Wallet Connected",
                description: `Address: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
            });
        }, 2000);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setUserAddress("");
        toast({
            title: "Wallet Disconnected",
        });
    };

    const handleRegister = () => {
        setIsRegistered(true);
    };

    const value = {
        isConnected,
        userAddress,
        isRegistered,
        handleConnect,
        handleDisconnect,
        handleRegister,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}
