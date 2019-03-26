// Dom7
var $$ = Dom7;

var basePath = 'https://grsoftapp.tk/api';
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'GRSoft', // App name
  theme: 'auto', // Automatic theme detection
  version: '1.0.0',
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  on: {
    //init application
      init: function () {

        console.log("Device is ready!");
      },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
 on: {
    pageInit: function (page) {
      
          if(localStorage.getItem('userData')){

            this.router.load({
              url: './pages/home.html',
              animatePages: true
            });
            
          }

          if(page.name == 'home'){
              
              var user = JSON.parse(localStorage.getItem("userData"));

              $$('.page').find('#userName').append(user.name);
          }      
    }
  }
});



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  //app.loginScreen.close('#my-login-screen');


  app.preloader.show();

  if(username && password){

  app.request.post(basePath+'/signin', 
  JSON.stringify({username:username,password:password}), 
  function (response) {

    var obj = JSON.parse(response);
    
    if(obj.userData){
        localStorage.setItem('userData', JSON.stringify(obj.userData) );

        mainView.router.navigate({
          url: '/home/',
          animatePages: true
        });

    }else
    {
      toastMsg(obj.error.text);
      //console.log(obj);
    }

  });


  }else{
      toastMsg('Preencha todos os campos!');
  }
app.preloader.hide();
});


//Register submit button
$$('#my-popup-signup .register-button').on('click', function () {
  var name = $$('#my-popup-signup [name="name"]').val();
  var email = $$('#my-popup-signup [name="email"]').val();
  var username = $$('#my-popup-signup [name="username"]').val();
  var password = $$('#my-popup-signup [name="password"]').val();

  // Close login screen
  //app.popup.close('#my-popup-signup');


  app.preloader.show();

  if(name && email && username && password){

  app.request.post(basePath+'/signup', 
  JSON.stringify({name:name,email:email,username:username,password:password}), 
  function (response) {

    var obj = JSON.parse(response);
    
    if(obj.userData){
        localStorage.setItem('userData', JSON.stringify(obj.userData) );

        //app.popup.close('#my-popup-signup');


        mainView.router.navigate({
          url: '/home/',
          animatePages: true
        });

    }else
    {
      toastMsg(obj.error.text);
      //console.log(obj);
    }

  });

}else{
    toastMsg('Preencha todos os campos!');
}
  
app.preloader.hide();

});


function toastMsg(msg)
{
    var toastBottom = app.toast.create({
        text: msg,
        closeTimeout: 3051,
      });
    toastBottom.open();
}