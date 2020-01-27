import React, { Component, Fragment } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

class App extends Component {
  state = {
    loading: true,
    robots: [],
    searchValue: /.*?/i
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

  handleChange = ({ target: { value } }) => {
    this.setState({
      searchValue: new RegExp(value, "i")
    });
  };

  render() {
    const { robots, loading, searchValue } = this.state;
    const filteredRobots = robots.filter(({ name }) => searchValue.test(name));
    return (
      <div className="tc">
        {loading ? (
          <h1 className="f2">Loading</h1>
        ) : (
          <Fragment>
            <h1 className="f2">RoboFriends</h1>
            <SearchBox handleChange={this.handleChange} />
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </Fragment>
        )}
      </div>
    );
  }
}
export default App;
