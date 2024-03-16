const Chats = require('../models/chatsModel');
const ArchivedChat = require('../models/archivedChatsModel');
const cron = require('cron');
const { Op } = require('sequelize');


const job = new cron.CronJob('0 0 * * *', async () => {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);   

        const oldChats = await Chats.findAll({
            where: {
                createdAt: {
                    [Op.lt]: oneDayAgo
                }
            }
        });

        
        await ArchivedChat.bulkCreate(oldChats.map(chat => ({
            id: chat.id,
            message: chat.message,
            name: chat.name,
            createdAt: chat.createdAt,
            userId: chat.userId,
            groupId: chat.groupId
        })));

        
        await Chats.destroy({
            where: {
                createdAt: {
                    [Op.lt]: oneDayAgo
                }
            }
        });

        console.log(`Moved ${oldChats.length} old chats to ArchivedChat table and deleted them from Chats table`);
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

module.exports = { job }