export interface IPropertyBase {
    id: number;
    sellRent: number;
    name: string;
    propertyTypeId: number;
    furnishingTypeId: number;
    bedroom: number;
    bathroom: number | null;
    commonSpace: number | null;
    countryId: number;
    cityId: number;
    streetAddress: string;
    totalFloor: number;
    floor: number;
    landmark: string;
    area: number;
    rentPrice: number;
    otherCost: number | null;
    gym: boolean;
    parking: boolean;
    swimmingPool: boolean;
    description: string;
}
