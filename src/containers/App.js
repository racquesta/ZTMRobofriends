import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

import { setSearchField } from "../actions.js";

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  state = {
    loading: true,
    robots: []
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users =>
        this.setState({
          robots: users,
          loading: false
        })
      );
  }

  render() {
    const { robots, loading } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(({ name }) =>
      new RegExp(searchField, "i").test(name)
    );
    return (
      <div className="tc">
        {loading ? (
          <h1 className="f2">Loading</h1>
        ) : (
          <Fragment>
            <h1 className="f2">RoboFriends</h1>
            <SearchBox handleChange={onSearchChange} />
            <Scroll>
              <ErrorBoundary>
                <CardList robots={filteredRobots} />
              </ErrorBoundary>
            </Scroll>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
