export interface MapLocation {
    name: string;
    description?: string;
    image?: MapLocationImage;
    url?: string;
    icon?: string;
    position: MapLocationPosition;
}

export interface MapLocationImage {
    name?: string;
    url: string;
    credit?: string;
}

export interface MapLocationPosition {
    x: string;
    y: string;
}