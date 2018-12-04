describe('Feedback', () => {
  it('should fail sending a feedback because of unfilled fields', async () => {
    await element(by.label('sendFeedback')).tap();
    await element(by.id('inputUsername')).typeText('Alina');
    await element(by.id('inputEmail')).typeText('alina.com');
    await element(by.id('inputEmail')).tapReturnKey();
    await element(by.id('tickButton')).tap();
  });

  it('should fail sending a feedback because of invalid email', async () => {
    await element(by.id('inputTopic')).tap();
    await element(by.id('inputTopic')).typeText('Feedback');
    await element(by.id('inputMessage')).typeText('I like your app, u r cool!');
    await element(by.id('inputTopic')).tapReturnKey();
    await element(by.id('tickButton')).tap();
  });

  it('should send a feedback', async () => {
    await element(by.id('inputEmail')).tap();
    await element(by.id('inputEmail')).replaceText('alina@google.com');
    await element(by.id('inputEmail')).tapReturnKey();
    await element(by.id('tickButton')).tap();
    await element(by.id('modalConfirmButton')).tap();
  });
});
