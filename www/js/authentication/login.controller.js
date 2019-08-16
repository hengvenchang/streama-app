angular.module('streama.login').controller('LoginCtrl', function($ionicLoading, apiService, $state) {
  var vm = this;
  vm.login = login;

  function login() {
    console.log('lgoin');
    $ionicLoading.show({ template: 'Logging in... <br><br> <ion-spinner></ion-spinner>' });
    var payload = {
      username: vm.setup.username,
      password: vm.setup.password,
      'remember-me': true
    };
    console.log('payload', payload);
    apiService.core.login(payload).then(afterLogin, onLoginErr);

    function afterLogin() {
      apiService.core.currentUser().then(function(response) {
        $ionicLoading.hide();
        console.log('%c currentUser data', JSON.stringify(response.data));
        if (!response.data.id) {
          $ionicPopup.alert({
            title: 'Login failed',
            template: 'You did not login successfully using the above credentials. Please try again.'
          });
          return;
        }
        $state.go('main.dash');
      });
    }

    function onLoginErr(err) {
      console.log('%c arguments', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', arguments);
      if (err.status == -1) {
        afterLogin();
      } else {
        $ionicLoading.hide();
        toastr.error('error logging in. Please try again or try a different base path.');
      }
    }
  }
});
