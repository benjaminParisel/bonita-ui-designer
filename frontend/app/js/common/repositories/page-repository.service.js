/**
 * Repo to save or load a page.
 */
angular.module('pb.common.repositories').factory('pageRepo', function($http) {

  'use strict';

  /**
   * Lists all the pages and returns a promise containing the pages
   */
  function all() {
    return $http.get('rest/pages').then(function(response) {
      return response.data;
    });
  }

  function saveData(page, data) {
    return $http.put('rest/pages/' + page.id + '/data/' + data.$$name, data);
  }

  function deleteData(page, dataName) {
    return $http.delete('rest/pages/' + page.id + '/data/' + dataName);
  }

  /**
   * Creates a new page and returns a promise containing the returned data
   * @param content - the page's content (name and empty row, typically)
   */
  function create(content) {
    return $http.post('rest/pages', content).then(function(response) {
      return response.data;
    });
  }

  /**
   * Saves a page and returns a promise
   * @param id - the page's id
   * @param content - the page's content
   */
  function save(id, content) {
    return $http.put('rest/pages/' + id, content);
  }

  /**
   * Creates a new asset
   * @param id - the page's id
   * @param asset
   */
  function createAsset(id, asset) {
    return $http.post('rest/pages/' + id + '/assets', asset).then(function(response) {
      return response.data;
    });
  }

  /**
   * Renames a page and returns a promise
   * @param id - the page's id
   * @param newName - the page's new name
   */
  function rename(id, newName) {
    return $http.put('rest/pages/' + id + '/name', newName);
  }

  /**
   * Delete a page and returns a promise
   * @param id - the page's id
   */
  function deletePage(id) {
    return $http.delete('rest/pages/' + id);
  }

  /**
   * Loads the page identified by the given id
   * Returns a promise
   * @param id - the page's id
   */
  function load(id) {
    return $http.get('rest/pages/' + id);
  }

  /**
   * Loads assets used by the page and by the widgets
   * Returns a promise
   * @param page
   */
  function loadAssets(page) {
    return $http.get('rest/pages/' + page.id + '/assets').then(function(response) {
      return response.data;
    });
  }

  /**
   * Delete an asset
   * Returns a promise
   */
  function deleteAsset(id, asset) {
    //we need to send the object because the id should be an URL
    return $http({ url: 'rest/pages/' + id + '/assets',
      method: 'DELETE',
      data: asset,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
  }

  /**
   * Return export url of a page
   * @param page - the page to be exported
   */
  var exportUrl = function(page) {
    return 'export/page/' + page.id;
  };

  return {
    all: all,
    create: create,
    createAsset: createAsset,
    save: save,
    rename: rename,
    delete: deletePage,
    deleteAsset: deleteAsset,
    load: load,
    loadAssets: loadAssets,
    saveData: saveData,
    deleteData: deleteData,
    exportUrl: exportUrl
  };
})
;
