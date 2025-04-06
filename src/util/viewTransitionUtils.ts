export const isViewTransitionSupported = () => {
  return typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
};

export const startViewTransition = (triggerUiUpdates: () => void) => {
  if (isViewTransitionSupported()) {
    document.startViewTransition(triggerUiUpdates);
  } else {
    triggerUiUpdates();
  }
};
