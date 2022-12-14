import { useMediaQuery } from "../hooks/useMedidaQuery";

export const useIsLarge = () => useMediaQuery("(max-width: 1024px)");
export const useIsMedium = () => useMediaQuery("(max-width: 840px)");
export const useIsSmall = () => useMediaQuery("(max-width: 444px)");
