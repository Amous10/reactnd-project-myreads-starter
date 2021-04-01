import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			books: [],
		};
	}

	componentDidMount() {
		this.setBooksState();
	}

	setBooksState() {
		BooksAPI.getAll()
			.then((books) => this.setState({ books }))
			.catch((error) => console.error("Failed to fetch books", error));
	}

	chooseShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			this.setBooksState();
		});
	};


	render() {
		return (
			<Router>
				<div className="app">
					{/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
					<Switch>
						<Route exact path="/" render={() => <Home books={this.state.books} onChange={this.chooseShelf} />} />
						<Route path="/search" render={() => <SearchPage books={this.state.books} onChange={this.chooseShelf} />} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
