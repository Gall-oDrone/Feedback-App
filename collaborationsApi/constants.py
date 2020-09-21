Humanities = 'humanities'
SocialSciences = 'social_sciences'
NaturalSciences = 'natural_sciences'
FormalSciences = 'formal_sciences'
AppliedSciences = 'applied_sciences'
ACADEMIC_DISCIPLINES_CHOICES = [
        (Humanities, [
            ('arts', 'Arts'),
            ('history', 'History'),
            ('home_economics', 'Home economics'),
            ('languages_literature', 'Languages and literature'),
            ('law', 'Law'),
            ('philosophy', 'Philosophy'),
            ('theology', 'Theology')
        ]),
        (SocialSciences, [
            ('anthropology', 'Anthropology'),
            ('archaeology', 'Archaeology'),
            ('economics', 'Economics'),
            ('geography', 'Geography'),
            ('political_science', 'Political science'),
            ('psychology', 'Psychology'),
            ('sociology', 'Sociology'),
            ('social_work', 'Social Work'),
        ]),
        (NaturalSciences, [
            ('biology', 'Biology'),
            ('chemistry', 'Chemistry'),
            ('earth_science', 'Earth science'),
            ('space_sciences', 'Space sciences'),
            ('physics', 'Physics'),
        ]),
        (FormalSciences, [
            ('computer_science', 'Computer Science'),
            ('mathematics', 'Mathematics'),
            ('statistics', 'Statistics'),
        ]),
        (AppliedSciences, [
            ('business', 'Business'),
            ('engineering_technology', 'Engineering and technology'),
            ('medicine_health', 'Medicine and health'),

        ]),
]

INDUSTRY_FIELDS_CHOICES = [
    ('Agriculture', 'Agriculture'),
    ('Artist', 'Artist'),
    ('Business', 'Business'),
    ('Communications', 'Communications'),
    ('Education', 'Education'),
    ('Engineering', 'Engineering'),
    ('Environment', 'Environment'),
    ('Financial', 'Financial'),
    ('Government', 'Government'),
    ('Health', 'Health'),
    ('Legal', 'Legal'),
    ('Manufacturing', 'Manufacturing'),
    ('Service Sector', 'Service Sector'),
    ('Technical', 'Technical'),
    ('Technology ', 'Technology '),
    ('Technology - non-Compute', 'Technology - non-Compute'),
]