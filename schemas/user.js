module.exports = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}