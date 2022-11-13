import { PropertyListDto } from "./propertyListDto";

export interface PropertyDetailDto extends PropertyListDto {
    sellRent: number;
    propertyTypeId: number;
    furnishingTypeId: number;
    countryId: number;
    cityId: number;
    streetAddress: string;
    totalFloor: number;
    floor: number;
    landmark: string;
    cityLattitude: number;
    cityLongitude: number;
    otherCost: number | null;
    gym: boolean;
    parking: boolean;
    swimmingPool: boolean;
    description: string;

}
