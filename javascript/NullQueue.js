/**
 * Instantiate a NullQueue and set the threshold timeout value
 * to be used for nulling items in the queue.
 *
 * @constructor
 * @param {Integer} threshold The timeout value
 */
function NullQueue(threshold) {

    this.threshold = threshold;
    this.queue = [];
    this.timerId = null;

}

/**
 * Push an item on to the queue.
 *
 * Every time an item is pushed on to the queue, the
 * timeout is reset.
 *
 * @param {Function} item Item to execute
 */
NullQueue.prototype.push = function(item){

    var me = this;

    me.queue.push(item);

    if (null !== me.timerId) {
        clearTimeout(me.timerId);
    }

    me.timerId = setTimeout(function(){
        me.process();
    }, me.threshold);
};

/**
 * Process the queue.
 *
 * All items, except for the last item in the queue
 * are nulled. The last item is then executed.
 *
 * @private
 */
NullQueue.prototype.process = function() {

    var me = this;

    var item = me.queue[me.queue.length - 1];
    me.queue = [];

    item.call();
};

/**
 * Test the NullQueue implementation
 *
 * Move the mouse around inside the browser. Your current cursor
 * coordinates will be shown in an alert when you hold the cursor
 * still for 500ms.
 *
 * @test
 */
function testNullQueue(){

    var testQueue = new NullQueue(500);

    document.addEventListener("mousemove", function(ev){

        testQueue.push(function(){
              alert("Mouse: x=" + ev.pageX + ", y=" + ev.pageY);
        });

    }, false);
}

testNullQueue();
