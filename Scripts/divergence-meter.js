function generateRandomIntegerNumber(minimalValue, maximalValue) {
	return Math.floor(Math.random() * (maximalValue - minimalValue + 1)) + minimalValue;
}

function randomizeImage(frameData, token) {
	imageList = [];
	if (frameData.HTMLElement.hasClass("digit")) imageList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	//if (frameData.HTMLElement.hasClass("dot")) imageList = ["dot"];
	//if (frameData.HTMLElement.hasClass("major-digit")) imageList = ["0", "1", "2", "3"];
	if (imageList.length == 0) return;

	index = generateRandomIntegerNumber(0, imageList.length - 1);
	frameData.HTMLElement.css("background-image", "url(image/" + imageList[index] + ".png)");
	if (token) {
		for (var i = 0; i < token.length; i++) {
			$(".frame").eq(i).css("background-image", "url(image/" + token[i] + ".png)");
		}
	}
}

function initializeDivergenceMeter(configuration) {
	frameDataList = [];
	frameHTMLElementList = configuration.divergenceMeterElement.children(".frame");
	frameHTMLElementList.each(function () {
		frameDataList.push({
			HTMLElement: $(this),
			remainingIterationNumber: 0
		});
	});
	initializeTransition(frameDataList, configuration);
}

function initializeTransition(frameDataList, configuration) {
	maximalAdditionnalIterationNumber = configuration.maximalTransitionNumber - configuration.minimalTransitionNumber;

	for (key in frameDataList) {
		additionnalIterationNumber = generateRandomIntegerNumber(0, maximalAdditionnalIterationNumber);
		frameDataList[key].remainingIterationNumber = configuration.minimalTransitionNumber + additionnalIterationNumber;
	}

	setTimeout(function () {
		updateTimeLine(frameDataList, configuration);
		//这里可以写Ajax
	}, generateRandomIntegerNumber(configuration.minimalUpdateDelay, configuration.maximalUpdateDelay));
}

function updateTimeLine(frameDataList, configuration) {
	activeFrameNumber = 0;

	for (key in frameDataList) {
		if (frameDataList[key].remainingIterationNumber > 0) {
			randomizeImage(frameDataList[key], false);
			frameDataList[key].remainingIterationNumber--;
			activeFrameNumber++;
		} else {
			randomizeImage(frameDataList[key], configuration.Number);
		}
	}

	if (activeFrameNumber == 0) {
		if (configuration.one) {
			return;
		}
		return initializeTransition(frameDataList, configuration);
	}

	setTimeout(function () { updateTimeLine(frameDataList, configuration); }, configuration.transitionDelay);
}
