var expect = require('expect')
var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var text = 'test text'
		var from = 'Bot'
		var message = generateMessage(from, text)
		expect(message.from).toBe(from)
		expect(message.text).toBe(text)
		expect(message.createdAt).toBeA('number')
	})
})
describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var lat = 1
		var lng = 2
		var from = 'Bot'
		var location = generateLocationMessage(from, lat, lng)
		expect(location.from).toBe(from)
		expect(location.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`)
		expect(location.createdAt).toBeA('number')
	})
})