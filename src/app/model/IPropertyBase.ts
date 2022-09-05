export interface IPropertyBase {
    id: number;
    sellRent: number;
    name: string;
    furnishingType: string;
    propertyType: string;
    price: number | null;
    bhk: number;
    builtArea: number | null;
    city: string;
    readyToMove: number | null;
    image?: string;
    estPossessionOn?: Date;
}
