import React from "react";
import dateFns from "date-fns";
import format from 'date-fns/format';

var Holidays = require('date-holidays');  
var hd = new Holidays();

class Calendar extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.stateParam);
    hd.init(this.props.stateParam.countryCode);
    
    this.state = {
      dateStart: dateFns.parse(this.props.stateParam.dateStart),
      nDays: this.props.stateParam.nDays,
      countryCode: this.props.stateParam.countryCode,
      holidays: hd.getHolidays()
      // dateStart: new Date(),
      // nDays: 40,
      // countryCode: "US"
    };
    console.log(this.state);
  }

  
  componentWillReceiveProps(){
    let start = dateFns.parse(this.props.stateParam.dateStart);
    this.setState({
      dateStart: start,
      nDays: this.props.stateParam.nDays,
      countryCode: this.props.stateParam.countryCode
    });
    console.log(this.props.stateParam.nDays);
  }

  countMonths(){
    const { dateStart, nDays } = this.state;
    const endDate = this.getEndDate();
    let day = dateStart;
    let months = 1;
    
    while(day <= endDate){
      if (dateFns.isLastDayOfMonth(day) && day < endDate){
        months+=1;
      }
      day = dateFns.addDays(day, 1);
    }

    return months;

  }

  getEndDate(){
    const { dateStart, nDays } = this.state;

    //Add nDays minus 1 because I want to show nDays including dateStart
    const endDate = dateFns.addDays(dateStart,nDays-1); 
    return endDate;
  }

  renderHeader(date) {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        
        <div className="col col-center">
          <span>
            {dateFns.format(date, dateFormat)}
          </span>
        </div>
        
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.dateStart);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells(dateStart, dateEnd) {
    console.log("RenderCells");
    console.log(dateStart);
    console.log(dateEnd);

    let monthStart = dateFns.startOfWeek(dateStart);;
    let day = monthStart;
    let lastday;

    const dateFormat = "D";
    let formattedDate = "";
    const rows = [];
    let days = [];

    if(dateStart === this.state.dateStart){ //first month
        console.log("got into first month");     
      if(this.countMonths()===1){ //only month
        console.log("got into first and only month");
         lastday = dateFns.endOfWeek(dateEnd);
      }else{
        console.log("got into first month in multiple months");
         lastday = dateFns.endOfMonth(dateStart);
      }   
    }
    else if(dateFns.isSameMonth(dateStart,dateEnd)){ //last month
        console.log("got into last month");
       lastday = dateFns.endOfWeek(dateEnd);
    }
    else{ //middle months
        console.log("got into middle month");
       lastday = dateFns.endOfMonth(dateStart);
    }
      
      console.log("lastday: "+lastday);
      while (day <= lastday) {
        
        for (let i = 0; i < 7; i++) {
          formattedDate = dateFns.format(day, dateFormat);
          
          
          days.push(
            <div
              className={`col cell ${
                dateFns.isBefore(day, dateStart) || dateFns.isAfter(day, dateEnd) || !dateFns.isSameMonth(day, dateStart)
                  ? "disabled"
                  : dateFns.isToday(day) 
                  ? "selected" 
                  : hd.isHoliday(day)
                  ? "holiday" 
                  : dateFns.isWeekend(day) //Weekend color
                  ? "weekend" : ""
                  
              }`}
              key={day}
              
            >
              <span className="number">{formattedDate}</span>
              
            </div>
          );
          day = dateFns.addDays(day, 1);
        }
        rows.push(
          <div className="row" key={day}>
            {days}
          </div>
        );
        days = [];
      }
     
    return <div className="body">{rows}</div>;
  }
  
  

  render() {
    let months = [];

    let start = this.state.dateStart;
    let end = this.getEndDate();

    let nMonths = this.countMonths();

    console.log(start+" "+end);
    

    for(let i = 0; i < nMonths; i++){
      
      months.push(
        <div className="calendar" key={i}>
          {this.renderDays()}
          {this.renderHeader(start)}
          {this.renderCells(start, end)}
        </div>
      );

      start = dateFns.startOfMonth(dateFns.addMonths(start, 1));
      
    }
    

    return (
      <div>
      <div>Months: {nMonths}</div>
      <div>{months}</div>
      </div>
    );
  }
}

export default Calendar;