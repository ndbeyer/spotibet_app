import {format} from 'date-fns';

export const formatMilliSeconds = ms => {
  return format(new Date(new Date(Number(ms)) + ' UTC'), 'dd.MM.yyyy HH:mm:ss');
};

export const getStartOfNthDay = n => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startOfDay = (Math.floor(Date.now() / msPerDay) + n) * msPerDay;
  const nextLocalDateTime = new Date(startOfDay);
  return nextLocalDateTime;
};

export class Bet {
  constructor(obj = {start: 0, end: 1}) {
    this.now = Date.now();
    this.start = typeof obj.start === 'number' ? Math.floor(obj.start) : 0;
    this.end = typeof obj.end === 'number' ? Math.floor(obj.end) : 1;
  }
  secondsPerWeek() {
    return 7 * 24 * 60 * 60 * 1000;
  }
  currentWeek() {
    return Math.floor(this.now / this.secondsPerWeek());
  }
  nextWeek() {
    return Math.ceil(this.now / this.secondsPerWeek());
  }
  startOfNextWeek() {
    return this.nextWeek() * this.secondsPerWeek();
  }
  startOfBet() {
    return (this.nextWeek() + 1 + this.start) * this.secondsPerWeek();
  }
  endOfBet() {
    return (
      (this.nextWeek() + 1 + this.start + this.end) * this.secondsPerWeek()
    );
  }
}
// const bet = new Bet({start: 1, end: 5})
// console.log(new Date(bet.startOfBet()))
// console.log(new Date(bet.endOfBet()))
