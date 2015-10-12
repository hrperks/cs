'use strict';

angular.module('creepScore.version', [
  'creepScore.version.interpolate-filter',
  'creepScore.version.version-directive'
])

.value('version', '0.1');
