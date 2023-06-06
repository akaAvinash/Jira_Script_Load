// ==UserScript==
// @name         Jira Template
// @namespace    http://your-namespace.com
// @version      1.0
// @description  To input basic Jira template
// @author       Avinash
// @match        https://issues.labcollab.net/secure/CreateIssue.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    // Function to fill out Jira issue fields automatically
    function fillJiraTemplate() {
      // Check if the required fields are filled
      function checkRequiredFields() {
        var requiredFields = [
          { id: 'summary', label: 'Summary' },
          { id: 'customfield_11302', label: 'IsTriaged' },  
          { id: 'customfield_11301', label: 'IsRegression' },
          { id: 'customfield_10002', label: 'Found in Build' }, 
          { id: 'components-textarea', label: 'Component' },
          { id: 'versions-textarea', label: 'Affect Version' },
          { id: 'assignee-field', label: 'Assignee' },
          { id: 'description', label: 'Description' },
          { id: 'fileattach', label: 'Attachment' },
          { id: 'labels-textarea', label: 'Labels' },
          { id: 'customfield_10103', label: 'Test Case Number' },
          { id: 'customfield_10201', label: 'Feedback Type' },
        ];
  
        var missingFields = [];
  
        for (var i = 0; i < requiredFields.length; i++) {
          var field = requiredFields[i];
          var element = document.getElementById(field.id);
  
          if (!element || !element.value) {
            missingFields.push(field.label);
          }
        }
  
        if (missingFields.length > 0) {
          alert('The following fields are missing or empty:\n\n' + missingFields.join('\n'));
          return fasle;
        }
        return true;
      }
  
      // Fill the Jira template fields
      var descriptionField = document.getElementById('description');
      if (descriptionField) {
        var descriptionValue = `
  *TC/ Wikilink*:
  
  *[Prerequisite]*:
  
  
  *[Steps to Reproduce]*
  1.
  2.
  3.
  
  *[Expected Results]*:
  
  *[Actual Results]*:
  
  *[Terminal logs]*:
  
  *[Last Working (build/APK)]*:
  
  *[Is Regression]*:
  
  *[APK Verified]*:
  
  *[Reproducibility Rate]*:
  
  *[Environmental details]*
  |Milestone|NA|
  |Build link or Source code link| |
  |DSN & config| |
  |Log Attachment| |
  |Video Link||
  |Wifi Type| |
  |Account Registered(locale)| |
  
  *[Note]*:`;
  
        descriptionField.value += descriptionValue;
      }
  
      // Fill the Components field
      var componentsField = document.getElementById('components-textarea');
      if (componentsField) {
        var componentsValue = 'component_name';
        componentsField.value += componentsValue;
      } else {
        console.error('Components field not found.');
      }
       
      var createButton = document.getElementById('issue-create-submit');
  if (createButton) {
    createButton.addEventListener('click', function(event) {
      var requiredFieldsFilled = checkRequiredFields();

      if (!requiredFieldsFilled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

      
      // Fill the Labels field
    var labelsField = document.getElementById('labels-textarea');
    if (labelsField) {
    var runOptions = [
    'Opn1',
    'Opn2',
    'Opn3',
    'Opn4',
    'Opn5',
    'Opn6'
  ];

     var selectedRun = prompt('Which Run are you filing Jira for?\n\nAvailable options:\n' + runOptions.join('\n'));
    if (selectedRun && runOptions.includes(selectedRun)) {
    var labelsValue = 'Add common labels here';

    if (selectedRun === 'Opn1') {
      labelsValue += 'label related to Opn1';
    } else if (selectedRun === 'Opn2') {
      labelsValue += 'label related to Opn2';
    } else if (selectedRun === 'Opn3') {
      labelsValue += 'label related to Opn3';
    } else if (selectedRun === 'Opn4') {
      labelsValue += 'labels related to Opn4';
    } else if (selectedRun === 'Opn5') {
      labelsValue += 'labels related to Opn5';
    } else if (selectedRun === 'Opn6') {
      labelsValue += 'labels related to Opn6';
    }
    
    labelsField.value = labelsValue; // Update with the corrected line
    } else {
    console.error('Invalid Run selection.');
    }
}    else {
     console.error('Labels field not found.');
}

      
      // Fill the Summary field
      var summaryField = document.getElementById('summary');
      if (summaryField) {
        var summaryValue = '[Obj Name][App Name]: ';
        summaryField.value += summaryValue;
      }
  
      // Click on the "Assign to me" button
      var assignToMeButton = document.querySelector('button[aria-label="Assign to me"]');
      if (assignToMeButton) {
        assignToMeButton.click();
      }  
  
    }
  
    // Call the function to fill out Jira template fields
    fillJiraTemplate();
  
    // Check if attachments are uploaded
    var attachmentField = document.getElementById('fileattach');
    if (attachmentField && attachmentField.files.length === 0) {
      alert('Please upload at least one attachment.');
    }
  })();
  
