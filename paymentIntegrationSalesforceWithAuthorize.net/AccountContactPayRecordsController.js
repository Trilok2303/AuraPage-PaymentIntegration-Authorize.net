({
    doSave : function(component, event, helper) {
        var acc = component.get("v.createAcc");
        var con = component.get("v.contacts");
        var action = component.get('c.createAccount');
        var Name = component.get("v.createAcc.Name");
        if(!Name){
            component.set("v.showError",'True');
            component.set("v.errorMessage", 'Account Name Is required');
            var tOut = setTimeout(function(){
                clearTimeout(tOut);
                component.set("v.showError", false);
            }, 3000);
            return;
        }
        console.log(acc);
        console.log(con);
        action.setParams({
            "account" : acc,
            "contacts": con
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Account and contacts created!");
                // Clear input fields
                component.set("v.isModalOpen3", true);
            //    component.set("v.createAcc", {});
                component.set("v.contacts", []);
                
                
            } else {
                console.log("Error creating account and contacts");
            }
            
        });
        $A.enqueueAction(action);
    },
    
    
    
    docancel : function(component, event, helper) {
        component.set("v.createAcc", {});
        component.set("v.contacts", []);
    },
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
    },
    submitDetails: function(component, event, helper) {
        var lastName = component.get("v.createCon.LastName");
        var email = component.get("v.createCon.Email");
        var contacts = component.get("v.contacts");
        
        // Check if last name is empty
        if (!lastName) {
            component.set("v.showError",'True');
            component.set("v.errorMessage", 'Last Name Is required');
            var tOut = setTimeout(function(){
                clearTimeout(tOut);
                component.set("v.showError", false);
            }, 3000);
            return;
        } 
        
        // Check for email duplicacy
        for (var i = 0; i < contacts.length; i++) {
            if (email && contacts[i].Email == email) {
                component.set("v.showError",'True');
                component.set("v.errorMessage", 'Check Your Email Duplicate are not allowed.');
                var tOut = setTimeout(function(){
                    clearTimeout(tOut);
                    component.set("v.showError", false);
                }, 3000);
                return;
            }
            else if(contacts[i].LastName == lastName){
                component.set("v.showError",'True');
                component.set("v.errorMessage", 'Check Last Name Duplicate are not allowed.');
                var tOut = setTimeout(function(){
                    clearTimeout(tOut);
                    component.set("v.showError", false);
                }, 3000);
                return;
            }
        }
        
        // Add contact to the list
        var contact = component.get("v.createCon");
        contacts.push(contact);
        component.set("v.contacts", contacts);
        
        // Clear form and show success message
        component.set("v.createCon", {});
        component.set("v.successMessage", "Contact added successfully.");
        component.set("v.isModalOpen", false);
    },
    deleteContact : function(component, event, helper) {
        // Get the index of the contact to delete
         component.set("v.isModalOpen3", false);
        var index = event.getSource().get('v.name');
        
        // Retrieve the list of contacts from the component's attribute
        var contacts = component.get("v.contacts");
        
        // Remove the contact from the list using the index
        contacts.splice(index, 1);
        
        // Update the component's attribute with the updated list of contacts
        component.set("v.contacts", contacts);
    },
    editContact : function(component, event, helper) {
        // Get the selected contact's Id
        var index = event.currentTarget.dataset.index;
        console.log(index);
        // Retrieve the list of contacts from the component's attribute
        var contacts = component.get("v.contacts");  
        // Get the selected contact from the list using its index
        var selectedContact = contacts[index];
        console.log(selectedContact);
        // Set the selected contact as the component's attribute
        component.set("v.editCon",  selectedContact);
        console.log(component.get("v.editCon"));
        
        
        // Open the modal for editing the contact
        component.set("v.isEditModalOpen", true);
    },
    
    saveContact : function(component, event, helper) {
        // Retrieve the edited contact from the component's attribute
        var editedContact = component.get("v.editCon");
        
        // Retrieve the list of contacts from the component's attribute
        var contacts = component.get("v.contacts");
        
        
        
        // Find the index of the edited contact in the list of contacts
        var index = contacts.findIndex(contact => contact.Id === editedContact.Id);
        
        // Update the edited contact in the list of contacts
        contacts[index] = editedContact;
        
        // Update the component's attribute with the updated list of contacts
        component.set("v.contacts", contacts);
        // Close the modal for editing the contact
        component.set("v.isEditModalOpen", false);
    },
    
    cancelEdit : function(component, event, helper) {
        // Clear the edited contact from the component's attribute
        component.set("v.editCon", {});
        // Close the modal for editing the contact
        component.set("v.isEditModalOpen", false);
    },
    handleEditConChange : function(component, event, helper) {
        // Get the new value of the edited contact
        var editedContact = component.get("v.editCon");
        
        // If the edited contact is not empty, update the input fields in the edit modal
        if (Object.keys(editedContact).length > 0) {
            component.find("editFirstName").set("v.value", editedContact.FirstName);
            component.find("editLastName").set("v.value", editedContact.LastName);
            component.find("editEmail").set("v.value", editedContact.Email);
        }
    },
    openModel3: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen3", true);
    },
    
    closeModel3: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen3", false);
        component.set("v.createAcc", {});
        component.set("v.contacts", []);
    },
    
    saveCardInfo: function(component, event, helper) { 
        var acc = component.get("v.createAcc");
       
        var cardNumber = component.get("v.cardNumber");
        var cvv = component.get("v.cvv");
        var name = component.get("v.createAcc.Name");
         //console.log("132435465"+name);
        var expiryDate = component.get("v.expiryDate");
        console.log("expiry date=->"+expiryDate);
        var amount = component.get("v.createAcc.Amoun__c");
        var action = component.get("c.createPayment");
        action.setParams({
            "Name":name,
            "amount1":amount,
            "cardNumber":cardNumber,
            "expirationDate":expiryDate,
            "cvv":cvv
        });
         action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                // Clear input fields
                  component.set("v.createAcc", {});
                component.set("v.isModalOpen3", false);
                
            } else {
                console.log("Error in transaction ID");
            }
            
        });
        component.set("v.cardNumber", {});
        component.set("v.cvv", {});
        component.set("v.expiryDate", {});
        $A.enqueueAction(action);
        
    },
    
})