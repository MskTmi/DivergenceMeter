$(function () {
	// 单次运行：显示静态数字
	initializeDivergenceMeter({
		minimalUpdateDelay: 5000,           // 动态模式下，最小刷新间隔（ms）
		maximalUpdateDelay: 15000,          // 动态模式下，最大刷新间隔（ms）
		minimalTransitionNumber: 8,         // 每帧最少闪烁次数
		maximalTransitionNumber: 20,        // 每帧最多闪烁次数
		transitionDelay: 60,                // 每次闪烁间隔（ms）
		cycleRun: true,                     // 循环运行（每隔10-20s获取一次数字）
		Number: '1.048596'
	});
	
	// 打印开源信息
	printProjectInfo()
});

// 初始化函数
function initializeDivergenceMeter(options) {
	var $frames = $('.divergence-meter').find('.frame');
	runTransition($frames, options);
}

// 生成 [min, max] 范围内的随机整数
function generateRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 异步获取数字字符串（通过 AJAX 请求后端 .ashx），失败时使用随机数
function getToken() {
	return new Promise(function (resolve) {
		$.ajax({
			type: 'POST',
			url: './xxxxx.ashx',
			dataType: 'text',
			success: function (data) {
				console.log('获取成功:', data);
				resolve(String(data));
			},
			error: function () {
				console.error('获取失败，使用随机数代替');
				// 随机生成 8 位数字字符串
				var random = String(generateRandomInteger(0, 99999999)).padStart(8, '0');
				console.log('随机数:', random);
				resolve(random);
			}
		});
	});
}

// 设置指定帧的背景图为对应字符（数字或小数点）
function setFrameImage($frame, ch) {
	var fileName = (ch === '.') ? 'dot' : ch;
	$frame.css('background-image', 'url(image/' + fileName + '.png)');
}

// 执行一次闪烁动画并显示最终字符序列（无中途停顿）
function runTransition($frames, opts) {
	var counts = [];
	var reveals = [];
	var token;
	var range = opts.maximalTransitionNumber - opts.minimalTransitionNumber + 1;

	// 随机分配每帧闪烁次数，并初始化 reveals
	$frames.each(function (i) {
		counts[i] = opts.minimalTransitionNumber + generateRandomInteger(0, range - 1);
		reveals[i] = false;
	});

	// 获取或使用静态 Number
	var finalTokenPromise = (opts.Number && opts.Number.length) ? Promise.resolve(opts.Number) : getToken();

	finalTokenPromise.then(function (str) {
		// 调整长度
		if (str.length < $frames.length) {
			str = str.padStart($frames.length, '0');
		}
		if (str.length > $frames.length) {
			str = str.slice(0, $frames.length);
		}

		token = str;

		// 预先显示小数点帧并标记为已 reveal
		$frames.each(function (i) {
			if (token.charAt(i) === '.') {
				setFrameImage($frames.eq(i), '.');
				reveals[i] = true;
			}
		});

		// 启动循环：每 transitionDelay 一次，直到所有 reveals true
		var intervalId = setInterval(function () {
			var allRevealed = true;
			$frames.each(function (i) {
				if (!reveals[i]) {
					allRevealed = false;
					if (counts[i] > 0) {
						// 抖动
						setFrameImage($(this), String(generateRandomInteger(0, 9)));
						counts[i]--;
					} else {
						// 达到次数，立即 reveal
						setFrameImage($(this), token.charAt(i));
						reveals[i] = true;
					}
				}
			});
			if (allRevealed) {
				clearInterval(intervalId);
				// 若循环模式，延迟后重新启动
				if (opts.cycleRun) {
					setTimeout(function () {
						runTransition($frames, opts);
					}, generateRandomInteger(opts.minimalUpdateDelay, opts.maximalUpdateDelay));
				}
			}
		}, opts.transitionDelay);
	});
}

// 开源信息
function printProjectInfo() {
    var license = "MIT License";
    var github = "https://github.com/MskTmi/DivergenceMeter";
    var disclaimer = "This project is for learning and reference only, and does not bear any responsibility.";
    console.group("Project Information");

    console.log("%cThis project is licensed under the " + license, "color: darkorange; font-size: 20px;");
    console.log("%cThe source code for this project is hosted on " + github, "color: darkorange; font-size: 20px;");
    console.log("%cDisclaimer: " + disclaimer, "color: darkorange; font-size: 20px;");

    console.groupEnd();
}