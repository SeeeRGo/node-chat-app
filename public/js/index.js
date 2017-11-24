var socket = io();

		socket.on('connect', function () {
			console.log('Connected to server');

			socket.emit('createMessage', {
				from: 'jen',
				text: 'Hi Hi'
			})
		});

		socket.on('disconnect', function () {
			console.log('disConnected from server');
		});

		socket.on('newMessage', function(newMessage) {
			console.log('New Message', newMessage)
		})