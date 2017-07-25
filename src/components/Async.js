import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../components/ListItem';

class Async extends PureComponent{
  constructor(props) {
    super(props);
  }
  render(){
      const { currentUser, repos, loadRepos } = this.props;
      let list = repos.map((item) =>{
          return (
             <ListItem key={item.name} item ={item.name} />
          );
      });
      return(
        <div>
            <p>{currentUser}</p>
            {list}
             <button onClick={loadRepos}>
                重新加载
            </button>
        </div>
      );
  }
}

Async.propTypes = {
  currentUser: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  loadRepos: PropTypes.func.isRequired
};

export default Async;