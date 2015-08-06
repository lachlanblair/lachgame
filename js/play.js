var playState = {

	create: function() { 
	    //  A simple background for our game
	    this.background = game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    this.platforms = game.add.group();

	    //  We will enable physics for any object that is created in this group
	    this.platforms.enableBody = true;

	    // Here we create the ground.
	    this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    this.ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    this.ground.body.immovable = true;

	    //  Now let's create two ledges
	    this.ledge = this.platforms.create(400, 400, 'ground');

	    this.ledge.body.immovable = true;

	    this.ledge = this.platforms.create(-150, 250, 'ground');

	    this.ledge.body.immovable = true;

			this.player = game.add.sprite(32, game.world.height - 150, 'tenth');
			this.cybercontroller = game.add.sprite(game.world.width - 64, game.world.height - 270, 'cybercontroller');
			this.dalek = game.add.sprite(32, game.world.height - 400, 'dalek');

			game.physics.arcade.enable(this.player);
			game.physics.arcade.enable(this.cybercontroller);
			game.physics.arcade.enable(this.dalek);

			this.player.body.bounce.y = 0.2;
			this.player.body.gravity.y = 300;
			this.player.body.collideWorldBounds = true;

			this.player.animations.add('left', [2], 10, true);
			this.player.animations.add('right', [0], 10, true);

			this.stars = game.add.group();
			this.stars.enableBody = true;

			for (var i = 0; i < 12; i++) {
				var star = this.stars.create(i * 70, 0, 'star');
				star.body.gravity.y = 6;
				star.body.bounce.y = 0.7 + Math.random() * 0.2;
			}

			this.diamonds = game.add.group();
			this.diamonds.enableBody = true;

			for (var i = 0; i < 4; i++) {
				var diamond = this.diamonds.create(i * 250, 0, 'diamond');
				diamond.body.gravity.y = 40;
				diamond.body.bounce.y = 0.5;
			}

			this.baddies = game.add.group();
			this.baddies.enableBody = true;

			for (var i = 0; i < 5; i++) {
				var legocyberman = this.baddies.create(i * 100, 0, 'legocyberman');
				legocyberman.body.gravity.y = 40;
			}

			this.cursors = game.input.keyboard.createCursorKeys();
			this.scoreText = game.add.text(16, 16, 'score: ' + game.global.score, { fontSize: '32px', fill: '#000' });

	},

	update: function() {
	game.physics.arcade.collide(this.player, this.platforms);
	game.physics.arcade.collide(this.baddies, this.platforms);
	game.physics.arcade.collide(this.stars, this.platforms);
	game.physics.arcade.collide(this.diamonds, this.platforms);
	game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
	game.physics.arcade.overlap(this.player, this.diamonds, this.bumpIntoDiamond, null, this);
	//  Reset the players velocity (movement)
	    this.player.body.velocity.x = 0;

	    if (this.cursors.left.isDown)
	    {
	        //  Move to the left
	        this.player.body.velocity.x = -150;

	        this.player.animations.play('left');
	    }
	    else if (this.cursors.right.isDown)
	    {
	        //  Move to the right
	        this.player.body.velocity.x = 150;

	        this.player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        this.player.animations.stop();

	        this.player.frame = 1;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.cursors.up.isDown && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -350;
	    }
	},

	collectStar: function(player, star) {
		star.kill();
		game.global.score += 10;
		this.scoreText.text = 'Score: ' + game.global.score;
	},

	bumpIntoDiamond: function(player, diamond) {
		diamond.kill();
		game.global.score -= 2;
		this.scoreText.text = 'Score: ' + game.global.score;
	}
	};
