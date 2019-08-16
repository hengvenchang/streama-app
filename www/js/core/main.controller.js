angular
  .module('streama.core')
  .controller('mainCtrl', function(localStorageService, profiles, apiService, genres, $state, $rootScope) {
    var mainVm = this;
    console.log('profiles', profiles);
    mainVm.profiles = profiles;
    mainVm.toggleSearch = toggleSearch;
    mainVm.setGenre = setGenre;
    mainVm.setProfile = setProfile;
    mainVm.goToManageProfiles = goToManageProfiles;
    mainVm.genres = genres;
    mainVm.selectedGenre = null;
    mainVm.profileName = '';
    initProfile();

    function initProfile() {
      if (profiles) {
        if (mainVm.profiles[0]) {
          mainVm.profileName = mainVm.profiles[0].profileName;
          console.log('profileName', mainVm.profileName);
        }
      }
    }

    function toggleSearch() {
      mainVm.searchQuery = '';
      mainVm.isSearchActive = !mainVm.isSearchActive;

      if (mainVm.isSearchActive) {
        setTimeout(function() {
          $('.dashboard-search-box input').focus();
        }, 200);
      }
    }

    function setGenre(genre) {
      $state.go('main.dashGenre', { genreId: genre.id });
    }

    function setProfile(profile) {
      $rootScope.selectedProfile = profile;
      localStorageService.set('currentProfile', profile);
      $state.go('main.dash', {}, { reload: true });
    }

    function goToManageProfiles() {
      window.open(localStorageService.get('streamaDomain') + '#/sub-profiles', '_system');
    }
  });
