import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import getProjectAndUser from './graphql/getProjectAndUser';
import { Query } from 'react-apollo';
import './ProjectShowcase.css';
import HeroImage from './components/HeroImage';

/*

This component should only be concerned with the overall layout of the page and whether it is editable.

*/

class ProjectShowcase extends React.Component {
  state = {
    editable: false
  };

  isEditable = (user, project) => {
    return project.users.some((teamMember) => {
      return user.id === teamMember.id;
    });
  }

  getProjectId = () => {
    return this.props.match.params.projectId;
  }

  render() {
    return (
      <Query
        query={getProjectAndUser}
        // FIXME[1]
        variable={{ title: 'vampires Team 0 Project' }}>
        {({ error, loading, data }) => {

          if (error) { return null; }
          if (loading) { return null; }

          const { user, projects } = data;
          const project = projects[0]; // FIXME[1]
          console.log(project);
          return (
            <div className="project-portal">
              <Banner
                editable={true}
                // editable={this.isEditable(user, project)}
                title={project.title}
                elevatorPitch={project.elevatorPitch}
              />
              <HeroImage
                editable={true}
                // editable={this.isEditable(user, project)}
                title={project.title}
                elevatorPitch={project.elevatorPitch}
              />
              <div className="project-info-container">
                <ProjectDescription
                  // editable={this.isEditable(user, project)}
                  editable={true}
                  text={project.description}
                />
                <ProjectSideBar project={project} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProjectShowcase;
