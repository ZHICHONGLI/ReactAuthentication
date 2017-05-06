import Album from '../models/album';

const getAlbums = (req, res) => {
    Album.find(null, null, { sort: {postDate : 1}}, (err, albums) => {
        if (err) {
            res.send(err);
        }
        res.send(albums);
    })
}

const getAlbum = (req, res) => {
    const { id } = req.params;
    Album.findById(id, (err, album) => {
        if (err) {
            res.send(err);
        }
        res.send(album)
    });
}

const postAlbum = (req, res) => {
    let album = Object.assign(new Album(), req.body);
    album.save( err => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'album created' }); // A JSON res
    })
}

const deleteAlbum = (req, res) => {
    Album.remove(
        { _id: req.params.id},
        err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'deleted done'});
        }
    );
};

export { getAlbum, getAlbums, postAlbum, deleteAlbum };