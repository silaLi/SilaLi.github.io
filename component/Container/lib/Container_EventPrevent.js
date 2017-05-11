// merge to Event
;Container.set('PreventDefault', function() {
	return function(e) {
	    e.preventDefault()
	    e.stopPropagation()
	    return false
	}
});