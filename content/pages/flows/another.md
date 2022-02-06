---
title: Yet Another Flow
layout: WizardFlow
steps:
  - type: WizardStep
    title: First Card
    description: |
      How **you** can work with us, to enable a brighter future!
      Do it now!
    controls:
      - type: WizardTextControl
        required: true
        label: How shall we call you?
        variableName: nickname
        minLength: 3
      - type: WizardTextControl
        required: false
        label: Not essential
        variableName: notEssentialString
        minLength: 1
      - type: WizardSliderControl
        required: true
        label: Awesomeness factor
        variableName: awesomeness
        minValue: 0
        maxValue: 10
        defaultValue: 5
  - type: WizardStep
    title: Second Card
    description: |
      You still got a _last, final chance_. Seriously, it's the end.
    controls:
      - type: WizardTextControl
        required: false
        label: 'Any last words, chap?'
        variableName: lastWords
---
