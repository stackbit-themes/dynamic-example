---
title: Flow Numero Uno
layout: WizardFlowLayout
steps:
  - type: WizardStep
    title: Card One
    skippable: false
    description: >
      How **you** can work with us,
      to enable a brighter future!
    controls:
      - type: WizardTextControl
        required: true
        label: How shall we call you?
        varName: nickname
        minLength: 3
      - type: WizardTextControl
        required: false
        label: Not essential
        varName: notEssentialString
        minLength: 1
      - type: WizardSliderControl
        required: true
        label: Awesomeness factor
        varName: awesomeness
        minValue: 0
        maxValue: 10
        defaultValue: 5
  - type: WizardStep
    title: Card Two
    skippable: false
    description: >
      How **you** can work with us,
      to enable a brighter future!
    controls:
      - type: WizardTextControl
        required: true
        label: How shall we call you?
        varName: nickname2
        minLength: 3
      - type: WizardTextControl
        required: false
        label: Not essential
        varName: notEssentialString2
        minLength: 1
      - type: WizardSliderControl
        required: true
        label: Awesomeness factor
        varName: awesomeness2
        minValue: 0
        maxValue: 10
        defaultValue: 5
---
