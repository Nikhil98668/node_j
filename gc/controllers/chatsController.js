const Chats = require('../models/chatsModel');



exports.getAllChats = async (req, res) => {
  try {
    const response = await Chats.findAll({
      where: { groupId: req.query.groupId },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};




exports.postChat = async (req, res) => {
  try {
    const chat = await Chats.create({
      name: req.user.name,
      message: req.body.message,
      usersId: req.user.id,
      groupId: req.body.groupId
    });
    res.status(201).send(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create chat" });
  }
};




