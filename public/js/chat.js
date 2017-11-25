var socket = io();

function scrollToBottom () {
	var messages = jQuery('#messages')
	var newMessage = messages.children('li:last-child')

	var clientHeight = messages.prop('clientHeight')
	var scrollTop = messages.prop('scrollTop')
	var scrollHeight = messages.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessageHeight = newMessage.prev().innerHeight()
	var totalHeight = clientHeight + scrollTop + newMessageHeight + lastMessageHeight
	if(totalHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight)
	}
}

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('disConnected from server');
});

socket.on('newMessage', function(newMessage) {
	var formattedTime = moment(newMessage.createdAt).format('h:mm a')
	var template = jQuery('#message-template').html()
	var html = Mustache.render(template, {
		text: newMessage.text,
		from: newMessage.from,
		createdAt: formattedTime
	})
	jQuery('#messages').append(html)
	scrollToBottom()
})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a')
	var template = jQuery('#location-message-template').html()
	console.log(template)
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	})
	jQuery('#messages').append(html)
	scrollToBottom()
})

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault()
	var messageTextbox = jQuery('[name=message]')
	socket.emit('createMessage' , {
		from: 'User',
		text: messageTextbox.val()
	}, function(){
		messageTextbox.val('')
	})
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser')
	} 

	locationButton.attr('disabled', 'disabled').text('Sending location...')
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location')
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function() {
		locationButton.removeAttr('disabled').text('Send location')
		alert('Unable to fetch location')
	})
})