const SequelizeFIle = require('sequelize-file')

const picture = SequelizeFile({
    attribute: 'picture',
    mimetype: /^image/,
    crop: true,
    sizes: {
        small: 64,
        big: 150,
    }
});

const backgroundImage = SequelizeFile({
    attribute: 'backgroundImage',
    mimetype: /^image/,
    crop: true,
    sizes: {
        preview: "x350",
    }
});

module.exports = { picture, backgroundImage } 