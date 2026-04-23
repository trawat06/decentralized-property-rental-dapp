import { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PropertyForm from "./components/PropertyForm";
import PropertyList from "./components/PropertyList";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AlertMessage from "./components/AlertMessage";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./blockchain/contractConfig";

function App() {
  const NETWORKS = {
    localhost: {
      chainIdHex: "0x7a69",
      chainIdDecimal: 31337,
      chainName: "Hardhat Localhost",
      rpcUrls: ["http://127.0.0.1:8545"],
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    },
    sepolia: {
      chainIdHex: "0xaa36a7",
      chainIdDecimal: 11155111,
      chainName: "Sepolia",
      rpcUrls: ["https://rpc.sepolia.org"],
      nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
  };

  const [account, setAccount] = useState("");
  const [properties, setProperties] = useState([]);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [isNetworkLoading, setIsNetworkLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("localhost");
  const [currentChainId, setCurrentChainId] = useState("");
  const [alert, setAlert] = useState(null);

  const provider = useMemo(() => {
    if (!window.ethereum) return null;
    return new ethers.BrowserProvider(window.ethereum);
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3500);
  };

  const getContract = useCallback(
    async (useSigner = false) => {
      if (!provider) return null;
      if (
        !CONTRACT_ADDRESS ||
        CONTRACT_ADDRESS === "PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE" ||
        CONTRACT_ABI.length === 0
      ) {
        throw new Error("Please deploy contract and update contractConfig.js");
      }

      const signerOrProvider = useSigner ? await provider.getSigner() : provider;
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
    },
    [provider]
  );

  const loadProperties = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const contract = await getContract(false);
      if (!contract) return;
      const allProperties = await contract.getAllProperties();
      setProperties(allProperties);
    } catch (error) {
      showAlert("error", error.reason || error.message || "Unable to load properties.");
    } finally {
      setIsDataLoading(false);
    }
  }, [getContract]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      showAlert("error", "MetaMask not found. Please install MetaMask.");
      return;
    }

    try {
      setIsWalletLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setAccount(accounts[0]);
      setCurrentChainId(chainId);
      showAlert("success", "Wallet connected successfully.");
    } catch (error) {
      showAlert("error", error.message || "Wallet connection failed.");
    } finally {
      setIsWalletLoading(false);
    }
  };

  const switchNetwork = async (networkKey) => {
    if (!window.ethereum) {
      showAlert("error", "MetaMask not found. Please install MetaMask.");
      return;
    }

    const network = NETWORKS[networkKey];
    if (!network) return;

    try {
      setIsNetworkLoading(true);
      setSelectedNetwork(networkKey);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainIdHex }],
      });
      setCurrentChainId(network.chainIdHex);
      showAlert("success", `Switched to ${network.chainName}.`);
    } catch (switchError) {
      // Error 4902 means the chain is not added in MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: network.chainIdHex,
                chainName: network.chainName,
                rpcUrls: network.rpcUrls,
                nativeCurrency: network.nativeCurrency,
                blockExplorerUrls: network.blockExplorerUrls || [],
              },
            ],
          });
          setCurrentChainId(network.chainIdHex);
          showAlert("success", `${network.chainName} added and selected.`);
        } catch (addError) {
          showAlert(
            "error",
            addError.message || `Unable to add ${network.chainName}.`
          );
        }
      } else {
        showAlert(
          "error",
          switchError.message || `Unable to switch to ${network.chainName}.`
        );
      }
    } finally {
      setIsNetworkLoading(false);
    }
  };

  const handleListProperty = async (formData) => {
    if (!account) {
      showAlert("error", "Connect wallet to list a property.");
      return;
    }

    try {
      setIsSubmitting(true);
      const contract = await getContract(true);
      const tx = await contract.listProperty(
        formData.title,
        formData.location,
        formData.contactNumber,
        formData.monthlyRent,
        formData.securityDeposit
      );
      await tx.wait();
      showAlert("success", "Property listed successfully.");
      await loadProperties();
    } catch (error) {
      showAlert("error", error.reason || error.message || "Listing failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRentProperty = async (propertyId, totalAmount) => {
    if (!account) {
      showAlert("error", "Connect wallet to rent a property.");
      return;
    }

    try {
      setActionLoadingId(propertyId.toString());
      const contract = await getContract(true);
      const tx = await contract.rentProperty(propertyId, { value: totalAmount });
      await tx.wait();
      showAlert("success", "Property rented successfully.");
      await loadProperties();
    } catch (error) {
      showAlert("error", error.reason || error.message || "Rent transaction failed.");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleMarkAvailable = async (propertyId) => {
    try {
      setActionLoadingId(propertyId.toString());
      const contract = await getContract(true);
      const tx = await contract.markPropertyAvailable(propertyId);
      await tx.wait();
      showAlert("success", "Property marked available.");
      await loadProperties();
    } catch (error) {
      showAlert("error", error.reason || error.message || "Update transaction failed.");
    } finally {
      setActionLoadingId("");
    }
  };

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      })
      .catch(() => {});

    window.ethereum
      .request({ method: "eth_chainId" })
      .then((chainId) => setCurrentChainId(chainId))
      .catch(() => {});

    const handleChainChanged = (chainId) => {
      setCurrentChainId(chainId);
      loadProperties();
    };

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || "");
    };

    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pb-6">
      <Navbar
        account={account}
        onConnect={connectWallet}
        loading={isWalletLoading}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={setSelectedNetwork}
        onSwitchNetwork={switchNetwork}
        isNetworkLoading={isNetworkLoading}
      />
      <HeroSection
        account={account}
        onConnect={connectWallet}
        loading={isWalletLoading}
        currentChainId={currentChainId}
        selectedNetwork={selectedNetwork}
      />

      <main className="mx-auto max-w-6xl px-6 pt-6">
        <AlertMessage alert={alert} />
      </main>

      <PropertyForm onSubmit={handleListProperty} submitting={isSubmitting} />
      <PropertyList
        properties={properties}
        account={account}
        onRent={handleRentProperty}
        onMarkAvailable={handleMarkAvailable}
        loading={isDataLoading}
        actionLoadingId={actionLoadingId}
      />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
