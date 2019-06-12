const mongoose = require('mongoose')

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
},
{
    // Cria createdat e updatedat
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

// Campo virtual que não existe no banco, apenas no back

File.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:3000'
    return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File);

