import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Album from './Album';
import AddAlbumPanel from './AddAlbumPanel';

export default class GamesListManager extends PureComponent {
  render () {
    const { albums, searchBar, setSearchBar, toggleModal, deleteAlbum,userName, logout } = this.props;
    return (

      <div className="container scrollable">
        <div className="row text-left">
          <AddAlbumPanel logout={logout} userName={userName} />
        </div>
        <div className="row">
          <input
            type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
        </div>
        <div className="row">
        {
    // A Game is only shown if its name contains the string from the searchBar
          albums
            .filter(game => game.name.toLowerCase().includes(searchBar))
            .map((game, i) => {
              return (
                <Album  {...game}
                  key={game._id}
                  i={i}
                  toggleModal={toggleModal}
                  deleteAlbum={deleteAlbum}
                />
              );
            })
        }
        </div>
        <hr />
      </div>

    );
  }
}