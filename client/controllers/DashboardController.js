'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.controller('DashboardController', ['$scope',
                               '$window',
                               '$timeout',
                               'apiService',
                               'authService',
                               'modalService',
                               'storageService',
                               function($scope,
                                        $window,
                                        $timeout,
                                        apiService,
                                        authService,
                                        modalService,
                                        storageService)
{

  console.log("DashboardController reporting for duty.");


  $scope.sections = [
    {
      id: 0,
      title: "Getting Started",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 1,
      title: "Tone",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 2,
      title: "Respiration/Phonation",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 3,
      title: "Reflexes",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 4,
      title: "Vegetative Functions",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 5,
      title: "Mandibular & LFC",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 6,
      title: "Lingual Control",
      auditoryScore: 0,
      visualScore: 0,
      tactileScore: 0,
      motorControlScore: 0,
      questions: [
        {
          number: 1,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 2,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
        {
          number: 3,
          title: "Show me how you ...",
          choices: ["Descriptor A", "Descriptor B", "Descriptor C", ],
          auditory: 0,
          visual: 0,
          tactile: 0
        },
      ]
    },
    {
      id: 7,
      title: "Score Summary",
    },
    {
      id: 8,
      title: "Profile",
    },
  ]

  $scope.user = authService.getLoggedInUser();

  $scope.currentSection = 0;
  $scope.currentTitle = $scope.sections[$scope.currentSection].title;

  $scope.selectSection = function(id) {
    $scope.currentSection = id;
    $scope.currentTitle = $scope.sections[$scope.currentSection].title;
  }

  $scope.updateAuditoryScore = function() {
    $scope.sections[$scope.currentSection].auditoryScore = 0;
    $scope.sections[$scope.currentSection].questions.forEach(function(item){
      $scope.sections[$scope.currentSection].auditoryScore += item.auditory;
    })
    $scope.updateMotorControlScore();
  }

  $scope.updateVisualScore = function() {
    $scope.sections[$scope.currentSection].visualScore = 0;
    $scope.sections[$scope.currentSection].questions.forEach(function(item){
      $scope.sections[$scope.currentSection].visualScore += item.visual;
    })
    $scope.updateMotorControlScore();
  }

  $scope.updateTactileScore = function() {
    $scope.sections[$scope.currentSection].tactileScore = 0;
    $scope.sections[$scope.currentSection].questions.forEach(function(item){
      $scope.sections[$scope.currentSection].tactileScore += item.tactile;
    })
    $scope.updateMotorControlScore();
  }

  $scope.updateMotorControlScore = function() {
    $scope.sections[$scope.currentSection].motorControlScore = $scope.sections[$scope.currentSection].auditoryScore + $scope.sections[$scope.currentSection].visualScore + $scope.sections[$scope.currentSection].tactileScore;
  }

}]);