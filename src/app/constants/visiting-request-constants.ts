import ValueLabel from "../models/valueLabel";

export default class VisitingRequestConstants {
	static StatusList: ValueLabel<string>[] = [
		{ value: 'P', label: 'Pending' },
		{ value: 'A', label: 'Approved' },
		{ value: 'N', label: 'Not Approved' },
	];
}
