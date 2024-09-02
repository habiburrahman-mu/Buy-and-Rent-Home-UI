export interface PropertyListDto {
    id: number;
    sellRent: number;
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
    floor: number;
    readyToMove: boolean;
    postedOn: string;
    primaryPhoto: string;
		otherCost: number | null;
		status: string;
}
