import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BarChart3, PlusCircle, List, Wallet, LayoutGrid, Mail } from "lucide-react";
import CreatePollForm from "./components/CreatePollForm";
import MyPolls from "./components/MyPolls";
import AllPolls from "./components/AllPolls";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Logo from "./components/Logo";
import TradingBackground from "./components/TradingBackground";
import ThemeToggle from "./components/ThemeToggle";
import MarketPage from "./components/MarketPage";
import Contact from "./components/Contact";

type Tab =
  | "create"
  | "myPolls"
  | "allPolls"
  | "stats"
  | "market"
  | "portfolio"
  | "contact";

interface MarketTabState {
  marketAddress: `0x${string}`;
  marketType: "amm" | "pariMutuel";
  pollAddress: `0x${string}`;
  sourceTab: "allPolls" | "myPolls" | "portfolio";
  sourcePage: number;
  sourceFilter: number;
  sourceCategories: number[];
}

// Parse market state from URL hash
const parseMarketFromHash = (): { tab: Tab; market: MarketTabState | null } => {
  const hash = window.location.hash.slice(1); // Remove #
  if (!hash) return { tab: "allPolls", market: null };

  // Check for market URL: #market/amm/0x.../0x... or #market/pari/0x.../0x...
  const marketMatch = hash.match(
    /^market\/(amm|pari)\/0x([a-fA-F0-9]{40})\/0x([a-fA-F0-9]{40})$/
  );
  if (marketMatch) {
    return {
      tab: "market",
      market: {
        marketAddress: `0x${marketMatch[2]}` as `0x${string}`,
        marketType: marketMatch[1] === "amm" ? "amm" : "pariMutuel",
        pollAddress: `0x${marketMatch[3]}` as `0x${string}`,
        sourceTab: "allPolls", // Default when coming from URL
        sourcePage: 1,
        sourceFilter: 0,
        sourceCategories: [],
      },
    };
  }

  // Check for simple tab names
  if (["create", "myPolls", "allPolls", "stats", "portfolio", "contact"].includes(hash)) {
    return { tab: hash as Tab, market: null };
  }

  return { tab: "allPolls", market: null };
};

