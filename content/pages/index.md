---
title: Home
layout: GeneralPage
sections:
  - type: SimpleTextSection
    title: Hello stranger!
    subtitle: 'To start your journey, we recommend that you sign in.'
    content: _(this section was set to appear only for anonymous users)_
    userGroup: anonymous
    ctaButton:
      type: SignInButton
      text: Sign in
  - type: SimpleTextSection
    title: Nice to have you here!
    subtitle: null
    content: >
      You're seeing this section because a content editor has created it and
      marked it for _logged-in users only_. 


      The editor also defined this call-to-action button:
    userGroup: loggedIn
    ctaButton:
      type: SimpleButton
      primary: false
      text: Go to profile
      link: /user
  - type: SimpleTextSection
    title: About to the Dynamic Example App
    content: >
      What's inside:

      1. Going **beyond static** with logic in the client- and server-side.

      1. Integration with **authentication providers** (via [Next
      Auth](https://next-auth.js.org/)) and **databases** (using
      [Upstash](https://upstash.com/)) for functionality tailored to logged-in
      users.

      1. Editing complex [wizard-like flows](/flows) using
      [Stackbit](https://www.stackbit.com/), providing content creators with a
      guided visual experience for creating and updating flows.

      1. Having multiple Next.js routes pulling data in different ways.
    userGroup: everyone
---
