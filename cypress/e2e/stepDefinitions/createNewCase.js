const getIframeDocument = iframe => cy.get(iframe).its('0.contentDocument').should('exist');
const getIframeBody = iframe => getIframeDocument(iframe).its('body').should('not.be.undefined').then(cy.wrap);

Given('I login', () => {

    let baseUrl = Cypress.env('baseUrl')
    let testUserName = Cypress.env('testUserName')
    let testUserPassword = Cypress.env('testUserPassword')
    Cypress.config("baseUrl", baseUrl);
    cy.login(testUserName, testUserPassword)
    cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').should('be.visible').click()
})

When('I create new cad new case', () => {
    cy.get('div[data-test-id="add-new-case"]').should('be.visible').click()
    cy.get('input[data-test-id="new-case-first-name"]').should('be.visible').type('Jane')
    cy.get('input[data-test-id="new-case-last-name"]').should('be.visible').type('Doe')
    cy.get('button[data-test-id="create-case"]').should('be.visible').click()
})

When('I upload documents', () => {
    cy.wait(16000)
})

Then('I create new design project', () => {
    cy.intercept('/api/private/admin/teeth/stats/**').as('getTeethStats')
    cy.contains('div', 'Projects').should('be.visible').click()
    cy.wait('@getTeethStats')

    cy.intercept('/api/private/gallery-filtered/**').as('getGalleryFiltered')
    cy.get('button[data-test-id="create-new-project-design"]').should('be.visible').click()
    cy.wait('@getGalleryFiltered')

    cy.intercept('/api/private/status/session/check').as('getCheckSessionStatus')
    cy.get('div[data-test-id="media-drawer-item"]').should('be.visible').click()
    cy.wait('@getCheckSessionStatus')

    cy.intercept('https://sentry.io/api/**/envelope/**').as('postEnvelope')
    cy.get('button[data-test-id="draw-lip-tab"]').should('be.visible').click()
    cy.wait('@postEnvelope')


    cy.get('button[data-test-id="restorative-space-tab"]').should('be.visible').click()

    cy.get('button[data-test-id="teeth-lib-tab"]').should('be.visible').click()

    // cy.wait('@getCheckSessionStatus')
    cy.contains('span[data-react-toolbox="font-icon"]', 'cloud_download').should('be.visible').click()
})

Then('I checkout functional design', () => {
    cy.intercept('/api/private/case/**/projects/list').as('getProjectList')
    cy.contains('h1', 'Functional design').should('be.visible')
    cy.wait('@getProjectList')

    cy.xpath('//h1[contains(@class,"OrderServiceHeader_title") and contains(text(),"Functional design")]/../..//input').should('exist').click({force: true})
    cy.contains('button[data-react-toolbox="button"]', 'To Checkout').should('be.visible').click()
})

Then('I pay for functional design', () => {
    cy.intercept('https://play.google.com/log?format=json&hasfast=true&authuser=0').as('postGooglePlay')
    cy.contains('button', 'Pay').should('be.visible').click()
    cy.wait('@postGooglePlay')


    getIframeBody('iframe[title="Secure payment input frame"]').find('#Field-numberInput').should('be.visible').type('4242 4242 4242 4242')
    getIframeBody('iframe[title="Secure payment input frame"]').find('#Field-expiryInput').should('be.visible').type('01/24')
    getIframeBody('iframe[title="Secure payment input frame"]').find('#Field-cvcInput').should('be.visible').type('890')
    cy.get('button[data-test-id="braintree-purchase-button"]').should('be.visible').click()
    cy.contains('button', 'Continue').should('be.visible').click()
})

