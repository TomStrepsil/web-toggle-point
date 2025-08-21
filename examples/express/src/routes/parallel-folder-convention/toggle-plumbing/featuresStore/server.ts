import featuresStoreFactory from "@asos/web-toggle-point-features/storeFactories/nodeRequestScopedFeaturesStoreFactory";
const { setValue, getFeatures } = featuresStoreFactory();

export { getFeatures, setValue };
export const useFeatures = () => ({ feature: getFeatures() });
