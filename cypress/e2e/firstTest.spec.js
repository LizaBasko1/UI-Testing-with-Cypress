/// <reference types="cypress" />

describe('First test suite', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by class
        cy.get(".input-full-width")

        //by attribute
        cy.get("[fullwidth]")

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by several attributes
        cy.get('[fullwidth][placeholder="Email"]')

        //by tag, attribute, class and id
        cy.get('input#inputEmail1.input-full-width[fullwidth]')

        //by Cypress test id
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Theory
        //get() - find elements on the page only globally
        //find() - find only child element by locator
        // contains() - find HTML text and by text and locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]','Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        //get will find all buttons on the page no matter that we are using it aftr parent element
        cy.contains('nb-card', 'Horizontal form').get('button')

        //cypress chains and DOM(Document Object Model)
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('.custom-checkbox')
            .click()
        
    })

    it('save subject of the command', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //CANT DO THINGS LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // 1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 2 Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm =>{
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 with text() function
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
        })

        //3 invoke text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('textLabel').should('contain', 'Email address')

        //5 invoke attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //6 invoke properties
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')

    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click() 

        cy.get('[type="checkbox"]').eq(1).check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
         
    })

    it('datepicker', () => {
        function selectTestDay(day){
            let date = new Date()
            date.setDate(date.getDate() - day)
            let testDate = date.getDate()
            let previousMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let previousYear = date.getFullYear()
            let assertDate = `${previousMonth} ${testDate}, ${previousYear}`
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                if(!dateAttribute.includes(previousMonth) || !dateAttribute.includes(previousYear)){
                    cy.get('nb-calendar-pageable-navigation').find('[data-name="chevron-left"]').click()
                    selectTestDay(day)
                }
                else {
                    cy.get('.day-cell').not('.bounding-month').contains(testDate).click()
                }
            })
            return assertDate
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click() 

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()

            const assertDate = selectTestDay(200)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
            cy.wrap(input).should('have.value', assertDate) 
        })
         
    })

    it('Lists and dropdowns', () => {
        cy.visit('/')

        //1
        cy.get('nav.fixed nb-select').click()
        cy.get('.options-list').contains(' Dark').click()
        cy.get('nav.fixed nb-select').should('contain', ' Dark')

        //2
        cy.get('nav.fixed nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const listText = listItem.text().trim()
                cy.wrap(listItem).contains(listText).click()
                cy.wrap(dropDown).should('contain', listText)
                if(index < 3){
                cy.wrap(dropDown).click()}
            })
        })
    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //find table row by text
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            const age = 25
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })

        //find table row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Anna')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').eq(0).find('td').then(tableColumn =>{
            cy.wrap(tableColumn).eq(2).should('contain', 'Anna')
            cy.wrap(tableColumn).eq(3).should('contain', 'Smith')
        })
       
        //each table row validataion
        const age = [20, 30, 200]
        cy.wrap(age).each(age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(table => {
                if(age == 200){
                    cy.wrap(table).should('contain', 'No data found')
                }
                else {
                    cy.wrap(table).find('td').eq(6).should('contain', age)
                }
        })
        })
        
    })

    it('Tooltips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody tr').first().find('.ng2-smart-action-delete-delete').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.be.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.ng2-smart-action-delete-delete').click().then(() => {
            cy.expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //3
        cy.get('tbody tr').first().find('.ng2-smart-action-delete-delete').click()
        cy.on('window:confirm', () => false)
        
    })
})
