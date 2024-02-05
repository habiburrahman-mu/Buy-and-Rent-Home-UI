export class DateTimeUtils {
	static DateToString(date: Date): string {
		var newDate = new Date(date); // creating new instance to remove reference
		newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
		return newDate.toISOString();
	}
}
