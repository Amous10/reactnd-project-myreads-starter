import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class SearchPage extends React.Component {

  state = {
    searchResults: [],
    query: ''
  }

  search = ( book ) => {
    if ( book.length ) {
      BooksAPI.search( book ).then( books => {
        if (books.length > 0) {
          books = this.assignShelf( books )
          this.setState( () => {
            return { searchResults: books }
          })
        } else {
          this.setState( { searchResults: [] } )
          console.error('Search not available')
        }
      })
    }
  }

  assignShelf = ( books ) => {
    let myBooks = this.props.books
    books.forEach( book => {
      book.shelf = 'none'
      myBooks.forEach( myBook => {
        if( book.id === myBook.id ) {
          book.shelf = myBook.shelf
        }
      })
    })
    return books
  }

  handleChange = ( event ) => {
    let value = event.target.value
    this.setState( () => {
      return { query: value }
    })
    this.search( value )
  }

  addToShelf = ( book, shelf ) => {
    this.props.onChange( book, shelf )
    book.shelf = shelf
    this.forceUpdate()
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ this.state.query }
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.query.length > 0 && this.state.searchResults.map(( book, index ) => (
								<Book
									book = { book }
									key = { index }
									onUpdate = { ( shelf ) => { this.addToShelf( book, shelf ) }}
								/>
							))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
