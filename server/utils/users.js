class Users {
	constructor () {
		this.users = []
	}

	addUser (id, name, room) {
		var user = {id, name, room}
		this.users.push(user)
		return user
	}

	removeUser(id) {
		this.user = this.users.find((user) => user.id === id)
		this.users = this.users.filter((user) => user.id !== id)
		return this.user
	}

	getUser(id) {
		return this.users.find((user) => user.id === id)
	}

	getUserList(room) {
		return this.users.filter((user) => user.room === room)
		.map((user) => user.name)
	}
}

module.exports = {Users}