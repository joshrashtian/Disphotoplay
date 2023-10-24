//Used the "Checkbox Demo", and Parts of Unit 6 

//Setting Variables
var photos = [];
var privcaption = [];
var privphotos = [];
var bordercolor = ["rgb(133, 144, 150)"];
var pbordercolor = [];
var caption = ["First Ever Image!"];
var index = 0;
var username = " ";
var passon = false;
var general = "general";
var password = "Skip";
var totalphotos;

//Starting Screen
onEvent("startbutton", "click", function(){
  setProperty("logo", "y", 10);
  showElement("startinglabel");
  showElement("nameinput");
  hideElement("startbutton");
});

//Buttons For UserName
  //Checking When Name Input Is Changed
onEvent("nameinput", "change", function(){
  if(username == " "){
  showElement("proceed1");
  //If A Name Was There And They Want To Change It, It will changed the text of the submit button.
} else {
  setText("proceed1", "Update Name");
}});
//Checking For Password To See There Is A Passowrd, if not it will not have a private account as true.
onEvent("passinput", "change", function(){
  if(getText("passinput") == ""){
    passon = false;
    setText("proceedpass", "Skip");
    setProperty("proceedpass", "background-color", "rgb(23, 116, 160)");
    setText("privphotos", "Private");
    setText("passchange", "Set Up Private Account");
  } else {
  setText("proceedpass", ">");
  passon = true;
  setProperty("proceedpass", "background-color", "#357955");
  setText("passchange", "Change Password");
}});
onEvent("proceed1", "click", function(){
  username = getText("nameinput");
  showElement("label3");
  showElement("passinput");
  showElement("proceedpass");
});


//Aesthics

//All These Are To Change The Color of Buttons
onEvent("proceed1","mouseover", function(){
  setProperty("proceed1", "background-color", "#479c6f");
});

onEvent("proceed1", "mouseout", function(){
  setProperty("proceed1", "background-color", "#357955");
});

onEvent("standard","mouseover", function(){
  setProperty("standard", "background-color", "#d0b07d");
});

onEvent("standard", "mouseout", function(){
  setProperty("standard", "background-color", "rgb(212, 204, 191)");
});

onEvent("privphotos","mouseover", function(){
  setProperty("privphotos", "background-color", "#d0b07d");
});

onEvent("privphotos", "mouseout", function(){
  setProperty("privphotos", "background-color", "rgb(212, 204, 191)");
});

onEvent("proceedpass", "mouseout", function(){
  if(passon == true){
  setProperty("proceedpass", "background-color", "#357955");
} else {
  setProperty("proceedpass", "background-color", "rgb(23, 116, 160)");
}
});

onEvent("proceedpass", "mouseover", function(){
  if(passon == true){
  setProperty("proceedpass", "background-color", "#479c6f");
} else {
  setProperty("proceedpass", "background-color", "#2191c5");
}
});

//Functions

//Seeing If There Was A Password Inputted
onEvent("proceedpass", "click", function(){
  if(passon == true){
    password = getText("passinput");
    setText("label3", "Nice, Now it is time to import your first photo!");
    hideElement("passinput");
    hideElement("proceedpass");
    showElement("firstcamera");
  } else {
    setText("label3", "Nice, Now it is time to import your first photo! Add some information then add an image.");
    hideElement("passinput");
    hideElement("proceedpass");
    showElement("firstcamera");
  }
});

//Sets The Screen Back To The Home, and also sees what index it is on.
function updateScreen(){
  totalphotos = photos.length + privphotos.length;
  //Seeing if the tab is on private or general
  if(general == "priv"){
    setImageURL("image1", privphotos[index]);
    setText("caption", privcaption[index]);
    setProperty("image1", "border-color", pbordercolor[index]);
    hideElement("unlockbutton");
    hideElement("unlocktext");
    setScreen("screen1");
  } else {
    setImageURL("image1", photos[index]);
    setText("caption", caption[index]);
    setProperty("image1", "border-color", bordercolor[index]);
    hideElement("unlockbutton");
    hideElement("unlocktext");
    setScreen("screen1");
  }
}


