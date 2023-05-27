var Shooter = function () {
	var scope = this;

	var gameEasy = 3200;
	var gameNormal = 2400;
	var gameHard = 1200;
	
	d3.xml('/images/explosion.svg', function (xml) {
		scope.explosion = xml.documentElement;

		scope.initCanvas();
		scope.initThemeSwitcher();
		scope.initBackground();
		scope.initDimensions();
		scope.addCannon();

		scope.initScore();
		scope.initTimer();
		scope.initDestroyedCounter();
		scope.initAccuracy();
		scope.initHealthbar();
		scope.initResistancebar();
	
		d3.select('button').on('click', function () {
			scope.start();

			d3.select('.game-over').remove();

			d3.select('.modal')
				.transition()
				.duration(600)
					.style('height', '0px')
					.style('opacity', 0.1);
		});
	});

	scope.start = function () {
		var healthBar,
			healthLabel, 
			healthCaption,
			resistanceLabel,
			resistanceCaption;

		switch(d3.select('input[name="radio"]:checked').node().value) {
  		case '1':
			scope.T = gameEasy;
			break;
  		case '2':
			scope.T = gameNormal;
			break;
		case '3':
			scope.T = gameHard;
			break;
  		default:
			scope.T = gameEasy;
			break;
		}
		console.log(scope.T);
		scope.hits = 0;
		scope.fired = 0;
		scope.addEnemyHealth = 100;
		
		scope.initScore();
		scope.initTimer();
		scope.initDestroyedCounter();
		scope.initAccuracy();

		scope.timerIntervalId = setInterval(function () {
			var value;

			scope.updateCounter(scope.timer, 1);
			value = scope.timer.attr('value');

			if (value % 5 === 0) {
				scope.T -= 50;
			}

			value = parseInt(scope.healthContaner.attr('health'), 10);
			if (value + 1 < 370) {
				scope.updateHealth(-1);
			}

		}, 1000);

		// Init healt bar
		scope.healthContaner.attr('health', 370)
		healthBar = scope.healthContaner.select('.bar-health');

		if (!healthBar.node()) {
			healthBar = scope.healthContaner
				.append('rect')
				.classed('bar-health', true)
				.attr('y', 10)
				.attr('rx', 2)
				.attr('ry', 2)
				.attr('height', 20);
		}

		healthBar
			.attr('width', 0)
			.transition()
			.duration(600)
				.attr('width', 370)
				.style('fill', '#1ECD97');

		healthLabel = scope.healthContaner.select('.label');
		healthCaption = scope.healthContaner.select('.caption');

		if (!healthLabel.node()) {
			healthLabel = scope.healthContaner.append('text')
				.classed('label', true)
				.attr('x', 185)
				.attr('y', 25);
		}
		if (!healthCaption.node()) {
			healthCaption = scope.healthContaner.append('text')
				.classed('caption', true)
				.attr('x', 20)
				.attr('y', 25);
		}

		healthLabel.text('100%');
		healthCaption.text('Health');

		// Init resistance
		scope.resistanceContaner.attr('resistance', 370)
		resistanceBar = scope.resistanceContaner.select('.bar-resistance');

		if (!resistanceBar.node()) {
			resistanceBar = scope.resistanceContaner
				.append('rect')
				.classed('bar-resistance', true)
				.attr('y', 10)
				.attr('rx', 2)
				.attr('ry', 2)
				.attr('height', 20);
		}

		resistanceBar
			.attr('width', 0)
			.transition()
			.duration(600)
				.attr('width', 370)
				.style('fill', '#1ECD97');

		resistanceLabel = scope.resistanceContaner.select('.label');
		resistanceCaption = scope.resistanceContaner.select('.caption');

		if (!resistanceLabel.node()) {
			resistanceLabel = scope.resistanceContaner.append('text')
				.classed('label', true)
				.attr('x', 185)
				.attr('y', 25);
		}
		if (!resistanceCaption.node()) {
			resistanceCaption = scope.resistanceContaner.append('text')
				.classed('caption', true)
				.attr('x', 35)
				.attr('y', 25);
		}
		resistanceLabel.text('0%');
		resistanceCaption.text('Resistance');

		scope.addEnemy();
		scope.scheduleNewEnemy();
	};

	scope.gameover = function () {
		clearInterval(scope.gameIntervalId);
		clearInterval(scope.timerIntervalId)

		scope.canvas.append('text')
			.text('Game Over')
			.classed('game-over', true)
			.attr('x', scope.width / 2)
			.attr('y', scope.height - 200)
			.transition()
			.duration(3000)
				.style('opacity', 1)
				.style('font-size', 45);
		
		scope.game.selectAll('g')
			.transition()
			.duration(2000)
			.each(function () {
				var node = d3.select(this);

				clearInterval(node.attr('intervalId'));
				clearTimeout(node.attr('killSwitchId'));
			})
			.style('opacity', 0)
			.remove();

		d3.select('.modal')
			.transition()
			.duration(600)
				.style('height', '320px')
				.style('opacity', 1);
	};

	scope.initCanvas = function () {
		scope.canvas = d3.select('.container')
			.append('svg')
			.classed('main', true)
			.attr('width', '100%')
			.attr('height', '100%');

		scope.background = scope.canvas
			.append('g')
			.classed('background', true);
		
		scope.game = scope.canvas
			.append('g')
			.classed('game', true);
	};

	scope.initDimensions = function () {
		var clientRect = scope.canvas
			.node().getBoundingClientRect();
		
		scope.width = clientRect.width;
		scope.height = clientRect.height;
	};

	scope.initBackground = function () {
		setInterval(function () {
			var x = Math.floor(Math.random() * scope.width);

			scope.background
				.append('circle')
				.classed('bg-circle', true)
				.attr('r', 1)
				.attr('cx', x)
				.attr('cy', 0)
					.transition()
					.duration(10000)
						.ease('linear')
						.attr('cx', x)
						.attr('cy', scope.height)
						.remove();
		}, 500);
	};

	scope.initThemeSwitcher = function () {
		d3.select('.color-theme').on('click', function () {
			var container = d3.select('.container');

			if (container.classed('dark')) {
				container.classed('dark', false);
				d3.select('#Page-1').remove();
				scope.addCannon();
				scope.initHealthbar();
				scope.initResistancebar('');
			} else {
				container.classed('dark', true);
				d3.select('#Page-1').remove();
				scope.addCannon();
				scope.initHealthbar();
				scope.initResistancebar('dark');
			}
		});
	};

	scope.initScore = function () {
		scope.score = scope.initCounter('score');
		scope.susceptible = scope.initCounter('susceptible');
		scope.intermediate = scope.initCounter('intermediate');
		scope.resistant = scope.initCounter('resistant');
	};

	scope.updateScore = function (value) {
		scope.updateCounter(scope.score, value);
	};

	scope.updateBacteriasScore = function (bacteria, value) {
		switch(bacteria) { 
			case 'susceptible':
				scope.updateCounter(scope.susceptible, value);
				break;
			case 'intermediate':
				scope.updateCounter(scope.intermediate, value);
				break;
			case 'resistant':
				scope.updateCounter(scope.resistant, value);
				break;
			default: 
				scope.updateCounter(scope.score, value);
				break;
		}
	};

	scope.initTimer = function () {
		scope.timer = scope.initCounter('timer');
	};

	scope.initDestroyedCounter = function () {
		scope.destroyed = scope.initCounter('destroyed');
	};

	scope.updateDestroyedCounter = function () {
		scope.updateCounter(scope.destroyed, 1);	
	};

	scope.initAccuracy = function () {
		scope.hits = 0;
		scope.fired = 0;
		scope.accuracyValue = 100;
		scope.accuracy = scope.initCounter('accuracy');
	};

	scope.updateAccuracy = function (params) {
		if (params.fire) {
			scope.fired++;
		} else {
			scope.hits++;
		}

		scope.updateCounter(scope.accuracy);
	};

	scope.initHealthbar = function () {
		scope.healthContaner = d3.select('.healthbar svg')
			.attr('health', 370);

		scope.healthContaner.append('rect')
			.classed('bar-background', true)
			.attr('y', 10)
			.attr('rx', 2)
			.attr('ry', 2)
			.attr('width', 370)
			.attr('height', 20);
	};

	scope.initResistancebar = function (mode) {
		scope.resistanceContaner = d3.select('.resistancebar svg')
			.attr('resistance', 370);

		scope.resistanceContaner.append('rect')
			.classed('bar-background', true)
			.attr('y', 10)
			.attr('rx', 2)
			.attr('ry', 2)
			.attr('width', 370)
			.attr('height', 20);

			d3.select('.resistancebar svg').attr('display', 'block');
			d3.select('.bottombar').style('bottom', null);
		 	d3.select('.bottombar').style('top', '175px');
			d3.select('.lebedev-disclaimer').style('display', 'none');
			d3.select('.bacteriabar').style('display', 'block');

		// if (mode === 'dark') { 
		// 	d3.select('.resistancebar svg').attr('display', 'block');
		// 	d3.select('.bottombar').style('bottom', '10px');
		// 	d3.select('.bottombar').style('top', null);
		// 	d3.select('.lebedev-disclaimer').style('display', 'none');
		// 	d3.select('.bacteriabar').style('display', 'block');
		// } else { 
		// 	d3.select('.resistancebar svg').attr('display', 'none');
		// 	d3.select('.bottombar').style('bottom', null);
		// 	d3.select('.bottombar').style('top', '100px');
		// 	d3.select('.lebedev-disclaimer').style('display', 'block');
		// 	d3.select('.bacteriabar').style('display', 'none');
		// }
		
	};

	scope.updateHealth = function (damage) {
		var health,
			percentage;

		health = this.healthContaner.attr('health');
		health -= damage;

		if (health < 0) {
			health = 0;
			scope.gameover();
		}

		percentage = d3.round(health / 370 * 100);

		this.healthContaner.attr('health', health);

		this.healthContaner
			.select('.bar-health')
			.transition()
			.duration(600)
				.attr('width', health)
				.style('fill', function () {
					var red = '#d9534f',
						orange = '#f0ad4e',
						green = '#1ECD97';

					if (percentage > 60) {
						return green;
					} else if (percentage > 25) {
						return orange;
					} else {
						return red;
					}
				});

		this.healthContaner
			.select('.label')
			.text(percentage + '%');
	};

	scope.updateResistance = function (value) {
		resistance = value/100*370;
		percentage = Math.round(value);

		this.resistanceContaner.attr('resistance', resistance);

		this.resistanceContaner
			.select('.bar-resistance')
			.transition()
			.duration(600)
				.attr('width', resistance)
				.style('fill', function () {
					var red = '#d9534f',
						orange = '#f0ad4e',
						green = '#1ECD97';

					if (percentage > 60) {
						return red;
					} else if (percentage > 30) {
						return orange;
					} else {
						return green;
					}
				});

		this.resistanceContaner
			.select('.label')
			.text(percentage + '%');
	};

	scope.initCounter = function (id) {
		var counter = d3.select('#' + id + ' svg');

		var text = counter
			.attr('value', 0)
			.selectAll('text')
			.data([{ value: 0, id: 0} ], function (d) {
				return d.id;
			});

		text
			.transition()
			.duration(200)
			.text(function (d) { return d.value; })
			.attr('y', 20)
			.attr('x', function(d, i) { return i * 12; })
			.style('fill-opacity', 1);

		// ENTER
		text.enter().append('text')
			.attr('dy', '.35em')
			.attr('y', -10)
			.attr('x', function(d, i) { return i * 12; })
			.style('fill-opacity', 1e-6)
			.text(function(d) { return d.value; })
			.transition()
			.duration(200)
			.attr('y', 20)
			.style('fill-opacity', 1);

		// EXIT
		text.exit()
			.transition()
			.duration(200)
			.attr('y', 50)
			.style('fill-opacity', 1e-6)
			.remove();

		return counter;
	};

	scope.updateCounter = function (counter, increment) {
		var currVal,
			newVal,
			currValStr,
			newValStr,
			destroyed,
			data,
			text;

		if (increment) {
			currValStr = counter.attr('value');
			currVal = parseInt(currValStr);

			newVal = currVal + increment;
			newValStr = newVal.toString();

			counter.attr('value', newVal);
		} else {
			scope.accuracyValue = d3.round(scope.hits / scope.fired * 100);
			newValStr = scope.accuracyValue + '%';
		}

		data = newValStr.split('').map(function (value, i) {
			return {
				value: value,
				id: i + '-' + value
			};
		});

		text = counter.selectAll('text')
			.data(data, function (d) {
				return d.id;
			});

		// UPDATE
		text
		   .transition()
		     .duration(200)
		     .text(function (d) { return d.value; })
		     .attr('y', 20)
		     .attr('x', function(d, i) { return i * 12; })
		     .style('fill-opacity', 1);

		// ENTER
		text.enter().append('text')
			.attr('dy', '.35em')
			.attr('y', -10)
			.attr('x', function(d, i) { return i * 12; })
			.style('fill-opacity', 1e-6)
			.text(function(d) { return d.value; })
			.transition()
			.duration(200)
				.attr('y', 20)
				.style('fill-opacity', 1);

		// EXIT
		text.exit()
			.transition()
			.duration(200)
				.attr('y', 50)
				.style('fill-opacity', 1e-6)
				.remove();
	};

	scope.addCannon = function () {
		new Cannon({ shooter: scope });
	};

	scope.addEnemy = function () {
		new Enemy({ shooter: scope });
	};

	scope.scheduleNewEnemy = function () {
		scope.gameIntervalId = setTimeout(function () {
			scope.addEnemy();
			scope.scheduleNewEnemy();
		}, scope.T);
	};
	
};