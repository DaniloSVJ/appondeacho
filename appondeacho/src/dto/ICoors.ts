export interface  ICoords{
  coords: IDcoords | null;
}

interface IDcoords{
    "accuracy": number;
    "altitude": number;
    "altitudeAccuracy": number;
    "heading": number;
    "latitude": number;
    "longitude": number;
    "speed": number;
}