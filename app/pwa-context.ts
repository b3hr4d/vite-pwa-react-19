import { createContext, useContext } from "react";

export const UPDATE_EACH_MINUTES = 1;
export const UPDATE_INTERVAL = UPDATE_EACH_MINUTES * 60 * 1000;
export const INSTALL_PROMPT_DELAY = 30000;

interface PWAContextType {
	offlineReady: boolean;
	needRefresh: boolean;
	isUpdating: boolean;
	handleUpdate: () => Promise<void>;
	closePrompt: () => void;
	checkForUpdates: () => Promise<void>;
	lastUpdateCheck: Date | null;
}

export const PWAContext = createContext<PWAContextType | null>(null);

export const usePWA = () => {
	const context = useContext(PWAContext);
	if (!context) {
		throw new Error("usePWA must be used within a PWAProvider");
	}
	return context;
};
