import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.stateParam);
    this.state = {
      dateStart: new Date(this.props.stateParam.dateStart),
      nDays: this.props.stateParam.nDays,
      countryCode: this.props.stateParam.countryCode
      // dateStart: new Date(),
      // nDays: 40,
      // countryCode: "US"
    };
  }

  
  componentWillReceiveProps(){
    this.setState({
      dateStart: new Date(this.props.stateParam.dateStart),
      nDays: this.props.stateParam.nDays,
      countryCode: this.props.stateParam.countryCode
    });
    console.log(this.props.stateParam.nDays);
  }

  countMonths(){
    const { dateStart, nDays } = this.state;
    const endDate = dateFns.addDays(dateStart,nDays);
    let day = dateStart;
    let months = 1;
    while(day <= endDate){
      if (dateFns.isLastDayOfMonth(dateFns.subDays(day,1))){
        months+=1;
      }
      day = dateFns.addDays(day, 1);
    }

    return months;

  }

  getEndDate(){
    const { dateStart, nDays } = this.state;
    const endDate = dateFns.addDays(dateStart,nDays);
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

    let monthStart;
    let monthEnd;
    let startDate;
    let endDate;
    let day;
    let lastday;

    const dateFormat = "D";
    let formattedDate = "";
    const rows = [];
    let days = [];
    

    

    if(dateStart === this.state.dateStart){ //first month && only mon
       monthStart = dateFns.startOfWeek(dateStart);
       monthEnd = dateFns.endOfMonth(monthStart);
       startDate = dateFns.startOfWeek(monthStart);
       endDate = dateFns.endOfWeek(monthEnd);
       day = startDate;
      if(this.countMonths()===1){ //only month
         lastday = dateFns.endOfWeek(dateEnd);
      }else{
         lastday = dateFns.endOfWeek(endDate);
      }
      
    }
    else if(dateFns.isSameMonth(dateStart,dateEnd)){ //last month
       monthStart = dateFns.startOfMonth(dateStart);
       monthEnd = dateFns.endOfMonth(monthStart);
       startDate = dateFns.startOfWeek(monthStart);
       endDate = dateFns.endOfWeek(monthEnd);
       day = startDate;
       lastday = dateFns.endOfWeek(dateEnd)

    }
    else{ //middle months
       monthStart = dateFns.startOfMonth(dateStart);
       monthEnd = dateFns.endOfMonth(monthStart);
       startDate = dateFns.startOfWeek(monthStart);
       endDate = dateFns.endOfWeek(monthEnd);
       day = startDate;
       lastday = endDate;
    }

    
      
      console.log("endDate: "+lastday);
      while (day <= lastday) {
        if(dateFns.isToday(day)){
          console.log("Today:"+day);
        }
        for (let i = 0; i < 7; i++) {
          formattedDate = dateFns.format(day, dateFormat);
          
          
          days.push(
            <div
              className={`col cell ${
                dateFns.isBefore(day, dateStart) || dateFns.isAfter(day, dateEnd) || !dateFns.isSameMonth(day, dateStart)
                  ? "disabled"
                  : dateFns.isToday(day) 
                  ? "selected" 
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
  
  nextMonth = () => {
    this.setState({
      startDate: dateFns.addMonths(this.state.startDate, 1)
    });
  }
  prevMonth = () => {
    this.setState({
      startDate: dateFns.subMonths(this.state.startDate, 1)
    });
  }

  render() {
    let months = [];

    let nMonths = this.countMonths();

    let start = this.state.dateStart;
    let end = this.getEndDate();

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