//When you confirmed a photo in the photo input, this function runs.
function addPhoto(type){
  //Seeing if it is a private or general, by the checkbox.
  if(type == "priv"){
    if((getText("bcolor")) == "Custom"){
      appendItem(pbordercolor, getText("bcolorinput"));
    } else {
      appendItem(pbordercolor, getText("bcolor"));
    }
    appendItem(privphotos, getImageURL("preview"));
    appendItem(privcaption, getText("captioninput"));
  } else {
  appendItem(photos, getImageURL("preview"));
  appendItem(caption, getText("captioninput"));
  if((getText("bcolor")) == "Custom"){
      appendItem(bordercolor, getText("bcolorinput"));
    } else {
      appendItem(bordercolor, getText("bcolor"));
    }
  }
}

//Importing Photo For Preview Window
onEvent("camera", "change", function(){
  setImageURL("preview", getImageURL("camera"));
});


onEvent("firstcamera", "change", function(){
  appendItem(photos, getImageURL("firstcamera"));
  updateScreen();
});

 //Getting Border Color
onEvent("bcolor", "change", function(){
  if((getText("bcolor")) == "Custom"){
    showElement("bcolorinput");
  } else {
    hideElement("bcolorinput");
    setProperty("preview", "border-color", getText("bcolor"));
  }
});
onEvent("bcolorinput", "change", function(){
  setProperty("preview", "border-color", getText("bcolorinput"));
});

//Tab Buttons
onEvent("privphotos", "click", function(){
  //Checking If There Is A Password Set
  if(passon == false){
    showElement("passnotsetlabel");
    setTimeout(function(){
      hideElement("passnotsetlabel");
    }, 3000);
  } if(passon == true){
    if(privphotos == ""){
      setText("passnotsetlabel", "ADD PRIVATE IMAGES");
      showElement("passnotsetlabel");
      setTimeout(function(){
      hideElement("passnotsetlabel");
    }, 3000);
    } else {
      showElement("unlocktext");
      showElement("unlockbutton");
      setText("passnotsetlabel", "INPUT PASSWORD");
    }
  }
}); 

//Seeing If The Input Matches The Passsword Set
onEvent("unlockbutton", "click", function(){
  if(getText("unlocktext") == password){
    general = "priv";
    index = 0;
    updateScreen();
  } else {
    setText("passnotsetlabel", "INCORRECT PASSWORD");
      showElement("passnotsetlabel");
      setTimeout(function(){
      hideElement("passnotsetlabel");
  }, 3000);
}});

onEvent("standard", "click", function(){
  general = "general";
  index = 0;
  updateScreen();
});

//Menu Buttons
onEvent("left","click",function(){
  if(index > 0){
    index = index - 1;
    updateScreen();
  }
});

onEvent("right", "click", function(){
  if(general == "general"){
    if(index < photos.length - 1)
      index = index + 1;
      updateScreen();
  } else {
    if(index < privphotos.length - 1)
      index = index + 1;
      updateScreen();
  }
});

onEvent("fsbutton","click",function(){
  setScreen("fullscreen");
  fullscreen();
});

onEvent("newphoto", "click", function(){
    setScreen("camerascreen");
    setImageURL("preview", " ");
});

//Adds Photos As A Result Of Going Back, Checks If It Is A Priv
onEvent("returnbutton", "click", function(){
  if(getChecked("privatecheckbox")){
    addPhoto("priv");
  } else {
    addPhoto();
  }
  updateScreen();
});

//Photo Library
onEvent("photolibrarybutton","click",function(){
  setScreen("photolibrary");
  for(var i = 0; i < photos.length; i++){
    setImageURL("photo"+i, photos[i]);
    setProperty("photo"+i,"border-color",bordercolor[i]);
  }
});

onEvent("returnbutton2", "click", function(){
  updateScreen();
});

//Settings

onEvent("settingsbutton","click",function(){
  setScreen("settings");
});

onEvent("passchange", "click", function(){
  if(passon == false){
  updateText("gray", "Let's Create A Password:");
  hideElement("passchange");
  showElement("newpasslabel");
  showElement("latepassword");
  showElement("settingproceed");
  } else {
  updateText("gray", "Input your old password, then the new one.");
  hideElement("passchange");
  showElement("newpasslabel");
  showElement("latepassword");
  showElement("settingproceed");
  showElement("replacepassword");
  }
});

