import * as React from 'react';
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

class HeroImage extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    elevatorPitch: PropTypes.string,
    mutation: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    imageLink: `https://i.imgur.com/E63b9Re.png`,
    mutation: console.log
  };

  state = {
    isEditing: false,
    imageLink: this.props.imageLink
  };

  toggleEditWithSave = () => {
    let { isEditing } = this.state;

    if (isEditing) {
      this.makeMutation();
    }

    this.setState({ isEditing: !isEditing });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  makeMutation = () => {
    const { imageLink } = this.state;
    const { mutation } = this.props;

    mutation({ variables: { imageLink } });
  };

  render() {
    console.log("component props", this.props);

    const { isEditing, imageLink } = this.state;
    const { editable } = this.props;

    return (
      <div className="hero-image-container">
        {isEditing ? (
          <React.Fragment>
            <img
              className="hero-image"
              src={this.state.imageLink}
              alt="" />
            <input
              className="hero-image__edit-input"
              name="imageLink"
              value={imageLink}
              onChange={this.handleChange} />
          </React.Fragment>

        ) : (
            <img
              className="hero-image"
              src={this.state.imageLink}
              alt="" />
          )}

        {editable && (
          <button
            className="project-portal__edit-button project-portal__positioning-3"
            onClick={() => this.toggleEditWithSave()}
          >
            <div className="project-portal__edit-button--text">
              <img
                className="project-portal__edit-button--img"
                src={require('../../../assets/edit-green.png')}
                alt="edit" />
              {isEditing ? "Done" : "Edit"}
            </div>
          </button>
        )}
      </div>
    )
  }

}

export default HeroImage;