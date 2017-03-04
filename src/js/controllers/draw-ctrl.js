

angular
    .module('RDash')
    .controller('DrawCtrl', ['$scope','$window','$location' ,DrawCtrl]);

function DrawCtrl($scope,$window,$location) {
    var fabric=$window.fabric;
    var canvas=null;
    var canvasFromJSON=null;
    $scope.pngImage=null;

    $scope.init=function( pngImageFlag){
        canvas = canvas ? canvas : new fabric.Canvas('test');
        
        var imagePath=$location.protocol()+'://'+$location.host()+':'+$location.port()+'/img/blank-check-signed.png'
        if (pngImageFlag){
            imagePath=$scope.pngImage;
            canvas.clear();
        }
        var myimage= fabric.Image.fromURL(imagePath, function(oImg) {
            oImg.set('selectable', false); 
            oImg.scaleToWidth(canvas.getWidth());
            oImg.scaleToHeight(canvas.getHeight());
            canvas.add(oImg);
        });

    };

    $scope.init();

    $scope.addRect= function(){
        var rect = new fabric.Rect({
            top : 400,
            left : 500,
            width : 100,
            height : 70,
            fill : 'black'
        });

        canvas.add(rect);
    }

    $scope.saveAsPNG= function(){
        $scope.pngImage = canvas.toDataURL('png');
    }

    $scope.saveAsJSON=function(){
        var json=canvas.toJSON();
        canvasFromJSON = canvasFromJSON ? canvasFromJSON : new fabric.Canvas('jsonImage');
        canvasFromJSON.clear();

        canvasFromJSON.loadFromJSON(json, function(){
            var objects = canvasFromJSON.getObjects();
            
            objects.forEach(function(obj,index){
                //first is always a check
                if (index===0 ){
                    canvasFromJSON.sendBackwards(obj);
                    obj.set('selectable', false); 
                }
                
            })
            
            canvasFromJSON.renderAll();
        });

    }
}