onEvent("settingproceed", "click", function(){
  if(passon == false){
    password = getText("latepassword");
    passon = true;
    updateText("Green", "Password Created.");
    showElement("passchange");
    hideElement("latepassword");
    hideElement("settingproceed");
    hideElement("replacepassword");
    setText("replacepassword", "");
    setText("latepassword", "");
  } else {
    if(password == getText("latepassword")){
      if((getText("replacepassword")) == ""){
        updateText("Orange", "Please Input A New Password.");
      } else {
        updateText("Green", "Replacement Passworld Set.");
        password = getText("replacepassword");
        showElement("passchange");
        hideElement("latepassword");
        hideElement("settingproceed");
        hideElement("replacepassword");
        setText("replacepassword", "");
        setText("latepassword", "");
      }
    } else {
      updateText("red", "The Old Password Doesn't Match Our Database. Try Again.");
    }
  }
});

onEvent("returnbutton3", "click", function(){
  updateScreen();
});
onEvent("firstcamera", "change", function( ) {
	console.log("firstcamera photo selected!");
	console.log(getImageURL("firstcamera"));
});

function updateText(color, status){
  setProperty("newpasslabel", "text-color", color);
  setProperty("newpasslabel", "text", status);
}

//Full Screen
var fssettingsdropped = false;

function fullscreen(){
  if(general == "priv"){
    setImageURL("image2", privphotos[index]);
    setText("capfs", "'" + privcaption[index] + "'" );
    setProperty("image2", "border-color", pbordercolor[index]);
    setProperty("namelabelfs", "text", "by " + username);
  } else {
    setImageURL("image2", photos[index]);
    setText("capfs", "'" + caption[index] + "'");
    setProperty("image2", "border-color", bordercolor[index]);
    setProperty("namelabelfs", "text", "by " + username);
  }
}

onEvent("fsdropdown", "click", function(){
  if(fssettingsdropped == false){
    fssettingsdropped = true;
    showElement("fullscreentype");
    showElement("showbuttons");
    setProperty("fsdropdown", "background-color", "#b7c374");
  } else {
    fssettingsdropped = false;
    hideElement("fullscreentype");
    hideElement("showbuttons");
    setProperty("fsdropdown", "background-color", "#d0d0d0");
  }
});
onEvent("fullscreentype", "change", function(){
  if((getText("fullscreentype")) == "Cover"){
    setProperty("image2", "fit", "cover");
  } else if((getText("fullscreentype")) == "Fill"){
    setProperty("image2", "fit", "fill");
  } else {
    setProperty("image2", "fit", "none");
  }
});

onEvent("showbuttons", "change", function(){
  if((getText("showbuttons")) == "Show Buttons"){
    showElement("capfs");
    showElement("namelabelfs");
    showElement("returnbutton4");
  } else {
    hideElement("capfs");
    hideElement("namelabelfs");
    hideElement("fullscreentype");
    hideElement("showbuttons");
    hideElement("returnbutton4");
  }
});

onEvent("returnbutton4", "click", function(){
  updateScreen();
});

//Design Page

//UWhen The Design Page Is Loaded First Time
onEvent("designbutton", "click", function(){
  setScreen("design");
  setImageURL("image3", getImageURL("image1"));
  if(general == "priv"){
    setText("currentcap", "Current Caption: " + privcaption[index]);
  } else {
    setText("currentcap", "Current Caption: " + caption[index]);
  }
});

onEvent("deletebutton", "click", function(){
  if(general == "priv"){
    delPhoto("priv");
  } else {
    delPhoto("general");
  }
  if(index > 0){
    index = index - 1;
  }
  updateScreen();
});

onEvent("capreinput", "change", function(){
  caption[index] = getText("capreinput");
  if(general == "priv"){
    setText("currentcap", "Current Caption: " + privcaption[index]);
  } else {
    setText("currentcap", "Current Caption: " + caption[index]);
  }
});

function delPhoto(type){
  if(type == "priv"){
    if(privphotos.length > 1){
      removeItem(privphotos, index);
      removeItem(privcaption, index);
      removeItem(pbordercolor, index);
    }
  } else {
    if(photos.length > 1){
      removeItem(photos, index);
      removeItem(caption, index);
      removeItem(bordercolor, index);
    }
  }
    if(index > 0){
      index = index - 1;
  }
  updateScreen();
  }

onEvent("returnbutton5", "click", function(){
  updateScreen();
});