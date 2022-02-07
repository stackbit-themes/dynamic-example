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
    controls: []
layout: WizardFlow
---
