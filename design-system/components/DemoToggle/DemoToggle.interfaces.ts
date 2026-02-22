export interface DemoToggleLabels {
  showcasingPurposes?: string;
  exitLoading?: string;
  loading?: string;
  exitLoadingAriaLabel?: string;
  showLoadingAriaLabel?: string;
  exitEmptyState?: string;
  emptyState?: string;
  showPopulatedAriaLabel?: string;
  showEmptyAriaLabel?: string;
}

export interface DemoToggleProps {
  enabled: boolean;
  onToggle: () => void;
  loadingEnabled: boolean;
  onLoadingToggle: () => void;
  labels?: DemoToggleLabels;
}
