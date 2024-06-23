const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    message: {
        type: String,
        required: [true, "Please insert the message"]
    }
})

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;