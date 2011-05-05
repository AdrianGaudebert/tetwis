
/**
 * Class MessageBuilder
 * Create messages to send to the server in a simple way.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr, Van-Duc Nguyen
 * @constructor
 */
function MessageBuilder() {
};

MessageBuilder.prototype = {

	/**
	 * Deprecated
	 */
    updatePlayersInfo: function(nbPlayers, nbAwaitings) {
        var data = {
            method: "update",
            object: "playersInfo",
            data: {
                ingame: nbPlayers,
                awaiting: nbAwaitings
            }
        };

        var json = JSON.stringify(data);

        this.game.sendAll(json);
    },

    /**
     * Create the basic structure of a message, and stringify to JSON.
     * @param type Type of message. Can be "login", "query", "data" or "action".
     * @param data Object containing data of the message.
     * @return JSON message to send.
     */
    createMessage: function(type, data) {
        var msg = {
            type: type,
            data: data
        };

        return JSON.stringify(msg);
    },

    /**
     * Create a query message, and stringify to JSON.
     * @param responseMethod Type of message we want to receive in response.
     * @param responseData Object containing data about this query.
     * @return JSON message to send.
     */
    createQuery: function(responseType, responseData) {
        var data = {};
        data.response_type = responseType;
        data.data = responseData;

        return this.createMessage("query", data);
    },

    /**
     * Create an action message, and stringify to JSON.
     * @param name Name of the action.
     * @param data Object containing data about this action.
     * @return JSON message to send.
     */
    createAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;

        return this.createMessage("action", actionData);
    },

    /**
     * Create a data message, and stringify to JSON.
     * @param method What to do with data. Can be "new", "update" or "delete".
     * @param object Name of the concerned object.
     * @param object_data Object containing data about this object.
     * @return JSON message to send.
     */
    createData: function(method, object, object_data) {
        var data = {};
        data.method = method;
        data.object = object;
        data.object_data = object_data;

        return this.createMessage("data", data);
    },

    /**
     * Create a request message asking for the login of the client.
     * @return JSON message to send.
     */
    createAuthenticationQuery: function() {
        return this.createQuery("login", {});
    },

    /**
     * Create a data message confirming the authentication.
     * @param username Login used to authenticate.
     * @param valid Boolean to say if authentication is done or not.
     * @return JSON message to send.
     */
    createAuthenticationData: function(userId, valid) {
        var data = {};
        data.id = userId;
        data.valid = valid;
        return this.createData("new", "Authentication", data);
    },

    createGamesListData: function(gamesList) {
		var i = 0
			,ln = gamesList.length
			,data = []
			;

		for (; i < ln; i++) {
			data.push({
				id: gamesList[i].id,
				players: gamesList[i].players.length,
				awaitings: gamesList[i].awaitings.length,
				level: gamesList[i].level,
				score: gamesList[i].score
			});
		}

		return this.createData("new", "games-list", data);
	},

    createJoinAction: function() {
        return this.createAction();
    },

    createNewGameData: function(game) {
        return this.createData("new", "Game", game);
    },

    createUpdateGameData: function(game) {
        return this.createData("update", "Game", game);
    },

    createNewPlayerData: function(player) {
        return this.createData('new', 'Player', player);
    },

    createUpdatePlayerData: function(player) {
        return this.createData("update", "player", player);
    },

};

module.exports = MessageBuilder;
