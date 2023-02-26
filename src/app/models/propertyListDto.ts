export interface PropertyListDto {
    id: number;
    name: string;
    propertyType: string;
    bedroom: number;
    bathroom: number | null;
    commonSpace: number | null;
    area: number;
    rentPrice: number;
    furnishingType: string;
    city: string;
    country: string;
    readyToMove: boolean;
    postedOn: string;
    primaryPhoto: string;
}
