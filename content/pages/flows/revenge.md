---
title: Revenge of the flows
steps:
  - title: Step title
    description: Markdown-based description
    controls:
      - required: true
        label: Some text
        variableName: ''
        minLength: 1
        type: WizardTextControl
      - required: true
        label: Some label
        variableName: ''
        minValue: 0
        maxValue: 100
        defaultValue: 50
        type: WizardSliderControl
layout: WizardFlow
---
