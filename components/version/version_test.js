'use strict';

describe('creepScore.version module', function() {
  beforeEach(module('creepScore.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
