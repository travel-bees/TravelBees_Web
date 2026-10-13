import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface EnquiryValues {
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDates: string;
  travelers: string;
  tripType: string;
  budget: string;
  requirements: string;
  message: string;
}

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  travelDates: "",
  travelers: "2 travellers",
  tripType: "International holiday",
  budget: "",
  requirements: "",
  message: "",
};

interface AppContextValue {
  enquiryOpen: boolean;
  enquiryPrefill: Partial<EnquiryValues>;
  enquirySource: string;
  openEnquiry: (prefill?: Partial<EnquiryValues>, source?: string) => void;
  closeEnquiry: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<Partial<EnquiryValues>>({});
  const [enquirySource, setEnquirySource] = useState("Website enquiry");
  const [searchOpen, setSearchOpen] = useState(false);

  const openEnquiry = useCallback((prefill: Partial<EnquiryValues> = {}, source = "Website enquiry") => {
    setEnquiryPrefill(prefill);
    setEnquirySource(source);
    setEnquiryOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryOpen(false);
    document.body.style.overflow = "";
  }, []);

  const value = useMemo(
    () => ({
      enquiryOpen,
      enquiryPrefill,
      enquirySource,
      openEnquiry,
      closeEnquiry,
      searchOpen,
      setSearchOpen,
    }),
    [enquiryOpen, enquiryPrefill, enquirySource, openEnquiry, closeEnquiry, searchOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
