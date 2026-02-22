export interface PageTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  ariaLabel?: string;
}
