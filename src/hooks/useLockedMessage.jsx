function useLockedMessage(topResult, setShowAlertLocked) {
  if (!topResult) return () => null;
  return () => {
    setShowAlertLocked(true);
  };
}

export default useLockedMessage;
