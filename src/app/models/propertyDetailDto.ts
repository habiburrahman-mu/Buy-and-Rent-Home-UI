import { PropertyListDto } from "./propertyListDto";
import { PhotoDto } from "./photoDto";

export interface PropertyDetailDto extends PropertyListDto {
	sellRent: number;
	propertyTypeId: number;
	furnishingTypeId: number;
	countryId: number;
	cityId: number;
	streetAddress: string;
	totalFloor: number;
	floor: number;
	latitude: number | null;
	longitude: number | null;
	cityLatitude: number;
	cityLongitude: number;
	otherCost: number | null;
	gym: boolean;
	parking: boolean;
	swimmingPool: boolean;
	description: string;
	availableDays: string;
	availableStartTime: string;
	availableEndTime: string;
	postedBy: number;
	photos: Array<PhotoDto>;
	status: string;
}
