/*
 * coco
 * CSS Orientation Controls
 * By Bar Hatsor (MIT License)
 *
 * CSS Euclidean Positioning System
 * With manual user drag (rotate) and keypad (move) override handling
 */

Element.prototype.coco = function ( defaults ) {

	/* "this" is an Element */
	var object = this;


	var active = false;
	var click = false;

	var currentX = 0;
	var initialX = 0;
	var xOffset = 0;

	var posX = 0;
	var posY = 0;
	var posZ = 0;

	
	/*
	 * Add transform-style: preserve-3d to object
	 */
	
	object.style.transformStyle = 'preserve-3d';


	/*
	 * Original transform of object
	 */

	var origTransform = window.getComputedStyle( object ).transform;

	if ( origTransform == 'none' ) {

		origTransform = '';

	}


	/*
	 * Check if enabled default controls
	 */
	
	if ( defaults !== false ) {


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

		document.addEventListener( "keydown", checkKey, false );

		/*
		 * Touch events for mobile
		 */

		document.addEventListener( "touchstart", dragStart, false );
		document.addEventListener( "touchend", dragEnd, false );
		document.addEventListener( "touchmove", drag, false );
		

	}


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

			object.dispatchEvent( new MouseEvent( "click", {
			    "view": window,
			    "bubbles": true,
			    "cancelable": false
			} ) );

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

			updateTransform();

			click = false;

		}

	}

	function checkKey( e ) {

		if ( e.keyCode == '37' || e.keyCode == '65' ) { // left

			posX += 3;

		} else if ( e.keyCode == '39' || e.keyCode == '68' ) { // right

			posX -= 3;

		} else if ( e.keyCode == '32' ) { // up

			posY += 3;

		} else if ( e.keyCode == '16' ) { // down

			posY -= 3;

		} else if ( e.keyCode == '38' || e.keyCode == '87' ) { // forwards

			posZ += 3;

		} else if ( e.keyCode == '40' || e.keyCode == '83' ) { // backwards

			posZ -= 3;

		} 

		updateTransform();

	}
	
	
	/*
	 * Change rotation of object
	 * while keeping original transform
	 */

	function updateTransform() {

		object.style.transform = 'translate3d(' + posX + 'px ' + posY + 'px ' + posZ + 'px) ' +
					 'rotateX(' + currentX + 'deg) ' +
			                 'rotateY(' + currentX + 'deg) ' +
			                 origTransform;

	}


	return {

		/*
		 * Camera control
		 */

		camera: function ( x, y, z ) {

			posX = x;
			posY = y;
			posZ = z;

			updateTransform();

		}
	};


};


/*
 * NodeList support
 * Eg. document.querySelectorAll
 * or Element.children

 * Note: coco interactions are grouped
 * when using NodeList. Use individual calls
 * to Element when needing seperate handlers.
 */

NodeList.prototype.coco = function ( defaults ) {

	/* "this" is a NodeList */
	var objects = this;


	var active = false;
	var click = false;

	var currentX = 0;
	var initialX = 0;
	var xOffset = 0;

	var posX = 0;
	var posY = 0;
	var posZ = 0;
	

	var origTransforms = [];


	for ( var i = 0; i < objects.length; i ++ ) {
		
		/*
		 * Add transform-style: preserve-3d to object
		 */

		objects[ i ].style.transformStyle = 'preserve-3d';

		/*
		 * Original transform of object
		 */

		origTransforms.push( window.getComputedStyle( objects[ i ] ).transform );

		if ( origTransforms[ i ] == 'none' ) {

			origTransforms[ i ] = '';

		}

	}


	/*
	 * Check if enabled default controls
	 */
	
	if ( defaults !== false ) {

		/*
		 * Disabling pointer events on objects to:
		 * I. Disable default dragging behavior.
		 * II. Disable clicking when dragging.
		 */

		for ( var i = 0; i < objects.length; i ++ ) {

			objects[ i ].style.pointerEvents = 'none';

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

		document.addEventListener( "keydown", checkKey, false );

		/*
		 * Touch events for mobile
		 */

		document.addEventListener( "touchstart", dragStart, false );
		document.addEventListener( "touchend", dragEnd, false );
		document.addEventListener( "touchmove", drag, false );

	}
	
	
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

				objects[ i ].dispatchEvent( new MouseEvent( "click", {
				    "view": window,
				    "bubbles": true,
				    "cancelable": false
				} ) );

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

			updateTransforms();

			click = false;

		}

	}

	function checkKey( e ) {

	    	if ( e.keyCode == '37' || e.keyCode == '65' ) { // left

			posX += 3;

		} else if ( e.keyCode == '39' || e.keyCode == '68' ) { // right

			posX -= 3;

		} else if ( e.keyCode == '32' ) { // up

			posY += 3;

		} else if ( e.keyCode == '16' ) { // down

			posY -= 3;

		} else if ( e.keyCode == '38' || e.keyCode == '87' ) { // forwards

			posZ += 3;

		} else if ( e.keyCode == '40' || e.keyCode == '83' ) { // backwards

			posZ -= 3;

		} 

		updateTransforms();

	}
	

	/*
	 * Change rotation of objects
	 * while keeping original transform
	 */

	function updateTransforms() {

		for ( var i = 0; i < objects.length; i ++ ) {

			objects[ i ].style.transform = 'translate3d(' + posX + 'px ' + posY + 'px ' + posZ + 'px) ' +
			                 	       'rotateY(' + currentX + 'deg) ' +
			              	     	       origTransforms[ i ];
			
		}

	}


	return {

		/*
		 * Camera control
		 */

		camera: function ( x, y, z ) {

			posX = x;
			posY = y;
			posZ = z;

			updateTransforms();

		}
	};

};
