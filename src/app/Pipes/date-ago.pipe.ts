import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        if (value) {
            let dateNow = Date.now();
            let dateFromServer = new Date(value.toString()).getTime();
            let timezoneOffset = new Date().getTimezoneOffset(); // in minute
            const seconds = Math.floor((dateNow - dateFromServer) / 1000) + (timezoneOffset*60);
            if (seconds < 30) { // less than 30 seconds ago will show as 'Just Now'
                return "Just Now";
            }
            const intervals: { [key: string]: number } = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            for (let i in intervals) {
                let counter = Math.floor(seconds / intervals[i]);
                if (counter > 0) {
                    if (counter == 1) {
                        return counter + ' ' + i + ' ago'; // singular: (1 day ago)
                    } else {
                        return counter + ' ' + i + 's ago' // plural: (2 days ago)
                    }
                }
            }
        }
        return value;
    }

}
