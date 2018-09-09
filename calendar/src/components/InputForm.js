import React from "react";
import Calendar from './Calendar.js'



class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dateStart: new Date(),
        nDays: 1,
        countryCode: "US",
        render: false,
        flagCalendarChange: false
      };
  
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleDaysChange = this.handleDaysChange.bind(this);
      this.handleCodeChange = this.handleCodeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleDaysChange(event) {
      this.setState({nDays: event.target.value, render: false});
    }

    handleDateChange(event) {
      this.setState({dateStart: event.target.value, render: false, flagCalendarChange: true});

    }

    handleCodeChange(event) {
      this.setState({countryCode: event.target.value, render: false});
    }
  
    handleSubmit(event) {
        this.setState({render: true});
        event.preventDefault();
    }
  
    render() {
      if(this.state.render){
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
            <center>
                <table>
                    <tbody>
                    <tr>
                        <td>Start Date:</td>
                        <td><input type="date" value={this.state.dateStart} onChange={this.handleDateChange} /></td>
                    </tr>
                    <tr>
                        <td>Number of Days:</td>
                        <td><input type="number" value={this.state.nDays} onChange={this.handleDaysChange} /></td>
                    </tr>
                    <tr>
                        <td>Country Code:</td>
                        <td><input type="text" value={this.state.countryCode} onChange={this.handleCodeChange} /></td>
                    </tr>
                    </tbody>
                </table>
                </center>
                <input type="submit" value="Render Calendar" />
            </form>
            <div>
                <Calendar stateParam={this.state}/>
            </div>
          </div>
        );
      }
      else{
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <center>
                <table>
                    <tbody>
                    <tr>
                        <td>Start Date:</td>
                        <td><input type="date" value={this.state.dateStart} onChange={this.handleDateChange} /></td>
                    </tr>
                    <tr>
                        <td>Number of Days:</td>
                        <td><input type="number" min="1" value={this.state.nDays} onChange={this.handleDaysChange} /></td>
                    </tr>
                    <tr>
                        <td>Country Code:</td>
                        <td><input type="text" value={this.state.countryCode} onChange={this.handleCodeChange} /></td>
                    </tr>
                    </tbody>
                </table>
                </center>
                <input disabled={!this.state.flagCalendarChange} type="submit" value="Render Calendar" />
            </form>
          </div>
        );
      }
      
    }
  }

  export default InputForm;