const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users()
		users.users =[{
			id: '1',
			name: 'NAme1',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'NAme2',
			room: 'React Course'
		}, {
			id: '3',
			name: 'NAme3',
			room: 'Node Course'
		}]
	})

	it('should add new user', () => {
		var users = new Users()
		var user = {
			id: 123,
			name: 'Me',
			room: 'Default'
		}
		var resUser = users.addUser(user.id, user.name, user.room)

		expect(users.users).toEqual([user])
	})
	it('should return users by room name', () => {
		expect(users.getUserList('React Course').length).toBe(1)
		expect(users.getUserList('React Course')[0]).toBe(users.users[1].name)
	})
	it('should return user', () => {
		expect(users.getUser('1')).toEqual(users.users[0])
	})
	it('should remove user', () => {
		expect(users.removeUser('3')).toEqual({
			id: '3',
			name: 'NAme3',
			room: 'Node Course'
		})
		expect(users.users.length).toBe(2)
	})
})