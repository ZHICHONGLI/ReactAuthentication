import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, GamesListManager } from '../components';
// Import the action-creators to be  binde with bindActionCreators
import * as albumsActionCreators from '../actions/albums';
import $ from 'jquery';

// Do not export AlbumsContainer as it is 'almost' a dumb component
class AlbumsContainer extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = { selectedAlbum: {} };
    // Bind the functions to this (context) 
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
  }

  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    this.getAlbums();
  }

  toggleModal (index) {
    this.setState({ selectedAlbum: this.state.albums[index] });
    // Since we included bootstrap we can show our modal through its syntax
    $('#game-modal').modal();
  }

// GET_ALBUMS is now dispatched and intercepted by the saga watcher
  getAlbums () {
    this.props.albumsActions.getAlbums();
  }

  deleteAlbum (id) {
    fetch(`http://localhost:4300/albums/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(response => {
      // The game is also removed from the state thanks to the filter function
      this.setState({ games: this.state.games.filter(game => game._id !== id) }); 
      console.log(response.message);
    });
  }

  setSearchBar (event) { 
    // Super still filters super mario thanks to toLowerCase
    this.props.albumsActions.setSearchBar( event.target.value.toLowerCase());
  }

  render () {
    const { selectedAlbum } = this.state;
    const { albums, searchBar } = this.props;
    console.dir(albums);
    return (
      <div>
        <Modal album={selectedAlbum} />
        <GamesListManager
          albums={albums}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteAlbum={this.deleteAlbum}
        />
      </div>
    );
  }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return { // We get all the albums to list in the page
    albums: state.getIn(['albums', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['albums', 'searchBar'], '')
  }
}
// We can dispatch actions to the reducer and sagas
function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(albumsActionCreators, dispatch)
  };
}
// Finally we export the connected AlbumsContainer
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);