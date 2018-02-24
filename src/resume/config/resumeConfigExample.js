/*
* Rename this file "resumeConfig.js" and add your own data.
*/
const version = "0.0.0.0";
const config = `
author: Your Name
website: http://your-website.com

version: ${version}
categories:
    experience:
        - &prof "Professional"
        - &pers "Personal"
        - &acad "Academic"
    magnitude:
        - &exp "Expert"
        - &adv "Advanced"
        - &int "Intermediate"
        - &nov "Novice"
    opinion:
        - &fav "Favorite"
        - &enj "Enjoyable"
        - &ing "Interesting"
        - &amb "Ambivalent"
        - &ann "Annoying"
        - &dis "Dislike"
        - &hat "Hate"

contents:
    languages:
        - title: &web "HTML/CSS/Javascript"
          experience:
              - *prof
              - *pers
              - *acad
          magnitude: *adv
          opinion: *enj
          comment:

    libraries:
        - title: "ReactJS"
          experience: *pers
          magnitude: *int
          language: *web
          opinion: *fav
          comment: "This website is written in ReactJS."

    tools & services:
        - title: "Amazon Web Services"
          experience:
              - *prof
              - *acad
          magnitude: *int
          opinion: *fav
          comment: "I really enjoyed this."
`;

const Config = require('js-yaml').safeLoad(config);
export default Config;
