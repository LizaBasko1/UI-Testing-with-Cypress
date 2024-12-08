function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attrs => {
            if( attrs.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{


    formLayoutsPage(){
        selectGroupMenuItem('Form')
        cy.contains('Layouts').click()   
    }

    datePickerPage(){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click() 

    }

    toastrPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click() 
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavigationPage()