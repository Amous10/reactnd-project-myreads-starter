import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./views/Home";
import SearchPage from "./views/SearchPage";
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

	// Get all the books previously on my shelves
	setBooksState() {
		BooksAPI.getAll()
			.then((books) => this.setState({ books }))
			.catch((error) => console.error("Failed to fetch books", error));
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			this.setBooksState();
		});
	};

	// render() {
	//   return (
	//     <div className="app">
	//       <Route exact path="/" render={() => (
	//         <Home
	//           books={this.state.books}
	//           onChange={this.changeShelf}
	//         />
	//       )}>
	//       </Route>

	//       <Route path="/search" render={() => (
	//         <SearchPage
	//           books={this.state.books}
	//           onChange={this.changeShelf}
	//         />
	//       )}>
	//       </Route>
	//     </div>
	//   )
	// }

	render() {
		return (
			<Router>
				<div className="app">
					{/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
					<Switch>
						<Route exact path="/" render={() => <Home books={this.state.books} onChange={this.changeShelf} />} />
						<Route path="/search" render={() => <SearchPage books={this.state.books} onChange={this.changeShelf} />} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
