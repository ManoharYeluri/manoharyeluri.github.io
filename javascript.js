var cookiesArry = document.cookie.split(';');
var navmenubuttonclickscount = 0;
var navmenubuttonclickscounttemp = 0;
window.bootup = function () {
  console.log("booting up...");
  if (document.cookie.split(';').length < 2) {
    document.cookie = "lastbgcolor=default";
    document.cookie = "username=*";
  }
  setLastUsedBgColor();
  document.getElementById("bgcolordropdown").value = getPriorBgColor();
  eitherPromptOrDisplayUserName();
  setTimeout(function () { $("#buttonThatTriggersUpdateUserNameModal").click(function () { callUpdateUserNameModal(); }); }, 3050);
  $("img").fadeIn(2500);
  $(function () { $('[data-toggle="popover"]').popover({ trigger: 'hover' }) });
  lightbox.option({
    'resizeDuration': 1000,
    'disableScrolling': true,
    'fitImagesInViewport': true
  })
  setInterval(function () { $('#undernavbarcontainer').height($('#navbardiv').height()); }, 10);
  setInterval(function () { $('body').height($(window).height()); }, 10);
  
  setInterval(function () {
    if ($('body').width() <= 992) {
       if(navmenubuttonclickscounttemp == 0)
       {
         $("#bgcolordropdown").css('display','none');
         $("#buttonThatTriggersUpdateUserNameModal").css('display','none');
         navmenubuttonclickscounttemp++;
         $('#ASDF').addClass('fa fa-bars');
       }
      document.getElementById('ASDF').onclick = function () {
        startmusic();
      }
    }
  }, 10);
  setInterval(function () {
  if ($('body').width() > 992) {
    navmenubuttonclickscount = 0;
    navmenubuttonclickscounttemp = 0;
    $('#ASDF').addClass('fa fa-bars');
    $("#bgcolordropdown").fadeIn(500);
    $("#buttonThatTriggersUpdateUserNameModal").fadeIn(1000);
  }
  }, 10);
}

function startmusic() {
  navmenubuttonclickscount++;
  if (navmenubuttonclickscount % 2 != 0) {
    $('#ASDF').removeClass('fa fa-bars');
    $('#ASDF').addClass('fa fa-close');
    $("#bgcolordropdown").fadeIn(500);
    $("#buttonThatTriggersUpdateUserNameModal").fadeIn(1000);
  }
  else {
    $('#ASDF').removeClass('fa fa-close');
    $('#ASDF').addClass('fa fa-bars');
    $("#bgcolordropdown").fadeOut(600);
    $("#buttonThatTriggersUpdateUserNameModal").fadeOut(500);
  }
}

var userbgcolorpreferred;
function bgcolorchange() {
  userbgcolorpreferred = document.getElementById('bgcolordropdown').value;
  applyThisBgColor(userbgcolorpreferred);
  document.cookie = "lastbgcolor=" + userbgcolorpreferred;
}

function applyThisBgColor(userbgcolorpreferred) {
  switch (userbgcolorpreferred) {
    case 'blue':
      $("body").css("background", "linear-gradient(90deg, rgb(116, 216, 252),rgb(156, 153, 254))");
      break;
    case 'red':
      $("body").css("background", "linear-gradient(90deg, rgb(94, 5, 4),rgb(253, 19, 61))");
      break;
    case 'green':
      $("body").css("background", "linear-gradient(90deg, rgb(56, 120, 78),rgb(175, 255, 102))");
      break;
    default:
      $("body").css("background", "linear-gradient(90deg, rgb(185, 223, 103),rgb(253, 39, 50))");
  }
}

function setLastUsedBgColor() {
  cookiesArry = document.cookie.split(';');
  let lastusedbgcolor;
  if (cookiesArry[0].split('=')[0] == 'lastbgcolor') {
    lastusedbgcolor = cookiesArry[0].split('=')[1];
    applyThisBgColor(lastusedbgcolor);
  }
  else {
    lastusedbgcolor = cookiesArry[1].split('=')[1];
    applyThisBgColor(lastusedbgcolor);
  }
}

function eitherPromptOrDisplayUserName() {
  cookiesArry = document.cookie.split(';');
  if (cookiesArry[0].split('=')[0] == 'username') {
    if (cookiesArry[0].split('=')[1] == '*') {
      setTimeout(function () { $("#exampleModal").modal(); }, 3000);
    }
    else {
      setTimeout(function () {
        toDisplayUserName("Welcome back " + cookiesArry[0].split('=')[1] + "!");
        $("#displayUserName").modal();
      }, 3000);
    }
  }
  else {
    if (cookiesArry[1].split('=')[1] == '*') {
      setTimeout(function () { $("#exampleModal").modal(); }, 3000);
    }
    else {
      setTimeout(function () {
        toDisplayUserName("Welcome back " + cookiesArry[1].split('=')[1] + "!");
        $("#displayUserName").modal();
      }, 3000);
    }
  }
}

function setUserNameCookie() {
  var usernameInput = document.getElementById('username').value;
  if (usernameInput != '' && usernameInput != '*') {
    document.cookie = "username=" + usernameInput;
  }
  else {
    document.cookie = "username=*";
  }
}

function toDisplayUserName(username) {
  document.getElementById('displayUserNamehere').innerHTML = username;
}

function callUpdateUserNameModal() {
  if (getPriorUserName() != '*') {
    DisplayPriorUserName();
    $("#updateUserNameModal").modal();
  }
  else {
    $("#exampleModal").modal();
  }
}

function DisplayPriorUserName() {
  var PriorUserName = getPriorUserName();
  document.getElementById('displayPriorUserNameHere').value = PriorUserName;
}

function getPriorUserName() {
  cookiesArry = document.cookie.split(';');
  if (cookiesArry[0].split('=')[0] == 'username') {
    return cookiesArry[0].split('=')[1];
  }
  else {
    return cookiesArry[1].split('=')[1];
  }
}

function getPriorBgColor() {
  cookiesArry = document.cookie.split(';');
  if (cookiesArry[0].split('=')[0] == 'lastbgcolor') {
    return cookiesArry[0].split('=')[1];
  }
  else {
    return cookiesArry[1].split('=')[1];
  }
}

function GetNewUserName() {
  return document.getElementById('displayPriorUserNameHere').value;
}

function updateUserNameCookie() {
  if (GetNewUserName() != '') {
    document.cookie = "username=" + GetNewUserName();
  }
}

window.getPriorBgColor = getPriorBgColor;
window.getPriorUserName = getPriorUserName;
window.updateUserNameCookie = updateUserNameCookie;
window.callUpdateUserNameModal = callUpdateUserNameModal;
window.toDisplayUserName = toDisplayUserName;
window.setUserNameCookie = setUserNameCookie;
window.applyThisBgColor = applyThisBgColor;
window.bgcolorchange = bgcolorchange;