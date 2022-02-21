---
title: Uno Flow
layout: WizardFlow
steps:
  - type: WizardStep
    title: The basics
    description: |
      This card is for _us_ to get to know **you**!
    controls:
      - type: WizardTextControl
        required: true
        label: How shall we call you?
        variableName: nickname
        minLength: 3
      - type: WizardTextControl
        required: false
        label: Some non essential detail
        variableName: notEssentialString
      - type: WizardSliderControl
        required: true
        label: Your awesomeness factor
        variableName: awesomeness
        minValue: 0
        maxValue: 10
        defaultValue: 5
      - required: true
        label: Choose your Cactus
        variableName: ''
        images:
          - image: /images/scott-webb-GQD3Av_9A88-unsplash.jpg
            label: 'Default Cacti :-)'
            value: cacti
          - image: /images/scott-webb-GQD3Av_9A88-unsplash.jpg
            label: 'Default Cacti :-)'
            value: cacti
        type: WizardImageSelectControl
  - type: WizardStep
    title: Getting to know you
    description: |
      We'd like to get to know your taste in music for, for a better experience.

      _(actually, it's a demo and all user data auto-expires...)_
    controls:
      - type: WizardImageSelectControl
        required: false
        label: What kinds of music do you like?
        variableName: musicGenres
        images:
          - type: ImageSelectItem
            image: /images/music/harry-swales-0l0KjNoAfAk-unsplash.jpg
            label: Rap / Hip hop
            value: rapHiphop
          - type: ImageSelectItem
            image: /images/music/hector-bermudez-iIWDt0fXa84-unsplash.jpg
            label: Rock / Metal
            value: rockMetal
          - type: ImageSelectItem
            image: /images/music/larisa-birta-slbOcNlWNHA-unsplash.jpg
            label: Classical
            value: classical
          - type: ImageSelectItem
            image: /images/music/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg
            label: Electronic
            value: electronic
          - image: /images/scott-webb-GQD3Av_9A88-unsplash.jpg
            label: 'Default Cacti :-)'
            value: cacti
      - required: true
        label: Label for this control
        variableName: ''
        minValue: 0
        maxValue: 100
        defaultValue: 50
        type: WizardSliderControl
  - type: WizardStep
    title: A final step
    description: |
      Just so we have three, really...
    controls:
      - type: WizardTextControl
        label: Do you have an alternative nickname?
        variableName: altNickname
---
