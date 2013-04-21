/*
 * Module dependencies
 */
var app = require("..");

/*
 * SidenavController
 */
function SidenavController($scope, $routeParams) {
  $scope.$watch(function() {
    return $routeParams.category;
  }, function(val) {
    $scope.current = val;
  });
  $scope.$watch(function() {
    return $routeParams.subcategory;
  }, function(val) {
    $scope.currentSub = val;
  });

  $scope.categories = [
    {rel: "living-room", title: "Living Room", subcategories: [
      {rel: "lighting", title: "Lighting"},
      {rel: "sitting", title: "Sitting"},
      {rel: "decoration", title: "Decoration"}
    ]},
    {rel: "bathroom", title: "Bathroom", subcategories: [
      {rel: "linens", title: "Linens"},
      {rel: "bath", title: "Bath"},
      {rel: "decoration", title: "Decoration"}
    ]},
    {rel: "kitchen", title: "Kitchen", subcategories: [
      {rel: "flatware", title: "Flatware"},
      {rel: "appliance", title: "Appliance"}
    ]},
    {rel: "accessories", title: "Accessories", subcategories: [
      {rel: "iphone", title: "iPhone"},
      {rel: "music", title: "Music"}
    ]}
  ];
};

/*
 * Register it with angular
 */
app.controller(SidenavController.name, [
  '$scope',
  '$routeParams',
  SidenavController
]);

/*
 * Let others know where to find it
 */
module.exports = SidenavController.name;
