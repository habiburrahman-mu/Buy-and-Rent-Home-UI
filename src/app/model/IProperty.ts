import {City} from "./city";
import {Country} from "./country";
import {IKeyValuePair} from "./ikeyvaluepair";
import {UserForRegister} from "./user";

export interface IProperty {
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
    postedOn: string;
    postedBy: number;
    lastUpdatedOn: string;
    lastUpdatedBy: number;
    city: City;
    country: Country;
    furnishingType: IKeyValuePair;
    postedByNavigation: UserForRegister;
    propertyType: IKeyValuePair;
    photos: any[];
}
