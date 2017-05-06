import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumSchema = new Schema(
    {
        artist: String,
        title: String,
        released: Number,
        genre: String,
        format: String,
        lable: String,
        createData: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now }
    }
);

export default mongoose.model('Album', albumSchema);