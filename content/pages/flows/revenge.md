---
title: Revenge of the flows
steps:
  - title: Step title
    description: Markdown-based description
    controls:
      - required: true
        label: Some text
        variableName: someText
        minLength: 1
        type: WizardTextControl
      - required: true
        label: Some label
        variableName: someSlider
        minValue: 0
        maxValue: 100
        defaultValue: 50
        type: WizardSliderControl
  - title: Step title
    description: Markdown-based description
    controls:
      - required: true
        label: Label for this control
        variableName: images
        images:
          - image: /images/scott-webb-GQD3Av_9A88-unsplash.jpg
            label: 'Default Cacti :-)'
            value: cacti
          - image: /images/music/harry-swales-0l0KjNoAfAk-unsplash.jpg
            label: Rapper
            value: rapper
        type: WizardImageSelectControl
layout: WizardFlow
---
