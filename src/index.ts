import { ImageFeatures } from "./data-models/image-features";
import { CoreImage } from "./data-models/core-image";
import { Logger } from "./utilities/logger";
import { Utils } from "./utilities/utils";
import { IFeatureExtractor } from "./services/ifeature-extractor";
import { SimpleImageResizer } from "./services/simple-resize-extractor-service";
import { ClassificationService } from "./services/classification-service";
import { PCAFeatureExtractor } from "./services/pca-feature-extractor";
import { resolvePath } from "./services/path-resolver";

async function main(): Promise<void> {
    const imagesWithFeaturesPath: string = resolvePath("data", "images-with-features.json");
    const paths: string[] = Utils.getFilesPaths(resolvePath("data", "training/Signs/Big"));

    const imageResizer: SimpleImageResizer = new SimpleImageResizer(resolvePath("data", "resized-images.json"));
    const images: CoreImage[] = await imageResizer.loadAndResizeImages(paths);
    const featureExtractor: IFeatureExtractor = new PCAFeatureExtractor(resolvePath("data", "pca-data-model.json"), images);

    let features: ImageFeatures[];

    if (!Utils.fileExists(imagesWithFeaturesPath)) {
        features = await featureExtractor.extractFeatures(images, 200);
        Utils.saveToFile(imagesWithFeaturesPath, features);
    } else {
        features = Utils.loadFromFile(imagesWithFeaturesPath);
    }

    const classificator = new ClassificationService(features, resolvePath("data", "neural-network.json"));
    console.log("Program successfully finished");
}

main();
