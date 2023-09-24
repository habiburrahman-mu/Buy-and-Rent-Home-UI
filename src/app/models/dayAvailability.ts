import { TimeSlot } from "./timeSlot";

export interface DayAvailability {
	date: string;
	day: string;
	availableTimeSlots: TimeSlot[];
}
