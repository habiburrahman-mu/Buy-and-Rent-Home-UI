import { VisitingRequestDetailDto } from "./visitingRequestDetailDto";

export default interface VisitingRequestWithPropertyDetailDto extends VisitingRequestDetailDto {
	visitingRequestId: number;
	name: string;
	takenByName: string;
}
