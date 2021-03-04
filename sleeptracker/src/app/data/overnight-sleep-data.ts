import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	summaryString():string {
		var startTime = new Date(this.sleepStart);
		var sleepStart_ms = startTime.getTime();
		var endTime = new Date(this.sleepEnd);
		var sleepEnd_ms = endTime.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	dateString():string {
		var date = new Date(this.sleepStart);
		return "Night of " + date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	startTime():string{
		var date = new Date(this.sleepStart);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	endTime():string{
		var date = new Date(this.sleepEnd);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
}
