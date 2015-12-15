var HomePage = require('../pages/home.page.js');

describe('home page', function() {

  let ALL_PAGE_NAMES = ['Person', 'empty'];
  let ALL_WIDGET_NAMES = ['awesomeWidget', 'favoriteWidget'];
  var home;

  beforeEach(function() {
    home = HomePage.get();
  });

  it('should list pages and widgets ordered by last update date descendant', function() {
    expect(home.getListedPageNames()).toEqual(ALL_PAGE_NAMES);
    expect(home.getListedWidgetNames()).toEqual(ALL_WIDGET_NAMES);
  });

  it('should navigate to a page', function() {
    $$('#pages a').first().click();

    expect($('.EditorHeader-brand').getText()).toBe('PAGE EDITOR');
  });

  it('should navigate to a widget', function() {
    $$('#widgets a').first().click();

    expect($('.EditorHeader-brand').getText()).toBe('CUSTOM WIDGET EDITOR');
  });

  it('should create a page', function() {
    home.createPage('test');
    expect($('.EditorHeader-brand').getText()).toBe('PAGE EDITOR');
  });

  it('should not create a page with space or special characters in name', function() {
    $('.HomeCreate').click();
    let nameInput = $('.modal-body input[name="name"]');
    nameInput.sendKeys('page name');
    let createPageButton = $('.modal-footer button[type="submit"]');
    expect(createPageButton.isEnabled()).toBeFalsy();
    expect($('.NewArtifact span.text-danger').isDisplayed()).toBeTruthy();

    nameInput.clear();
    nameInput.sendKeys('page-name');

    expect(createPageButton.isEnabled()).toBeFalsy();
    expect($('.NewArtifact span.text-danger').isDisplayed()).toBeTruthy();

    nameInput.clear();
    nameInput.sendKeys('pageName');

    expect(createPageButton.isEnabled()).toBeTruthy();
    expect($$('.NewArtifact span.text-danger').count()).toBe(0);
  });

  it('should create a widget', function() {
    home.createWidget('test');
    expect($('.EditorHeader-brand').getText()).toBe('CUSTOM WIDGET EDITOR');
  });

  it('should open a modal to confirm page deletion', function() {
    //We want to delete a page
    $$('.btn-page-delete').first().click();
    //A modal is opened with a confirmation message
    expect($('#confirm-delete-popup .modal-body').getText()).toBe('Are you sure you want to delete the page Person?');
  });

  // deactivated since it fails randomly on our CI
  xit('should not delete page if user cancels deletion', function() {
    var numberOfPages = element.all(by.repeater('page in pages')).count();
    //We want to delete a page
    $$('.btn-page-delete').first().click();
    //A modal is opened and I click on Cancel

    //Disable animation for modal
    $$('#confirm-delete-popup').allowAnimations(false);

    $$('#confirm-delete-popup .modal-footer button').get(0).click();
    browser.waitForAngular();
    expect($$('#confirm-delete-popup').count()).toBe(0);
    //and the page is not deleted
    expect(element.all(by.repeater('page in pages')).count()).toBe(numberOfPages);

  });

  it('should export a page', function() {
    var btn = $$('.btn-page-export').first();
    var iframe = $$('.ExportArtifact').first();
    btn.click();

    expect(iframe.getAttribute('src')).toMatch(/\/export\/page\/person/);
  });

  it('should open a modal to confirm widget deletion', function() {
    //We want to delete a widget
    $$('.btn-widget-delete').first().click();
    //A modal is opened with a confirmation message
    expect($('#confirm-delete-popup .modal-body').getText()).toBe('Are you sure you want to delete the custom widget awesomeWidget?');
  });

  it('should rename a page', function() {

    var btnRenamePage = $$('.btn-page-rename').first();
    btnRenamePage.click();

    //The link should now be a visible input with the page name
    var nameInput = $('#page-name-input-0');
    expect(nameInput.getAttribute('value')).toBe('Person');
    //We can change the name
    nameInput.sendKeys('2');
    // It should remove the input
    btnRenamePage.click();
    expect(nameInput.isPresent()).toBe(false);
  });

  it('should not rename a page with space or special characters in name', function() {
    $$('.btn-page-rename').first().click();

    //The link should now be a visible input with the page name
    $('#page-name-input-0').clear();
    $('#page-name-input-0').sendKeys('page name');

    expect($('#pages form[name="renamePage"] span.text-danger').isDisplayed()).toBeTruthy();

    $('#page-name-input-0').clear();
    $('#page-name-input-0').sendKeys('page-name');

    expect($('#pages form[name="renamePage"] span.text-danger').isDisplayed()).toBeTruthy();

    $('#page-name-input-0').clear();
    $('#page-name-input-0').sendKeys('pageName');

    expect($$('#pages form[name="renamePage"] span.text-danger').count()).toBe(0);
  });

  it('should remove the input to rename a page on blur', function() {

    $$('.btn-page-rename').first().click();

    //The link should now be a visible input with the page name
    var nameInput = $('#page-name-input-0');
    expect(nameInput.isPresent()).toBe(true);

    browser
      .executeScript('$(\'#page-name-input-0\').blur();')
      .then(function() {
        expect(nameInput.isPresent()).toBe(false);
      });

  });

  it('should set autofocus on the input if we edit a page',  function() {
    $$('.btn-page-rename').first().click();
    var input = $('#page-name-input-0');
    expect(input.getAttribute('id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('id'));
  });

  it('should open help popup',  function() {
    $('.btn-bonita-help').click();

    expect($('.modal-header .modal-title').getText()).toBe('Help');
  });

  it('should filter widgets and pages by name', function() {
    home.search('nowidgetAndnopagesHasANameLikeThat');
    expect(home.getListedPageNames()).toEqual([]);
    expect(home.getListedWidgetNames()).toEqual([]);

    home.search('so');   // 'so' is contained by 'PerSOn' and 'aweSOmeWidget'
    expect(home.getListedPageNames()).toEqual(['Person']);
    expect(home.getListedWidgetNames()).toEqual(['awesomeWidget']);

    home.search('');
    expect(home.getListedPageNames()).toEqual(ALL_PAGE_NAMES);
    expect(home.getListedWidgetNames()).toEqual(ALL_WIDGET_NAMES);
  });

  it('should filter favorite widgets and pages', function() {
    home.filterFavorites();
    expect(home.getListedPageNames()).toEqual(['Person']);
    expect(home.getListedWidgetNames()).toEqual(['favoriteWidget']);

    home.unfilterFavorites();
    expect(home.getListedPageNames()).toEqual(ALL_PAGE_NAMES);
    expect(home.getListedWidgetNames()).toEqual(ALL_WIDGET_NAMES);
  });
});
