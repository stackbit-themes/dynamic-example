---
title: Flow Numero Uno
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
    title: And now for the second card
    description: >
      You still got a _chance_, good luck to you on your journey!
    controls:
      - type: WizardTextControl
        required: true
        label: 'How shall we call you, again?'
        variableName: nickname2
        minLength: 3
      - type: WizardTextControl
        required: false
        label: Also not essential
        variableName: notEssentialString2
        minLength: 1
      - type: WizardSliderControl
        required: true
        label: 'Awesomeness factor, reloaded'
        variableName: awesomeness2
        minValue: 0
        maxValue: 10
        defaultValue: 5
  - type: WizardStep
    title: The final one
    description: >
      You still got a _last, final chance_. Seriously, it's the end.
    controls:
      - type: WizardTextControl
        required: false
        label: Any last words, chap?
        variableName: nickname3
---
