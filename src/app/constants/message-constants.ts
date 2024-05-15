export class MessageConstants {
	static readonly SaveSuccessful = 'Data saved successfully.' as const;
	static readonly ApproveSuccessful = 'Accepted successfully.' as const;
}

export class MessageSeverityConstants {
	static readonly Error = "error" as const;
	static readonly Warning = "warning" as const;
}
