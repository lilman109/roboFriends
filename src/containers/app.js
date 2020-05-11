import React, {Component} from 'react';
import CardList from '../components/cardList';
import SearchBox from '../components/searchBox';
import './app.css';
import Scroll from '../components/scroll';
import ErrorBoundary from '../components/errorBoundary.js';
import {connect} from 'react-redux';

import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = (state) => ({
  searchField: state.searchRobots.searchField,
  robots: state.requestRobots.robots,
  isPending: state.requestRobots.isPending,
  error: state.requestRobots.error
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
})

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const {searchField, onSearchChange, robots, isPending} = this.props;

    const filteredRobots = robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchField.toLowerCase())
      )

    })

    return isPending ? <h1 className='tc'>Loading...</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);