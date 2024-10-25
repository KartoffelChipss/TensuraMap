export interface MapRegion {
    name: string;
    description?: string;
    capital?: string;
    ruler?: string;
    population?: string;
    url?: string;
    image?: MapRegionImage;
    borderColor?: string;
    fillColor?: string;
    points: string;
}

export interface MapRegionImage {
    name?: string;
    url: string;
    credit?: string;
}