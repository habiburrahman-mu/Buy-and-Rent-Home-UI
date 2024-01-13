import { DayAvailability } from "src/app/models/dayAvailability"

export default interface DayAvailabilityExtended extends DayAvailability {
	index: number
	dateInDateFormat: Date
}
