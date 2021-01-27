/*
 * coco
 * CSS Orientation Controls
 * By Bar Hatsor (MIT License)
 *
 * Manual user drag (rotate) override handling
 */

Element.prototype.coco = function () {

	/* "this" is an Element */
	var object = this;


	var active = false;
	var click = false;

	var currentX;
	var initialX;
	var xOffset = 0;


	/*
	 * Original transform of object
	 */

	var origTransform = window.getComputedStyle( object ).transform;


	/*
	 * Disabling pointer events on object to:
 	 * I. Disable default dragging behavior.
	 * II. Disable clicking when dragging.
	 */

	object.style.pointerEvents = 'none';


	/*
	 * Add grab cursor to document, indicate draggable
	 */

	document.documentElement.style.cursor = 'grab';


	/*
	 * Adding event listeners on document
	 */

	document.addEventListener( "mousedown", dragStart, false );
	document.addEventListener( "mouseup", dragEnd, false );
	document.addEventListener( "mousemove", drag, false );

	/*
	 * Touch events for mobile
	 */

	document.addEventListener( "touchstart", dragStart, false );
	document.addEventListener( "touchend", dragEnd, false );
	document.addEventListener( "touchmove", drag, false );



	function dragStart( e ) {

		if ( e.type === "touchstart" ) {

			initialX = e.touches[ 0 ].clientX - xOffset;

		} else {

			initialX = e.clientX - xOffset;

		}

		active = true;
		click = true;

	}

	function dragEnd() {

		initialX = currentX;

		xOffset = currentX;
		active = false;


		/*
		 * Click detection.
		 * Simulates click if not dragging to compensate
		 * disabling pointer events on object.
		 */

		if ( click == true ) {

			object.click();

		}


	}

	function drag( e ) {

		if ( active ) {

			e.preventDefault();

			if ( e.type === "touchmove" ) {

				currentX = e.touches[ 0 ].clientX - initialX;

			} else {

				currentX = e.clientX - initialX;

			}

			xOffset = currentX;


			/*
			 * Change rotation of object
			 * while keeping original transform
			 */

			object.style.transform = origTransform + ' rotateY(' + currentX + 'deg)';


			click = false;

		}

	}

};


/*
 * NodeList support
 * Eg. document.querySelectorAll
 * or Element.children

 * Note: coco interactions are grouped
 * when using NodeList. Use individual calls
 * to Element when needing seperate handlers.
 */

NodeList.prototype.coco = function () {

	/* "this" is a NodeList */
	var objects = this;


	var active = false;
	var click = false;

	var currentX;
	var initialX;
	var xOffset = 0;


	var origTransforms = [];


	/*
	 * Disabling pointer events on objects to:
 	 * I. Disable default dragging behavior.
	 * II. Disable clicking when dragging.
	 */

	for ( var i = 0; i < objects.length; i ++ ) {

		objects[ i ].style.pointerEvents = 'none';

		/*
		 * Original transform of object
		 */

		origTransforms.push( window.getComputedStyle( objects[ i ] ).transform );

	}


	/*
	 * Add grab cursor to document, indicate draggable
	 */

	document.documentElement.style.cursor = 'grab';


	/*
	 * Adding event listeners on document
	 */

	document.addEventListener( "mousedown", dragStart, false );
	document.addEventListener( "mouseup", dragEnd, false );
	document.addEventListener( "mousemove", drag, false );

	/*
	 * Touch events for mobile
	 */

	document.addEventListener( "touchstart", dragStart, false );
	document.addEventListener( "touchend", dragEnd, false );
	document.addEventListener( "touchmove", drag, false );



	function dragStart( e ) {

		if ( e.type === "touchstart" ) {

			initialX = e.touches[ 0 ].clientX - xOffset;

		} else {

			initialX = e.clientX - xOffset;

		}

		active = true;
		click = true;

	}

	function dragEnd() {

		initialX = currentX;

		xOffset = currentX;
		active = false;


		/*
		 * Click detection.
		 * Simulates click if not dragging to compensate
		 * disabling pointer events on objects.
		 */

		if ( click == true ) {

			for ( var i = 0; i < objects.length; i ++ ) {

				objects[ i ].click();

			}

		}


	}

	function drag( e ) {

		if ( active ) {

			e.preventDefault();

			if ( e.type === "touchmove" ) {

				currentX = e.touches[ 0 ].clientX - initialX;

			} else {

				currentX = e.clientX - initialX;

			}

			xOffset = currentX;


			for ( var i = 0; i < objects.length; i ++ ) {

				/*
				 * Change rotation of object
				 * while keeping original transform
				 */

				objects[ i ].style.transform = origTransforms[ i ] + ' rotateY(' + currentX + 'deg)';

			}


			click = false;

		}

	}

};

