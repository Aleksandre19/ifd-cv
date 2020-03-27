// Importing classes
import {CheckSettings} from './check_settings.js';
import {Config} from '../config.js';
import {Images} from './images.js';
// Initialising objects
const settings = new CheckSettings();
const conf = new Config();

// Declaring private variabels with WeakMap();
const _imageNaturalWidth = new WeakMap();
const _imageStartingNaturLWidth = new WeakMap();
const _imgName = new WeakMap();

// Creating Animation's class
export class Animate{

    constructor(){
        //Setting animation imnage name
        _imgName.set(this, Images.getImageName(1));
        console.log(_imgName.get(this));

        // Checking if all reuqried setting are ok
        if(settings.settingsStatus){
            Animate.getNaturalDiminsion(_imgName.get(this));
        }
    }

    
    // Getting natural dimentions of image

    static getNaturalDiminsion(imgName){
            // Getting image's current width and height
            // This part of the code i found and copyed from here:
            // https://stackoverflow.com/questions/3098404/get-the-size-of-a-css-background-image-using-javascript
            let iName  = imgName;
            let image;
            image = new Image();
            image.src = Images.imgFullPath(iName);
            

            // On load getting width and height of image
            image.onload = function() {

                // Setting natural dimentions to the variables
                _imageNaturalWidth.set(this, image.naturalWidth);
                // Calling animation function
                Animate.startAnimation(_imageNaturalWidth.get(this));
                    
            };
    }

    
    // Getting image's full path
    static imageFullPath(imgNames){   
            let dom = window.location.href;
            let folderUrl = 'assets/js/slider/slider_images/lg/';
            let imgName = imgNames;
            let imgFullUrl = dom + folderUrl + imgName;
            return imgFullUrl;
    }


    // Starting animation
    static startAnimation(natWidth){

            // Saving image's starting width  
             _imageStartingNaturLWidth.set(this, natWidth);

            setInterval(() => {
                let scaledUpWidth = natWidth++;

                document.getElementById("dianaSlider").style.backgroundSize = `${scaledUpWidth}px`;
    
               console.log(Animate.calculateImageIncrisedDimension(scaledUpWidth));
           },15);
    }


    static calculateImageIncrisedDimension(sUpWidth){
            
        return (sUpWidth - _imageStartingNaturLWidth.get(this)) / _imageStartingNaturLWidth.get(this) * 100;
    }


    // Get image name

    static  getImageName(){
        return _imgName.get(this);
    }
   
       

}