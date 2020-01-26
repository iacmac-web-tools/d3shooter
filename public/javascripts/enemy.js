var Enemy = function (params) {
	var scope = this;

	scope.shooter = params.shooter;
	scope.canvas = scope.shooter.canvas;
	scope.game = scope.shooter.game;
	scope.width = scope.shooter.width;
	scope.height = scope.shooter.height;
	scope.explosion = scope.shooter.explosion;

	scope.initEnemy = function () {
		var cxStart = scope.randomX(),
			cxEnd = scope.randomX(),
			data = scope.randomData(),
			t = scope.randomTime(),
			bigR = data.scale * 25,
			smallR = data.scale * 10;

		var bacteriaClass = '';

		switch (data.scale) {
			case 1.5:
				bacteriaClass = 'susceptible';
			  	break;
			case 2:
				bacteriaClass = 'intermediate';
			  	break;
			case 2.5:
				bacteriaClass = 'resistant';
				break;	
			default:
				bacteriaClass = data.className;
			  break;
		  }

		scope.enemy = scope.game.append('g')
			.classed('enemy ' + bacteriaClass, true)
			.attr('lives', data.lives)
			.attr('transform', 'translate(' + [cxStart, -bigR] + ')');
		
		scope.enemy
			.transition()
			.duration(t)
				.ease('linear')
				.attr('transform', 'translate(' + [cxEnd, scope.height + bigR] + ')')
				.remove();

		scope.enemy.append('path')
			.classed('lg', true)
			.attr('transform', 'scale(' + data.scale + ')')
			.attr('r', bigR)
			.attr('d','m47.865376,2.521923c-2.646262,0 -4.794555,2.148293 -4.794555,4.794977l0,7.038474c-2.666104,0.383978 -5.235951,1.093884 -7.671753,2.052879l-3.509843,-6.099321c-1.342129,-2.282337 -4.257323,-3.069081 -6.55887,-1.74595c-2.301969,1.323553 -3.088713,4.258168 -1.764315,6.540505l3.528842,6.117686c-2.071667,1.64927 -3.951028,3.52863 -5.600297,5.600297l-6.117897,-3.52863c-2.282126,-1.323131 -5.216741,-0.537654 -6.540505,1.764315c-1.323131,2.301547 -0.536387,5.216952 1.74595,6.559081l6.09911,3.528208c-0.958995,2.417437 -1.66869,4.987072 -2.052668,7.653176l-7.038685,0c-2.646684,0 -4.794555,2.148293 -4.794555,4.794555c0,2.646473 2.147871,4.794977 4.794555,4.794977l7.038474,0c0.383978,2.666738 1.093673,5.236373 2.052668,7.652754l-6.09911,3.528842c-2.282337,1.342763 -3.069081,4.256901 -1.74595,6.55887c1.323764,2.300914 4.258379,3.085757 6.540505,1.763682l6.117897,-3.52863c1.64927,2.071244 3.52863,3.952294 5.600297,5.599875l-3.528842,6.117053c-1.324397,2.283393 -0.537443,5.218641 1.764315,6.540294c2.301547,1.324397 5.216741,0.538076 6.55887,-1.745528l3.509632,-6.098265c2.435802,0.958995 5.005648,1.66869 7.671753,2.052668l0,7.038896c0,2.646473 2.148293,4.794344 4.794555,4.794344c2.646473,0 4.794977,-2.147871 4.794977,-4.794344l0,-7.038896c2.666738,-0.383767 5.236584,-1.093673 7.67133,-2.052668l3.510265,6.098265c1.340441,2.283393 4.256901,3.069925 6.55887,1.745528c2.301125,-1.321864 3.085757,-4.256901 1.763682,-6.540294l-3.528419,-6.117053c2.071033,-1.647792 3.952083,-3.528842 5.599664,-5.599875l6.117053,3.52863c2.283393,1.322075 5.218641,0.537232 6.540505,-1.763682c1.324397,-2.301969 0.538076,-5.216108 -1.745739,-6.55887l-6.098265,-3.528842c0.958995,-2.416381 1.66869,-4.986016 2.052668,-7.652754l7.039107,0c2.646262,0 4.794133,-2.148716 4.794133,-4.794977c0,-2.646262 -2.147871,-4.794555 -4.794133,-4.794555l-7.039107,0c-0.383767,-2.666104 -1.093673,-5.235739 -2.052668,-7.653176l6.098265,-3.528208c2.283604,-1.342129 3.070136,-4.257535 1.745739,-6.559081c-1.322075,-2.301969 -4.257112,-3.087446 -6.540505,-1.764315l-6.117053,3.52863c-1.647792,-2.071667 -3.528842,-3.951028 -5.599664,-5.600297l3.528419,-6.117686c1.322075,-2.282337 0.537443,-5.216952 -1.763682,-6.540505c-2.301969,-1.323131 -5.218641,-0.536387 -6.55887,1.74595l-3.510265,6.099321c-2.434747,-0.958995 -5.004593,-1.668901 -7.67133,-2.052879l0,-7.038474c0.000422,-2.646684 -2.148082,-4.794977 -4.794555,-4.794977zm-12.466308,55.618571c0,-5.292524 4.296587,-9.58911 9.589321,-9.58911c5.293368,0 9.589321,4.296587 9.589321,9.58911c0,5.292735 -4.295953,9.589321 -9.589321,9.589321c-5.292735,-0.000211 -9.589321,-4.296587 -9.589321,-9.589321zm19.178643,-18.219858c0,-3.700882 3.011664,-6.712546 6.712968,-6.712546c3.70046,0 6.712124,3.011875 6.712124,6.712546c0,3.701727 -3.011664,6.712546 -6.712124,6.712546c-3.701516,0.000211 -6.712968,-3.010819 -6.712968,-6.712546zm-15.34245,-9.589321c0,-2.646684 2.147871,-4.794555 4.794555,-4.794555c2.646473,0 4.794555,2.147871 4.794555,4.794555c0,2.646262 -2.148293,4.794766 -4.794555,4.794766c-2.646684,0 -4.794555,-2.148293 -4.794555,-4.794766z')

		// scope.enemy.append('circle')
		// 	.classed('lg', true)
		// 	.attr('r', bigR);

		// scope.enemy.append('circle')
		// 	.classed('sm', true)
		// 	.attr('r', smallR);

		scope.enemy.intervalId = setInterval(function () {
			var r, x, y, width, height, enemyBody, clientRect, rockets;
			
			clientRect = scope.enemy.node().getBoundingClientRect();
			
			x = clientRect.left;
			y = clientRect.top;
			width = clientRect.width;
			height = clientRect.height;

			rockets = scope.canvas.selectAll('.rocket.active')
				.each(function () {
					var rocket = d3.select(this),
						clientRect = rocket.select('.rocket-body').node().getBoundingClientRect();
					
					var lives,
						damage,
						explosion;

					if (clientRect.left >= x &&
						clientRect.left <= x + width &&
						clientRect.top >= y &&
						clientRect.top <= y + height) {

						rocket
							.transition()
							.duration(0);
						
						rocket.remove();

						scope.canvas.append('circle')
							.attr('cx', clientRect.left)
							.attr('cy', clientRect.top)
							.attr('r', '5')
							.style('fill', 'rgba(0,0,0,0.1)')
								.transition()
								.duration(600)
									.attr('r', 35)
									.style('opacity', 0.15)
									.remove();

						explosion = d3.select(scope.explosion).select('#Page-1');

						explosion = scope.canvas.node()
							.appendChild(explosion.node().cloneNode(true));

						explosion = d3.select(explosion);

						explosion
							.attr('transform', 'translate(' +
								[clientRect.left - 10, clientRect.top - 10] +')')
							.style('opacity', 0)
							.transition()
							.duration(200)
								.style('opacity', 1);

						explosion
							.transition()
							.delay(200)
							.duration(500)
								.style('opacity', 0)
								.remove();

						damage = Math.round(Math.random() * 12 + 25);

						scope.canvas.append('text')
							.text(damage)
							.attr('x', clientRect.left + 10)
							.attr('y', clientRect.top - 5)
							.style('font-size', 20)
							.transition()
							.duration(1000)
								.style('opacity', 0)
								.style('font-size', 45)
								.remove();

						scope.shooter.updateScore(damage);
						scope.shooter.updateAccuracy({ hit: true });

						lives = parseInt(scope.enemy.attr('lives'), 10) - damage;
						scope.enemy.attr('lives', lives);

						if (lives <= 0) {
							scope.enemy.transition().duration(0);
							clearInterval(scope.enemy.intervalId);
							clearTimeout(scope.enemy.killSwitchId);

							scope.enemy
								.transition()
								.duration(600)
									.style('opacity', 0.1)
									.remove();

							scope.shooter.updateDestroyedCounter();
						}
					}
				});
		}, 30);

		scope.enemy.killSwitchId = setTimeout(function () {
			var lives = scope.enemy.attr('lives');

			clearInterval(scope.enemy.intervalId);

			if (lives > 0) {
				scope.shooter.updateHealth(lives);
			}
		}, t);

		scope.enemy
			.attr('intervalId', scope.enemy.intervalId)
			.attr('killSwitchId', scope.enemy.killSwitchId);
	};

	/* Helpers */
	scope.randomTime = function () {
		return Math.random() * 15000 + 10000;
	};

	scope.randomData = function () {
		return ENEMIES[Math.floor(Math.random() * 3)];
	};

	scope.randomX = function () {
		return Math.random() * scope.width;
	};

	scope.initEnemy();
};