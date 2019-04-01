var points = 60;

// The distance between the points:
var length = 40;

var startTime=0;
var maxTime=2;
var path = new Path({
	strokeColor: '#E4141B',
	strokeWidth: 20,
	strokeCap: 'round'
});
var vectorTo=new Point(0,0)-new Point(0,0);

var start = view.center ;
for (var i = 0; i < points; i++)
    path.add(start + new Point(0, i * length));

//getting current time
startTime=new Date().getSeconds()+maxTime;
var vectorStart=Point.random() * view.size;

//update function with timer of maxTime seconds
function onFrame(){

    if(startTime+maxTime==new Date().getSeconds()){
        startTime=new Date().getSeconds();
        vectorStart = Point.random() * view.size; 
        }
        vectorTo= vectorStart - path.firstSegment.point;
            path.firstSegment.point+= vectorTo / 30;
            for (var i = 0; i < points-2 ; i++) {
                var segment = path.segments[i];
                var nextSegment = segment.next;
                var vector = segment.point - nextSegment.point;
                vector.length = length;
                nextSegment.point = segment.point - vector;
            }
            path.smooth({ type: 'continuous' });
            if(vectorTo.length < 10){
                vectorStart = Point.random() * view.size;
        }
        
        
    }
    function onMouseDown(event) {
        vectorStart=event.point;
      }
       




