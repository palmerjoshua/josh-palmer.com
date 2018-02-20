const version = "0.0.0.0";
// region data
const config = `
author: Joshua Palmer
website: http://josh-palmer.com
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
        - title: &py "Python"
          experience:
              - *prof
              - *pers
              - *acad
          magnitude: *exp
          opinion: *fav
          comment:
        
        - title: "C#"
          experience:
              - *prof
          magnitude: *int
          opinion: *ing
          comment:
        
        - title: &web "HTML/CSS/Javascript"
          experience:
              - *prof
              - *pers
              - *acad
          magnitude: *adv
          opinion: *enj
          comment:

        - title: "PHP"
          experience:
              - *acad
          magnitude: *nov
          opinion: *hat
          comment:
    
    libraries:
        - title: "ReactJS"
          experience: *pers
          magnitude: *int
          language: *web
          opinion: *fav
          comment:

        - title: "Angular v1.x"
          experience: *prof
          magnitude: *int
          opinion: *amb
          comment:

        - title: "Flask"
          experience:
            - *prof
            - *pers
          magnitude: *adv
          language: *py
          opinion: *enj
          comment:

    
    tools & services:
        - title: "Amazon Web Services"
          experience:
              - *prof
              - *acad
          magnitude: *int
          opinion: *fav
          comment:
        
        - title: "Microsoft Azure"
          experience: *prof
          magnitude: *adv
          opinion: *ann
          comment:
        
        - title: "Jetbrains Team City"
          experience: *prof
          magnitude: *int
          opinion: *amb
          comment:
        
        - title: "Sumo Logic"
          experience: *prof
          magnitude: *adv
          opinion: *enj
          comment:
        
        - title: "Splunk"
          experience: *prof
          magnitude: *adv
          opinion: *enj
          comment:

        - title: "Jira"
          experience: *prof
          magnitude: *adv
          opinion: *enj
          comment:

        - title: "Git"
          experience:
              - *prof
              - *pers
              - *acad
`;
// endregion
const Config = require('js-yaml').safeLoad(config);
export default Config;