function App() {
  // Initialize state from URL hash
  const initialState = parseMarketFromHash();
  const [activeTab, setActiveTab] = useState<Tab>(initialState.tab);
  const [marketTabState, setMarketTabState] = useState<MarketTabState | null>(
    initialState.market
  );
  const { isConnected } = useAccount();

  // Flag to prevent hashchange handler from overwriting programmatic navigation
  const isProgrammaticNavigation = useRef(false);

  // Sync URL hash with state
  useEffect(() => {
    isProgrammaticNavigation.current = true;
    if (activeTab === "market" && marketTabState) {
      const marketTypeShort =
        marketTabState.marketType === "amm" ? "amm" : "pari";
      window.location.hash = `market/${marketTypeShort}/${marketTabState.marketAddress}/${marketTabState.pollAddress}`;
    } else if (activeTab !== "allPolls") {
      window.location.hash = activeTab;
    } else {
      // Clear hash for default tab
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
    }
    // Reset flag after a short delay to allow hashchange to fire
    setTimeout(() => {
      isProgrammaticNavigation.current = false;
    }, 100);
  }, [activeTab, marketTabState]);

  // Handle browser back/forward (only for actual browser navigation, not programmatic)
  useEffect(() => {
    const handleHashChange = () => {
      // Skip if this is a programmatic navigation (we already set the state)
      if (isProgrammaticNavigation.current) {
        return;
      }
      const { tab, market } = parseMarketFromHash();
      setActiveTab(tab);
      setMarketTabState(market);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle market click from poll cards
  const handleMarketClick = (
    marketAddress: `0x${string}`,
    marketType: "amm" | "pariMutuel",
    pollAddress: `0x${string}`,
    sourceTab: "allPolls" | "myPolls" | "portfolio" = "allPolls",
    sourcePage: number = 1,
    sourceFilter: number = 0,
    sourceCategories: number[] = []
  ) => {
    setMarketTabState({
      marketAddress,
      marketType,
      pollAddress,
      sourceTab,
      sourcePage,
      sourceFilter,
      sourceCategories,
    });
    setActiveTab("market");
  };

  // Handle back from market page - return to source tab with page, filter and categories
  const handleBackFromMarket = () => {
    const sourceTab = marketTabState?.sourceTab || "allPolls";
    const sourcePage = marketTabState?.sourcePage || 1;
    const sourceFilter = marketTabState?.sourceFilter ?? 0;
    const sourceCategories = marketTabState?.sourceCategories ?? [];
    const pollAddress = marketTabState?.pollAddress;

    // Store poll address to refresh market data on return
    if (pollAddress) {
      sessionStorage.setItem("refreshPollMarket", pollAddress);
    }

    setActiveTab(sourceTab);
    setMarketTabState(null);
    // Store page, filter and categories in sessionStorage so components can restore it
    sessionStorage.setItem("returnToPage", sourcePage.toString());
    sessionStorage.setItem("returnToFilter", sourceFilter.toString());
    sessionStorage.setItem(
      "returnToCategories",
      JSON.stringify(sourceCategories)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B3E5FC] to-[#4FC3F7] dark:from-[#001F3F] dark:via-[#001B35] dark:to-[#000814] relative transition-colors duration-300 overflow-x-hidden max-w-full flex flex-col">
      <TradingBackground />
      {/* Header */}
      <header className="bg-gradient-to-r from-[#03A9F4]/90 via-[#4FC3F7]/90 to-[#0288D1]/90 dark:from-[#002B5B]/95 dark:via-[#01579B]/95 dark:to-[#001B44]/95 backdrop-blur-xl border-b border-white/40 dark:border-white/10 sticky top-0 z-50 shadow-[0_8px_24px_rgba(1,22,39,0.32)] transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo />
              <div className="relative flex items-center space-x-2">
                <div>
                  <h1 className="sb-heading text-2xl font-bold">
                    Prediction Oracle
                  </h1>
                  <p className="text-xs text-sky-900/90 dark:text-sky-100/80 font-medium tracking-wide">
                    Bikini Bottom of On-chain Predictions
                  </p>
                </div>
                {/* SpongeBob decorative image near header text */}
                <img
                  src="https://gateway.pinata.cloud/ipfs/bafybeighn2rblnpwea5qmo7xi6s3xao6lx4hglyesfeyo3bikkt3bu54yq"
                  alt="Cheerful yellow sponge character"
                  className="hidden sm:block h-10 md:h-12 lg:h-14 w-auto -mt-3 drop-shadow-lg"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-2 md:px-4 py-4 md:py-6 relative z-10">
        <div className="flex justify-between sm:justify-start sm:flex-wrap sm:gap-2 bg-gradient-to-r from-[#0288D1]/95 via-[#03A9F4]/95 to-[#00BCD4]/95 dark:from-[#001B44]/95 dark:via-[#01579B]/95 dark:to-[#004D61]/95 p-2 rounded-full backdrop-blur-2xl border border-sky-100/70 dark:border-sky-500/40 shadow-[0_10px_25px_rgba(1,22,39,0.35)] transition-colors duration-300">
          <button
            onClick={() => setActiveTab("allPolls")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "allPolls"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <List className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">All Polls</span>
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "create"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <PlusCircle className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Create Poll</span>
          </button>
          <button
            onClick={() => setActiveTab("myPolls")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "myPolls"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <LayoutGrid className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">My Polls</span>
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "portfolio"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <Wallet className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "stats"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <BarChart3 className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Statistics</span>
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all ${
              activeTab === "contact"
                ? "bg-accent-400 text-slate-900 shadow-[0_3px_0_rgba(245,127,23,0.9)] border border-yellow-600/70"
                : "text-sky-50/90 hover:text-yellow-100 hover:bg-white/10 border border-transparent"
            }`}
          >
            <Mail className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Contact</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12 relative z-10 flex-grow">
        {!isConnected &&
        activeTab !== "allPolls" &&
        activeTab !== "stats" &&
        activeTab !== "portfolio" &&
        activeTab !== "contact" ? (
          <div className="card text-center">
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              Please connect your wallet to continue
            </p>
          </div>
        ) : (
          <>
            {activeTab === "create" && <CreatePollForm />}
            {activeTab === "myPolls" && (
              <MyPolls onMarketClick={handleMarketClick} />
            )}
            {activeTab === "allPolls" && (
              <AllPolls onMarketClick={handleMarketClick} />
            )}
            {activeTab === "stats" && <Stats />}
            {activeTab === "portfolio" && (
              <Portfolio
                onMarketClick={(addr, type, poll) =>
                  handleMarketClick(addr, type, poll, "portfolio", 1, 0, [])
                }
              />
            )}
            {activeTab === "contact" && <Contact />}
            {activeTab === "market" && marketTabState && (
              <MarketPage
                marketAddress={marketTabState.marketAddress}
                marketType={marketTabState.marketType}
                pollAddress={marketTabState.pollAddress}
                onBack={handleBackFromMarket}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#01579B]/90 via-[#0277BD]/90 to-[#004D61]/90 backdrop-blur-xl border-t border-white/40 dark:border-white/10 relative z-10 transition-colors duration-300 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sky-50 text-sm font-medium">
            Prediction Oracle · Underwater On-chain Prediction Markets
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
