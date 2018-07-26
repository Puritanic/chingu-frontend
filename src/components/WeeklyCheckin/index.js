import * as React from 'react';
import './WeeklyCheckin.css';
import '../FormCreator/FormCreator.css';
import weeklyCheckinData from './weeklyCheckin.data';
import { renderQAs } from '../FormCreator/answerCreators.js';
import Store from '../../AppGlobalStore';
import { weeklyCheckinForm } from './graphql/mutation';
import Error from '../Error/Error';
import Loading from '../Loader/Loader';
import SuccessForm from '../Success/Success';
class WeeklyCheckin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      300: '',
      301: '',
      302: '',
      303: '',
      304: '',
      loading: false,
      error: false,
      errorMessage: '',
      success: false
    }
  }

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }
  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  errorHandling = (err) => {
    this.setState({ error: true, errorMessage: ' ' })
  }

  onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    console.log(type);
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      case 'button':
        let dbValue;
        switch (value) {
          case 'Great!':
            dbValue = 'green'
            break;
          case 'Trouble Ahead!':
            dbValue = 'red'
            break;
          case 'Nervous':
            dbValue = 'yellow'
            break;
          default:
            dbValue = value;
            break;
        }
        this.setState({ [name]: dbValue });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

  submit = (e) => {
    e.preventDefault();
    let answerObject = {
      progress_sentinment: this.state[300],
      worked_on: this.state[301],
      working_on: this.state[302],
      blocked_on: this.state[303]
    }
    Store.mutations.submitApplication(
      this.toggleLoading,
      this.errorHandling,
      answerObject,
      weeklyCheckinForm
    ).then(() => { if (this.state.error === false) { this.setState({ success: true })}});
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? <Loading /> : null}
        {this.state.errorMessage !== "" ? <Error goBack={"/profile"} error={this.state.errorMessage} /> : null}
        <div className="weekly-checkin-container">
          <div className="weekly-checkin-title">Weekly Checkin</div>
          {this.state.success
            ? <SuccessForm />
            : <div className="weekly-checkin-form">
              {renderQAs(weeklyCheckinData, this.onFormChange, this.state)}
              <hr className="hline" />
              <button onClick={e => this.submit(e)} className="weekly-checkin-btn">Submit</button>
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default WeeklyCheckin;