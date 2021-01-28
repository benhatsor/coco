/*
 * coco
 * CSS Orientation Controls
 * By Bar Hatsor (MIT License)
 *
 * Manual user drag (rotate) and keypad (move) override handling
 */

Element.prototype.coco = function () {

	/* "this" is an Element */
	var object = this;


	var active = false;
	var click = false;

	var currentX;
	var initialX;
	var xOffset = 0;
	
	var posX = 0;
	var posZ = 0;


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
	
	document.addEventListener( "keydown", checkKey, false );

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

			updateTransform();

			click = false;

		}

	}
	
	function checkKey( e ) {

            // up
	    if (e.keyCode == '38' || e.keyCode == '87') {
		posZ++;
	    }
		
            // down
	    else if (e.keyCode == '40' || e.keyCode == '83') {
		posZ--;
	    }
		
	    // left
	    else if (e.keyCode == '37' || e.keyCode == '65') {
		posX++;
	    }
		
            // right
	    else if (e.keyCode == '39' || e.keyCode == '68') {
		posX--;
	    }
	    	
            updateTransform();

	}

	
	/*
	 * Change rotation of object
	 * while keeping original transform
	 */
	
	function updateTransform() {
		
		object.style.transform = 'translateX(' + posX + 'px) ' +
					 'translateY(' + posZ + 'px) ' +
			                 'rotateY(' + currentX + 'deg) ' +
			                 origTransform;
		
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
	
	var posX = 0;
	var posZ = 0;


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
	
	document.addEventListener( "keydown", checkKey, false );

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

			updateTransforms();

			click = false;

		}

	}
	
	function checkKey( e ) {

            // up
	    if (e.keyCode == '38' || e.keyCode == '87') {
		posZ++;
	    }
		
            // down
	    else if (e.keyCode == '40' || e.keyCode == '83') {
		posZ--;
	    }
		
	    // left
	    else if (e.keyCode == '37' || e.keyCode == '65') {
		posX++;
	    }
		
            // right
	    else if (e.keyCode == '39' || e.keyCode == '68') {
		posX--;
	    }
	    	
            updateTransforms();

	}

	/*
	 * Change rotation of objects
	 * while keeping original transform
	 */
	
	function updateTransforms() {
		
		for ( var i = 0; i < objects.length; i ++ ) {
				
			objects[ i ].style.transform = 'translateX(' + posX + 'px) ' +
						       'translateY(' + posZ + 'px) ' +
						       'rotateY(' + currentX + 'deg) ' +
						       origTransforms[ i ];
		}
		
	}

};

