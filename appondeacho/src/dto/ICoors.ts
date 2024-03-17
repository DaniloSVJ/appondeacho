export interface  ICoords{
  coords: IDcoords | null;
}

export interface IDcoords{
    "accuracy": number;
    "altitude": number;
    "altitudeAccuracy": number;
    "heading": number;
    "latitude": number;
    "longitude": number;
    "speed": number;
}