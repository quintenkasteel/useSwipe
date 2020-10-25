'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var useSwipe = function useSwipe(element, preventDefault) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var _useState = (0, _react.useState)({
    startX: 0,
    startY: 0,
    endY: 0,
    endX: 0,
    startTime: new Date(),
    direction: 'RIGHT'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      swipe = _useState2[0],
      setSwipe = _useState2[1];

  // handle the start of the swipe


  var handleStart = (0, _react.useCallback)(function (event) {
    //   preventDefault && event.preventDefault();
    var touch = event.changedTouches[0];
    setSwipe(_extends({}, swipe, {
      startX: touch.pageX,
      startY: touch.pageY,
      startTime: new Date().getTime()
    }));
    return swipe;
  }, [swipe]);
  // handle the end of the swipe
  var handleEnd = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var touch = event.changedTouches[0];
    var direction = touch.pageX - swipe.startX > 20 && 'RIGHT' || swipe.startX - touch.pageX > 20 && 'LEFT' || touch.pageY - swipe.startY > 20 && 'DOWN' || swipe.startY - touch.pageY > 20 && 'UP';

    setSwipe(_extends({}, swipe, {
      endX: touch.pageX,
      endY: touch.pageY,
      elapsedTime: new Date().getTime() - swipe.startTime,
      swipeDirection: direction,
      swipeAmount: direction === 'LEFT' && touch.pageX - swipe.startX || direction === 'RIGHT' && touch.pageX - swipe.startX || direction === 'UP' && swipe.startY - touch.pageY || direction === 'DOWN' && touch.pageY - swipe.startY
    }));
    return swipe;
  }, [swipe]);

  // handle the cancellation of the swipe
  var handleCancel = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    return null;
  }, []);
  // handle the move during swipe
  var handleMove = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    return null;
  }, []);

  //Listeners for the user touch -
  // {passive: false} is used for removing default scroll if swiping on the game area.
  // handleStart, handleEnd, handleCancel, handleMove
  (0, _react.useEffect)(function () {
    // detect for the game area as touch area
    var touchSurface = document.querySelector(element || 'body');
    touchSurface.addEventListener('touchstart', handleStart, {
      passive: false
    });
    touchSurface.addEventListener('touchend', handleEnd, {
      passive: false
    });
    touchSurface.addEventListener('touchcancel', handleCancel, {
      passive: false
    });
    touchSurface.addEventListener('touchmove', handleMove, {
      passive: false
    });

    return function () {
      touchSurface.removeEventListener('touchstart', handleStart, {
        passive: false
      });
      touchSurface.removeEventListener('touchend', handleEnd, {
        passive: false
      });
      touchSurface.removeEventListener('touchcancel', handleCancel, {
        passive: false
      });
      touchSurface.removeEventListener('touchmove', handleMove, {
        passive: false
      });
    };
  }, [handleStart, handleCancel, handleMove, handleEnd, element]);
  return swipe;
};

exports.default = useSwipe;