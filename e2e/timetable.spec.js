describe('Timetable', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should show timetable after searching', async () => {
    await element(by.label('searchTimetable')).tap();
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).typeText('62');
    await element(by.id('searchInput')).tapReturnKey();
    await element(by.text('621')).tap();
    
  });
  it('should show timetable after finding in list', async () => {
    await element(by.label('searchTimetable')).tap();
    await waitFor(element(by.id('qwer42'))).toBeVisible();
    await element(by.id('qwer42')).scroll(400,"down");
    await element(by.id('qwer42')).scroll(400,"down");
    await element(by.id('qwer42')).scroll(400,"down");
    await element(by.text('651')).tap();
    await element(by.id('tt')).swipe('left', 'fast', 0.5);
    await element(by.id('subgroupButton')).tap();
    await element(by.text('1 подгруппа')).tap();
    await element(by.id('refreshButton')).tap();

    await element(by.label('searchTimetable')).tap();
    await element(by.text('Преподаватель')).tap();
    await element(by.id('qwer42')).scroll(200,"down");
    await element(by.text("Cтанулевич Дмитрий Сергеевич")).tap();
  });


  it('should show saved timetable', async () => {
    await element(by.label('savedTimetable')).tap();
    await element(by.text("621")).tap();
  });
});
